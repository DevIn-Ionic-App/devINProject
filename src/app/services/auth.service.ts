import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Firestore ,collection,addDoc} from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: Auth,
    private firestore: Firestore) { }
  async register({name, email, password}: { name:string, email: string, password: string }) {
    try{
      const collectionInstance = collection(this.firestore, 'users');
      const user = await createUserWithEmailAndPassword(this.auth,email, password)
   

        const userData = {
          name: name,
          email: email,
        };
        addDoc(collectionInstance, userData).then(() => {
              
        }).catch((err) => {
          
        })
      return user
    }
    catch(e){
      throw null;
    }
}

  async login({email, password}: { email: string, password: string }) {
    
      try{
        const user = await signInWithEmailAndPassword(this.auth,email, password);
        return user;
      }
      catch(e){
        throw null;
      }
  }
  logout(){
    return signOut(this.auth);
  }

}
