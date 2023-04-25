import { Injectable } from '@angular/core';
import { Firestore,  addDoc, collectionData, setDoc, } from '@angular/fire/firestore';
import { AuthService } from 'app/core/auth.service';
import { collection, query, where, onSnapshot, getDocs, getDoc } from "firebase/firestore";
import { doc } from "firebase/firestore";


@Injectable({
  providedIn: 'root'
})
export class ArticleService {
id:any
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
 trendings :any = []
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
   //console.log(article)
     //this.articles.push(article);
       // Check if the article already exists in the array
   const index = this.articles.findIndex((existingArticle: { data: { uid: any; }; }) => {
     return existingArticle.data.uid === article.data['uid'];
   });

   if (index === -1) {
     // If the article doesn't exist, push it to the array
     this.articles.push(article);
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
      console.log(article)
     this.trendings.push(article);


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

}
