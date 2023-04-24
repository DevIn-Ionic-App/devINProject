import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { ArticleService } from 'app/shared/services/article.service';
import { ImageUploadingService } from 'app/shared/services/image-uploading.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import{Capacitor} from '@capacitor/core'
import { Timestamp } from 'firebase/firestore';
import { AuthService } from 'app/core/auth.service';
import { UserService } from 'app/shared/services/user.service';


@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.page.html',
  styleUrls: ['./create-article.page.scss'],
})
export class CreateArticlePage implements OnInit {
  uid:any
  articleData!: FormGroup;
  constructor(private fb:FormBuilder,
    private loadingController:LoadingController,
    private alertController:AlertController, 
    private articleService:ArticleService,
    private router:Router,
    private authService:AuthService,
    private imgUploader: ImageUploadingService ,
    private userService: UserService) { }


    async showAlert(header:any,message:string) {
      const alert = await this.alertController.create({
        header,
        message,
        buttons: 
        ['OK']
      })
      await alert.present();
  }
  
  ngOnInit() {
    this.articleData = this.fb.group({
      title: ['', [Validators.required]],
      photo: ['', [Validators.required]],
      content: ['', [Validators.required]],
      category: ['', [Validators.required]],
      date: ['', [Validators.required]],
     
    });
  
    
    
  }
  //========================== upload photo=====================================
  image : any

  async upload( ){
    try{
 
     if(Capacitor.getPlatform() !='web')await Camera.requestPermissions()
     const image = await Camera.getPhoto({
       quality: 90,
       source :CameraSource.Prompt,
       width: 600,
       resultType: CameraResultType.DataUrl
     })
 
     this.image = image.dataUrl;
     const blob = this.imgUploader.dataURLToBlob(image.dataUrl);
     const url = await this.imgUploader.uploadImage(blob, image);
     this.image = url
     console.log(this.image);
    }
    catch(e){
 
    }
   }
  //============================================
  async createArticle(){
    
    //================ add the url to article img field =======================
    this.articleData.get('photo')?.patchValue(this.image)

    //================ add date to article date field =======================
    let time = Timestamp.fromDate(new Date());

    this.articleData.get('date')?.patchValue(time)

    //================ add authorId to article id field =======================
    let id = this.userService.userId
    this.articleData.get('authorId')?.patchValue(id)

    const loading = await this.loadingController.create();
    await loading.present();
    
    let result = await this.articleService.createArticle(this.articleData.value);
      await loading.dismiss();
 
    if(result){
      this.showAlert('Succes ','Published succefuly ✅')
      this.router.navigateByUrl('/home',{replaceUrl:true});


    }
    else{
      this.showAlert('Error','try later ❌')

    }

  }

}

