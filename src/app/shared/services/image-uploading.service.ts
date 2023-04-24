import { Injectable } from '@angular/core';
import { Storage, getDownloadURL, ref, uploadBytes, uploadBytesResumable } from '@angular/fire/storage';
import{Capacitor} from '@capacitor/core'
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Url } from 'url';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadingService {

  constructor(  private storage: Storage ) { }

   /*========================== upload photo=====================================
            this fct allows to ulpoad images using capacitor and it returns the url of the image
   */
  
   async uploadImg( img : any){
    try{
 
     if(Capacitor.getPlatform() !='web')await Camera.requestPermissions()
     const image = await Camera.getPhoto({
       quality: 90,
       source :CameraSource.Prompt,
       width: 600,
       resultType: CameraResultType.DataUrl
     })
 
     img = image.dataUrl;
     const blob = this.dataURLToBlob(image.dataUrl);
     const url = await this.uploadImage(blob, image);
     img = url
     console.log(img);
    }
    catch(e){
 
    }
   }
   //======================================= dataURLToBlob================================

dataURLToBlob(dataUrl:any){
  let arr = dataUrl.split(','),mime = arr[0].match(/:(.*?);/)[1],
  bstr = atob(arr[1]), n =bstr.length,u8arr = new Uint8Array(n);
  while(n--){
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr],{type:mime})
  
}

async uploadImage(blob:any, imageData : any){
  try{

    const currentDate = Date.now();
    const filePath = `articlesPhotos/${currentDate}.${imageData.format}`;
    const fileRef = ref(this.storage, filePath);
    const task = await uploadBytes(fileRef, blob);
    console.log('task: ',task)
    const url = getDownloadURL(fileRef);
    return url;

  }catch(e){
      throw(e)
  }
}
}
