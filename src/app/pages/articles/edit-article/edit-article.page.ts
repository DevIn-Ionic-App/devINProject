import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from 'app/core/auth.service';
import { ArticleService } from 'app/shared/services/article.service';
import { ImageUploadingService } from 'app/shared/services/image-uploading.service';
import { UserService } from 'app/shared/services/user.service';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.page.html',
  styleUrls: ['./edit-article.page.scss'],
})
export class EditArticlePage implements OnInit {
  articleData: any;
  article: any;
  id:any
  constructor(
    private route: ActivatedRoute,
    private fb:FormBuilder,
    private loadingController:LoadingController,
    private alertController:AlertController, 
    private articleService:ArticleService,
    private router:Router,
    private authService:AuthService,
    private imgUploader: ImageUploadingService ,
    private userService: UserService

  ) { }

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
     this.id = this.route.snapshot.paramMap.get('id');
    this.articleData = this.fb.group({
      title: ['', [Validators.required]],
      photo: ['', [Validators.required]],
      content: ['', [Validators.required]],
      category: ['', [Validators.required]],
      date: ['', [Validators.required]],
      uid: [''],
      authorId: ['']
    });
     this.article = this.articleService.articles.filter((article: { data: { uid: any; }; }) =>article.data.uid == this.id)
     console.log(this.article)
    if (this.article) {
      this.articleData.patchValue(this.article);
    }
  }
  async updateArticle() {
    const loading = await this.loadingController.create();
    await loading.present();
  
    try {
      const articleId = this.articleData.get('uid')?.value;
      const updatedArticleData = this.articleData.value;
      delete updatedArticleData.uid;
      const result = await this.articleService.updateArticle(articleId, updatedArticleData);
  
      await loading.dismiss();
  
      if (result) {
        this.showAlert('Success', 'Article updated successfully');
        this.router.navigateByUrl('/home', { replaceUrl: true });
      } else {
        this.showAlert('Error', 'Could not update article');
      }
    } catch (e) {
      await loading.dismiss();
      this.showAlert('Error', 'Could not update article');
      console.error("Error updating article: ", e);
    }
  }
  

}
