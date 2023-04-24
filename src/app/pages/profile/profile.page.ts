import { Component, OnInit } from '@angular/core';
import { Storage, getDownloadURL, ref, uploadBytes } from '@angular/fire/storage';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { AuthService } from 'app/core/auth.service';
import { Firestore, collection, addDoc, setDoc, doc, getDoc } from '@angular/fire/firestore';
import { Observable, from, map, of, switchMap } from 'rxjs';
import { User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user$!: Observable<any>;
  image: any |null;
  uid:any;
  password ?:any
  userinfo: any
  userF:any
  constructor(
    private firestore: Firestore,
    private storage: Storage,
    private as:AuthService,
    private router: Router,
    public alertController: AlertController
  ) { }

  
  ngOnInit() {
    this.as.user.subscribe(user =>{
      this.userinfo=user
this.uid =user?.uid;

    })
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
        const email = user.email; 
        let imageUrl;
        if(this.image){
          imageUrl=this.image
        }
        else{
          imageUrl = user.imageUrl;
        }
    const country = user.country;
    const gender = user.gender;
    const name = user.name ;
    const bio = user.bio;
    const speciality = user.speciality;
   
    this.userF = { name, imageUrl,email,country,gender,bio ,speciality } ;
        console.log(this.userF);
      }
      
    });  
  }


// picture capacitor
  async takePicture() {
    try {
      if(Capacitor.getPlatform() != 'web') await Camera.requestPermissions();
      const image = await Camera.getPhoto({
        quality: 90,
        // allowEditing: false,
        source: CameraSource.Prompt,
        width: 600,
        resultType: CameraResultType.DataUrl
      });
      console.log('image: ', image);
      this.image = image.dataUrl;
        this.userF.imageUrl = this.image; // Update the userF imageUrl property with the new URL
      const blob = this.dataURLtoBlob(image.dataUrl);
      const url = await this.uploadImage(blob, image);
      console.log(url);
      
    } catch(e) {
      console.log(e);
    }
  }

  dataURLtoBlob(dataurl: any) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
  }

  async uploadImage(blob: any, imageData: any) {
    try {
      const currentDate = Date.now();
      const filePath = `userProfileImages/${currentDate}.${imageData.format}`;
      const fileRef = ref(this.storage, filePath);
      const task = await uploadBytes(fileRef, blob);
      console.log('task: ', task);
      const url = getDownloadURL(fileRef);
      return url;
    } catch(e) {
      throw(e);
    }    
  }
// update the profile !
  async updateProfile(){
    try{
      if(!this.image){
        this.image='';
      }
    const collectionInstance = collection(this.firestore, 'users');

    const docRef = doc(collectionInstance, this.uid);

    const userData = {
      id:this.uid,
      name: this.userF.name,
      bio: this.userF.bio,
      imageUrl: this.userF.imageUrl,
      email:this.userF.email,
      gender: this.userF.gender,
      speciality: this.userF.speciality,
      country:this.userF.country
    };

    await setDoc(docRef, userData);
    if(this.password){
      this.as.updatePassword(this.password)
      console.log("exist")

    }
    else{
      console.log("password does not zwsdsk")
    }
    console.log('User updated successfully!');
    const alert = await this.alertController.create({
      header: 'Success',
      message: 'User updated successfully!',
      buttons: ['OK']
    });
    await alert.present();
  
  } catch (error) {
    console.error('Error upadate user: ', error);
  }
  }

  // sign out 
 logout()
{
  this.as.logout();
  this.router.navigate(['/login']);
  this.userF=null
}
}
