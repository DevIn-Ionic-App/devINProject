import { Injectable } from '@angular/core';
import { Firestore,  addDoc, collectionData, deleteDoc, setDoc, } from '@angular/fire/firestore';
import { AuthService } from 'app/core/auth.service';
import { collection, query, where, onSnapshot, getDocs, getDoc, Timestamp } from "firebase/firestore";
import { doc } from "firebase/firestore";



@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  id:any
 comments:any = [];
 idArticle:any=''

  constructor(private firestore: Firestore, private as: AuthService
) { 
  
 }

//======================= add a comment ======================
async addComment(idArticle:any,idAuthor:any,comment:string) {
  try {
    let time = Timestamp.fromDate(new Date());

    const collectionInstance = collection(this.firestore, 'comments');
    const docRef = doc(collectionInstance); // Create a new document reference with a unique ID
    const commentData = {
      idArticle:idArticle,
      idAuthor:idAuthor,
      comment:comment,
      date:time,
    };
    await setDoc(docRef, commentData ); // Use setDoc() to add the document to Firestore
    console.log("comment added")
    return true;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw null;
  }
}
//========================= get all comments =================
//===========================  GET ALL ARTICLES: REAL TIME FETCH ================================

setData(data: any) {
  this.comments = [];
  console.log('Data received in service:', data);
  this.idArticle=data
  console.log('setdataset here',data)
  // Do something with the data here

  const commentsRef = collection(this.firestore, "comments");
  const queryy = query(commentsRef, where("idArticle", "==", this.idArticle));
  

  const unsubscribe = onSnapshot(queryy, (querySnapshot: any) => {

querySnapshot.forEach(async(doc: { data: () => { (): any; new(): any;[x: string]: any; }; }) => {
 let id = doc.data()['idAuthor']
 let data = doc.data()
 let author = await this.profileDetails(id)
 console.log('in the select all comments console author',data)
 let comment = { author, data}
 
     // Check if the article already exists in the array
 const index = this.comments.findIndex((existingcomments: { data: {
   idAuthor: any;
   idArticle: any; comment: any; 
}; }) => {
   return (existingcomments.data.comment === comment.data['comment'] && existingcomments.data.idArticle === comment.data['idArticle'] && existingcomments.data.idAuthor === comment.data['idAuthor'] );
 });

 if (index === -1) {
   // If the article doesn't exist, push it to the array
   this.comments.push(comment);
 } else {
   // If the article already exists, replace it with the updated version
   this.comments[index] = comment;
 }
});
});

}

 // ====================== number of comments =================
 async numberofcomments(idarticle: string): Promise<number> {
  // get a reference to the collection
  const getArticle = query(collection(this.firestore, "comments"), where("idArticle", "==", idarticle));
  const querySnapshot = await getDocs(getArticle);
  const numDocs = querySnapshot.docs.length;
  console.log(`Found ${numDocs} documents.`);

  return numDocs;
}

//======================= get profile data ==============================
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
