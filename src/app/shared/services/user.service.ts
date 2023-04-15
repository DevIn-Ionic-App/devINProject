import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: Firestore) { }

 


  getUserById(id:string){
    const users =  collection(this.firestore,"users");
    let user
    collectionData(users).subscribe(all => 
       user= (all).find(user => user['id'] === id))
       console.log(user)
    return user;
  }
}
