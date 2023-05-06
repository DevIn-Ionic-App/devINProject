import { Injectable } from '@angular/core';
import { Firestore,  addDoc, collectionData, docData, setDoc, } from '@angular/fire/firestore';
import { AuthService } from 'app/core/auth.service';
import { collection, query, where, onSnapshot, getDocs, getDoc } from "firebase/firestore";
import { doc } from "firebase/firestore";


@Injectable({
  providedIn: 'root'
})
export class ArticleService {
id:any
  savedPosts: any;
  minePosts: any;
  idCurrentuser:any
  likedPosts:any
  constructor(private firestore: Firestore, private as: AuthService
 ) { 
  this.as.user.subscribe(user => {
    if (user) {
     
      console.log('author id:', user.uid); // Debugging line
      this.id=user.uid
    }
  });
 }
 articles:any = [];
 trendings :any = [];
 liked : any = [];
 twentyFourHoursAgo = new Date(Date.now() - (24 * 60 * 60 * 1000));
 author :any
//====================================== CREATE ARTICLE ===========================================
async createArticle(article:any) {
  try {
    const collectionInstance = collection(this.firestore, 'articles');
    const docRef = doc(collectionInstance); // Create a new document reference with a unique ID
    const articleData = {
      ...article,
      uid: docRef.id, // Add the UID to the document data
      authorId:this.id
    };
    await setDoc(docRef, articleData); // Use setDoc() to add the document to Firestore
    return true;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw null;
  }
}

  //================================= GET ALL ARTICLES ===============================================
   getAllArticles(){

    const collectionInstance = collection(this.firestore, 'articles');
    collectionData(collectionInstance)
    .subscribe(article=>console.log(article))
    return  collectionData(collectionInstance);
  }
  //===========================  GET ALL ARTICLES: REAL TIME FETCH ================================
  allArticles = query(collection(this.firestore, "articles"));
  unsubscribe = onSnapshot(this.allArticles, (querySnapshot) => {
 
 querySnapshot.forEach(async(doc) => {
   let id = doc.data()['authorId']
   let data = doc.data()
   let author = await this.profileDetails(id)
   console.log(author)
   let article = { author, data}
       // Check if the article already exists in the array
   const index = this.articles.findIndex((existingArticle: { data: { uid: any; }; }) => {
     return existingArticle.data.uid === article.data['uid'];
   });

   if (index === -1) {
     // If the article doesn't exist, unshift it to the array
     this.articles.unshift(article);
   } else {
     // If the article already exists, replace it with the updated version
     this.articles[index] = article;
   }
 });
});
  //===========================  GET TRENDY ARTICLES: REAL TIME FETCH ================================
  trend = query(collection(this.firestore, "articles"), where("date",">=",this.twentyFourHoursAgo));
  unsubscribe1 = onSnapshot(this.trend, (querySnapshot) => {
 
 querySnapshot.forEach(async (doc) => {
     let id = doc.data()['authorId']
      let data = doc.data()
      let author = await this.profileDetails(id)
      console.log(author)
      let article = { author, data}
      const index = this.trendings.findIndex((existingArticle: { data: { uid: any; }; }) => {
        return existingArticle.data.uid === article.data['uid'];
      });
   
      if (index === -1) {
        // If the article doesn't exist, unshift it to the array
        this.trendings.unshift(article);
      } else {
        // If the article already exists, replace it with the updated version
        this.trendings[index] = article;
      }


 });
});

