import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';


import { User } from '@firebase/auth';
import * as firebase from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Firestore, collection, addDoc, setDoc, doc, getDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {


  user:Observable<firebase.User | null>;
  constructor(private auth: Auth, private firestore: Firestore ,    private afAuth: AngularFireAuth,
    ) {
    {
      this.user = this.afAuth.authState as Observable<User | null>;
      console.log('this is firestor observables',this.user)
    }  }

  async register({name,email,password}: {name: string;email: string;password: string}) {
    try {
      const user = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );

      return user;
    } catch (e) {
      throw null;
    }
  }

  async addUser(name: string, email: string, id: string) {
    try {
      const collectionInstance = collection(this.firestore, 'users');
      const docRef = doc(collectionInstance, id);
  
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        console.log('User already exists with ID:', id);
        return;
      }
  
      const userData = {
        id:id,
        name: name,
        email: email,
        bio: '',
        imageUrl: '',
        gender: '',
        speciality: '',
        country:''
      };
  
      await setDoc(docRef, userData);
      console.log('User added successfully!');
    } catch (error) {
      console.error('Error adding user: ', error);
    }

  }
  async updatePassword(newPassword: string): Promise<void> {
    try {
      const user = await this.afAuth.currentUser;
      if (user) {
        await user.updatePassword(newPassword);
        console.log('Password updated successfully');
      }
      else{
        console.log("user does not exist ")
      }
    } catch (error) {
      console.error('Error updating password:', error);
    }
  }
  
  async login({ email, password }: { email: string; password: string }) {
    try {
      const user = await signInWithEmailAndPassword(this.auth, email, password);
      return user;
    } catch (e) {
      throw null;
    }
  }
  logout() {
    return signOut(this.auth);
  }

}
