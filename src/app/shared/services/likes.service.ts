import { Injectable } from '@angular/core';
import { Firestore,  addDoc, collectionData, deleteDoc, setDoc, } from '@angular/fire/firestore';
import { AuthService } from 'app/core/auth.service';
import { collection, query, where, onSnapshot, getDocs, getDoc } from "firebase/firestore";
import { doc } from "firebase/firestore";


@Injectable({
  providedIn: 'root'
})
export class LikesService {

  id:any
  constructor(private firestore: Firestore, private as: AuthService
 ) { 
 }
// ======================= Add a docucment of like ============================
  async addlikes(idArticle:any,idAuthor:any) {
    try {
      const collectionInstance = collection(this.firestore, 'likes');
      const docRef = doc(collectionInstance); // Create a new document reference with a unique ID
      const likesData = {
        idArticle:idArticle,
        idAuthor:idAuthor,
      };
      await setDoc(docRef, likesData ); // Use setDoc() to add the document to Firestore
      console.log("likes added")
      return true;
    } catch (e) {
      console.error("Error adding document: ", e);
      throw null;
    }

    
  }
  //========================== delete a document of likes =================================
  async deleteDocument(idarticle: string, idauthor: string): Promise<void> {
    // get a reference to the collection
 
    const getArticle = query(collection(this.firestore, "likes"), where("idArticle", "==", idarticle), where("idAuthor", "==", idauthor));
    const querySnapshot = await getDocs(getArticle);
    // define the query to get the document to delete
   
  
    // check if there are any documents to delete
    const numDocs = querySnapshot.docs.length;
    console.log(`Found ${numDocs} documents to delete.`);
  
    // loop through the documents matching the query
    const promises = querySnapshot.docs.map((doc) => {
      // delete the document
      return deleteDoc(doc.ref);
    });
  
    // wait for all delete operations to complete
    await Promise.all(promises);
  
    console.log('Documents deleted successfully!');
  }
  
   //========================== getNumber of likes of likes =================================
   async LikedOrNot(idarticle: string | null, idauthor: string): Promise<number> {
    // get a reference to the collection
    const getArticle = query(collection(this.firestore, "likes"), where("idArticle", "==", idarticle), where("idAuthor", "==", idauthor));
    const querySnapshot = await getDocs(getArticle);
    const numDocs = querySnapshot.docs.length;
    console.log(`Found ${numDocs} liked documents.`);

    return numDocs;
}
  
  
  // ===================== get if the user liked or not the article =================

  async numberoflikes(idarticle: string | null) : Promise<number> {
    // get a reference to the collection
    const getArticle = query(collection(this.firestore, "likes"), where("idArticle", "==", idarticle));
    const querySnapshot = await getDocs(getArticle);
    const numDocs = querySnapshot.docs.length;
    console.log(`Found ${numDocs} documents.`);
  
    return numDocs;
  }

}