  // ========================= Get article by id =====================================================
 


async articleDetails(uid: string | null): Promise<any> {
  try {
    const getArticle = query(collection(this.firestore, "articles"), where("uid", "==", uid));
    const querySnapshot = await getDocs(getArticle);
    let article: any = null;
    querySnapshot.forEach((doc) => {
      article = doc.data();
    });
    if (!article) {
      throw new Error("Article not found");
    }
    return article;
  } catch (e) {
    console.error("Error fetching article: ", e);
    throw null;
  }
}
  // ========================= Get Profile by id =====================================================
  async profileDetails(uid: string | null): Promise<any> {
  try {
    const getProfile = query(collection(this.firestore, "users"), where("id", "==", uid));
    const querySnapshot = await getDocs(getProfile);
    let profile: any = null;
    querySnapshot.forEach((doc) => {
      profile = doc.data();
    });
    if (!profile) {
      throw new Error("Profile not found");
    }
    return profile;
  } catch (e) {
    console.error("Error fetching article: ", e);
    throw null;
  }
}
//============================= GET LIKED ARTICLES ===============================
likedArticles(id:string | null) {
  const Like = query(collection(this.firestore, "likes"), where("idAuthor","==",id));
  const unsubscribe3 = onSnapshot(Like, (querySnapshot) => {

querySnapshot.forEach(async (doc) => {
   let id = doc.data()['authorId']
    let data = doc.data()
    let author = await this.profileDetails(id)
    console.log(author)
    let article = { author, data}
    const index = this.trendings.findIndex((existingArticle: { data: { uid: any; }; }) => {
      return existingArticle.data.uid === article.data['uid'];
    });
 
    if (index === -1) {
      // If the article doesn't exist, unshift it to the array
      this.trendings.unshift(article);
    } else {
      // If the article already exists, replace it with the updated version
      this.trendings[index] = article;
    }


});
});

 }
 // ==================================== saved by current user ============================================
// ==================================== saved by current user ============================================
setid(data: any) {
  this.savedPosts = [];
  console.log('Data received in service for saved posts:', data);
  this.idCurrentuser = data;
  console.log('set id in article service for saved posts here', data)

  const commentsRef = collection(this.firestore, "saved");
  const queryy = query(commentsRef, where("idAuthor", "==", this.idCurrentuser));

  // Reset the savedPosts array
  this.savedPosts = [];

  // Listen to the onSnapshot event for the saved collection
  const unsubscribe8 = onSnapshot(queryy, (querySnapshot: any) => {

    // Loop through each document in the query snapshot
    querySnapshot.forEach(async (doc: { data: () => { (): any; new(): any; [x: string]: any; }; }) => {
      const id = doc.data()['idArticle'];
      const dataa = doc.data();
      const data = await this.articleDetails(id);
      const idArticleAuthor = await data['authorId'];
      const author = await this.profileDetails(idArticleAuthor);
      console.log('in the select of articles by current user', data);
      const articles = { author, dataa, data };

      // Check if the article already exists in the array
      const index = this.savedPosts.findIndex((existingposts: { data: any }) => {
        return (existingposts.data.authorId === articles.data['authorId'] && existingposts.data.uid === articles.data['uid']);
      });

      if (index === -1) {
        // If the article doesn't exist, push it to the array
        this.savedPosts.push(articles);
      } else {
        // If the article already exists, replace it with the updated version
        this.savedPosts[index] = articles;
      }
    });

    // Loop through each document in the saved collection
    querySnapshot.docChanges().forEach((change: any) => {
      const id = change.doc.data()['idArticle'];

      if (change.type === "added") {
        console.log("New document added with ID: ", id);
      }
      if (change.type === "modified") {
        console.log("Document modified with ID: ", id);
      }
      if (change.type === "removed") {
        console.log("Document removed with ID: ", id);

        // Find the index of the article in the savedPosts array and remove it
        const index = this.savedPosts.findIndex((existingposts: { data: any }) => {
          return (existingposts.data.uid === id);
        });

        if (index !== -1) {
          this.savedPosts.splice(index, 1);
        }
      }
    });
  });
}

// ==================================== liked by current user ============================================
setidliked(data: any) {
  this.savedPosts = [];
  console.log('Data received in service for liked posts:', data);
  this.idCurrentuser = data;
  console.log('set id in article service for liked posts here', data)

  this.likedPosts = [];
  
  const commentsRef2 = collection(this.firestore, "likes");
  const queryy2 = query(commentsRef2, where("idAuthor", "==", this.idCurrentuser));

  
  // Listen to the onSnapshot event for the saved collection
  const unsubscribe9 = onSnapshot(queryy2, (querySnapshot2: any) => {

    // Loop through each document in the query snapshot
    querySnapshot2.forEach(async (doc: { data: () => { (): any; new(): any; [x: string]: any; }; }) => {
      const id2 = doc.data()['idArticle'];
      const dataa2 = doc.data();
      const data = await this.articleDetails(id2);
      const idArticleAuthor2 = await data['authorId'];
      const author = await this.profileDetails(idArticleAuthor2);
      console.log('in the select of liked articles by current user', data);
      const articles2 = { author, dataa2, data };

      // Check if the article already exists in the array
      const index2 = this.likedPosts.findIndex((existingposts: { data: any }) => {
        return (existingposts.data.authorId === articles2.data['authorId'] && existingposts.data.uid === articles2.data['uid']);
      });

      if (index2 === -1) {
        // If the article doesn't exist, push it to the array
        this.likedPosts.push(articles2);
      } else {
        // If the article already exists, replace it with the updated version
        this.likedPosts[index2] = articles2;
      }
    });

    // Loop through each document in the saved collection
    querySnapshot2.docChanges().forEach((change: any) => {
      const id2 = change.doc.data()['idArticle'];

      if (change.type === "added") {
        console.log("New document added with ID: ", id2);
      }
      if (change.type === "modified") {
        console.log("Document modified with ID: ", id2);
      }
      if (change.type === "removed") {
        console.log("Document removed with ID: ", id2);

        // Find the index of the article in the savedPosts array and remove it
        const index2 = this.likedPosts.findIndex((existingposts: { data: any }) => {
          return (existingposts.data.uid === id2);
        });

        if (index2 !== -1) {
          this.likedPosts.splice(index2, 1);
        }
      }
    });
  });
}


// ==================================== posts by current user  ============================================
setidmine(data: any) {
  this.minePosts = [];
  console.log('Data received in service for mine posts:', data);
  this.idCurrentuser = data;
  console.log('set id in article service for mine posts here', data)

  this.minePosts = [];
  
  const commentsRef2 = collection(this.firestore, "articles");
  const queryy2 = query(commentsRef2, where("authorId", "==", this.idCurrentuser));

  
  // Listen to the onSnapshot event for the saved collection
  const unsubscribe9 = onSnapshot(queryy2, (querySnapshot2: any) => {

    // Loop through each document in the query snapshot
    querySnapshot2.forEach(async (doc: { data: () => { (): any; new(): any; [x: string]: any; }; }) => {
      const id2 = doc.data()['uid'];
      const dataa2 = doc.data();
      const data = await this.articleDetails(id2);
      const author = await this.profileDetails(this.idCurrentuser);
      console.log('in the select of mine articles by current user', data);
      const articles2 = { author, dataa2, data };

      // Check if the article already exists in the array
      const index2 = this.minePosts.findIndex((existingposts: { data: any }) => {
        return (existingposts.data.authorId === articles2.data['authorId'] && existingposts.data.uid === articles2.data['uid']);
      });

      if (index2 === -1) {
        // If the article doesn't exist, push it to the array
        this.minePosts.push(articles2);
      } else {
        // If the article already exists, replace it with the updated version
        this.minePosts[index2] = articles2;
      }
    });

    // Loop through each document in the saved collection
    querySnapshot2.docChanges().forEach((change: any) => {
      const id2 = change.doc.data()['idArticle'];

      if (change.type === "added") {
        console.log("New document added with ID: ", id2);
      }
      if (change.type === "modified") {
        console.log("Document modified with ID: ", id2);
      }
      if (change.type === "removed") {
        console.log("Document removed with ID: ", id2);

        // Find the index of the article in the savedPosts array and remove it
        const index2 = this.minePosts.findIndex((existingposts: { data: any }) => {
          return (existingposts.data.uid === id2);
        });

        if (index2 !== -1) {
          this.minePosts.splice(index2, 1);
        }
      }
    });
  });
}




}
