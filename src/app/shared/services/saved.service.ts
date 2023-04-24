import { Injectable } from '@angular/core';
import { Firestore,  addDoc, collectionData, deleteDoc, setDoc, } from '@angular/fire/firestore';
import { AuthService } from 'app/core/auth.service';
import { collection, query, where, onSnapshot, getDocs, getDoc } from "firebase/firestore";
import { doc } from "firebase/firestore";

@Injectable({
  providedIn: 'root'
})
export class SavedService {
  id:any
  constructor(private firestore: Firestore, private as: AuthService
 ) { 
 }
// ======================= Add a docucment of like ============================
  async addsave(idArticle:any,idAuthor:any) {
    try {
      const collectionInstance = collection(this.firestore, 'saved');
      const docRef = doc(collectionInstance); // Create a new document reference with a unique ID
      const likesData = {
        idArticle:idArticle,
        idAuthor:idAuthor,
      };
      await setDoc(docRef, likesData ); // Use setDoc() to add the document to Firestore
      console.log("save added")
      return true;
    } catch (e) {
      console.error("Error adding document: ", e);
      throw null;
    }

    
  }
  //========================== delete a document of likes =================================
  async deleteSave(idarticle: string, idauthor: string): Promise<void> {
    // get a reference to the collection
 
    const getArticle = query(collection(this.firestore, "saved"), where("idArticle", "==", idarticle), where("idAuthor", "==", idauthor));
    const querySnapshot = await getDocs(getArticle);
    // define the query to get the document to delete
   
  
    // check if there are any documents to delete
    const numDocs = querySnapshot.docs.length;
    console.log(`Found ${numDocs} saved documents to delete.`);
  
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
   async SavedOrNot(idarticle: string, idauthor: string): Promise<number> {
    // get a reference to the collection
    const getArticle = query(collection(this.firestore, "saved"), where("idArticle", "==", idarticle), where("idAuthor", "==", idauthor));
    const querySnapshot = await getDocs(getArticle);
    const numDocs = querySnapshot.docs.length;
    console.log(`Found ${numDocs} saved documents.`);

    return numDocs;
}
  
  
  
}
