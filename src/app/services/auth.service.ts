import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth) { }
  async register({email, password}: { email: string, password: string }) {
    try{
      const user = await createUserWithEmailAndPassword(this.auth,email, password);
      return user;
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
