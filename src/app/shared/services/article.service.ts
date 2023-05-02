import { Injectable, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Firestore,  addDoc, collectionData, docData, setDoc, } from '@angular/fire/firestore';
import { AuthService } from 'app/core/auth.service';
import { collection, query, where, onSnapshot, getDocs, getDoc, CollectionReference, updateDoc } from "firebase/firestore";
import { doc } from "firebase/firestore";
import { Observable, combineLatest, filter, from, map, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService implements OnInit{
id:any
userId:any
  user$!: Observable<any>;

  articles:any = [];
  trendings :any = [];
  liked : any = [];
  saved : any = [];

  idArticles  = []
  twentyFourHoursAgo = new Date(Date.now() - (24 * 60 * 60 * 1000));
  author :any
  
  constructor(private firestore: Firestore, private as: AuthService,


 ) { 

   this.as.user.subscribe(user => {
    if (user) {
     
      console.log('author id:', user.uid); // Debugging line
      this.id=user.uid
      
    }
  });
  //====================== get logged user ============================

}
ngOnInit() {
this.user$ = this.as.user.pipe(
  switchMap(user => {
    if (user) {
      const collectionuser = collection(this.firestore, 'users');
      const docRef = doc(collectionuser, user.uid);

      return from(getDoc(docRef).then(doc => doc.data()));
    } else {
      return of(null);
    }
  })
);
this.user$.subscribe(user => {
  if (user) {
    this.userId = user.id
    this.id = user.id;
   console.log(this.userId)

  }})
}



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
//================================== UPDATE ARTILES =================================================
async updateArticle(articleId: string, updatedArticleData: any): Promise<boolean> {
  try {
    const articleRef = doc(this.firestore, 'articles', articleId);
    await updateDoc(articleRef, updatedArticleData);
    return true;
  } catch (e) {
    console.error("Error updating document: ", e);
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
  //  console.log(author)
   let article = { author, data}
   //console.log(article)
     //this.articles.unshift(article);
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
      // console.log(author)
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

getLiked(): Observable<any> {
  return new Observable((observer) => {
    let ids: any[] = [];
    const unsubscribe = this.as.user.subscribe((user) => {
      if (user) {
        const like = query(collection(this.firestore, "likes"), where("idAuthor", "==", user.uid));
        
        // Use get method to retrieve initial data
        getDocs(like).then((querySnapshot) => {
          ids = [];
          querySnapshot.forEach((doc) => {
            ids.push(doc.data()['idArticle']);
          });
          const liked = this.articles.filter((article: { data: { uid: any; }; }) => ids.includes(article.data.uid));
          this.liked = liked;
          console.log(liked);
          observer.next(liked);
        });

        // Use onSnapshot to listen for changes
        const listener = onSnapshot(like, (querySnapshot) => {
          ids = [];
          querySnapshot.forEach((doc) => {
            ids.push(doc.data()['idArticle']);
          });
          const liked = this.articles.filter((article: { data: { uid: any; }; }) => ids.includes(article.data.uid));
          this.liked = liked;

          observer.next(liked);
        });
        // Return the listener instead of the unsubscribe function
        observer.next(listener);
      }
    });
  });
}

getSaved(): Observable<any> {
  return new Observable((observer) => {
    let ids: any[] = [];
    const unsubscribe = this.as.user.subscribe((user) => {
      if (user) {
        const save = query(collection(this.firestore, "saved"), where("idAuthor", "==", user.uid));
        
        // Use get method to retrieve initial data
        getDocs(save).then((querySnapshot) => {
          ids = [];
          querySnapshot.forEach((doc) => {
            ids.push(doc.data()['idArticle']);
          });
          const saved = this.articles.filter((article: { data: { uid: any; }; }) => ids.includes(article.data.uid));
          this.saved = saved;

          observer.next(saved);
        });

        // Use onSnapshot to listen for changes
        const listener = onSnapshot(save, (querySnapshot) => {
          ids = [];
          querySnapshot.forEach((doc) => {
            ids.push(doc.data()['idArticle']);
          });
          const saved = this.articles.filter((article: { data: { uid: any; }; }) => ids.includes(article.data.uid));
          this.saved = saved;

          observer.next(saved);
        });
        // Return the listener instead of the unsubscribe function
        observer.next(listener);
      }
    });
  });
}

//============================= GET My ARTICLES ===============================

getMine(): Observable<any> {
  return new Observable((observer) => {
    let ids: any[] = [];
    const unsubscribe = this.as.user.subscribe((user) => {
      if (user) {
        const my = query(collection(this.firestore, "articles"), where("authorId", "==", user.uid));
        const listener = onSnapshot(my, (querySnapshot) => {
          ids = [];
          querySnapshot.forEach((doc) => {
            ids.push(doc.data()['uid']);
          });
          const mine = this.articles.filter((article: { data: { uid: any; }; }) => ids.includes(article.data.uid))

          observer.next(mine);
        });
        // Return the listener instead of the unsubscribe function
        observer.next(listener);
      }
    });
   
  });
}






}