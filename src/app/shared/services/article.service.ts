import { Injectable } from '@angular/core';
import { Firestore,  addDoc, collectionData, } from '@angular/fire/firestore';
import { collection, query, where, onSnapshot, getDocs, getDoc } from "firebase/firestore";
import { doc } from "firebase/firestore";


@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private firestore: Firestore,
 ) { }
 articles:any = [];
 trendings :any = []
 twentyFourHoursAgo = new Date(Date.now() - (24 * 60 * 60 * 1000));
 author :any
//====================================== CREATE ARTICLE ===========================================
     async createArticle(article:any){
    
    
      const collectionInstance = collection(this.firestore, 'articles');
      try{
        addDoc(collectionInstance, article).then(()=>{
        
 
       }).catch(()=>{
         
         throw null
               })
       return true;
      }
      catch(e){
        throw null
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
  
  querySnapshot.forEach((doc) => {
      this.articles.push(doc.data());
      // console.log(doc.data())
  });
});
  //===========================  GET TRENDY ARTICLES: REAL TIME FETCH ================================
  trend = query(collection(this.firestore, "articles"), where("date",">=",this.twentyFourHoursAgo));
  unsubscribe1 = onSnapshot(this.trend, (querySnapshot) => {
 
 querySnapshot.forEach(async (doc) => {
     let id = doc.data()['authorId']
      let data = doc.data()
      let author = await this.findAuthor(id)
      console.log(author)
      // let article = { author, data}
      // console.log(article)
    //  this.trendings.push(article);


 });
});
  //===========================  GET AUTHOR DATA : REAL TIME FETCH ================================
  async findAuthor(id: string): Promise<any> {
    const getAuthor = query(collection(this.firestore, "authors"), where("id", "==", id));
    const querySnapshot = await getDocs(getAuthor);
    let author: any = null;
    querySnapshot.forEach((doc) => {
      author = doc.data();
    });
    return author;
  }
  

}
