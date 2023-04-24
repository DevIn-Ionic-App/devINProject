import { SavedService } from './../../../shared/services/saved.service';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CommentsPagePage } from '../comments-page/comments-page.page';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from 'app/shared/services/article.service';
import { LikesService } from 'app/shared/services/likes.service';
import { AuthService } from 'app/core/auth.service';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.page.html',
  styleUrls: ['./article-details.page.scss'],
})
export class ArticleDetailsPage implements OnInit {
articleDet:any
idarticle:any
likedornot:any
savedornot:any
nblikes:any
clicked:any = false
clickedSave:any = false
profileDet:any
uid:any
iconSave:any="fa-regular fa-bookmark"
  constructor(private modalController: ModalController,
    private route: ActivatedRoute,
    private articleService:ArticleService,
    private likesService:LikesService,
    private as:AuthService,
    private savedService:SavedService,
    private renderer: Renderer2) {
      
  }

  async showComments() {
    const modal = await this.modalController.create({
      component: CommentsPagePage,
    });
    return await modal.present();
  }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.as.user.subscribe(user =>{
      
      this.uid =user?.uid;
      
          })
    
    this.idarticle = id;
    try {
      this.likedornot =  this.likesService.LikedOrNot(this.idarticle,this.uid)
      console.log('liked or not',this.likedornot)
      this.articleDet = await this.articleService.articleDetails(id);
      console.log(this.articleDet.authorId);
      this.nblikes = await this.likesService.numberoflikes(this.idarticle);
      this.likedornot =  await this.likesService.LikedOrNot(this.idarticle,this.uid)
      console.log(`liked or not':${this.likedornot}`)
      this.savedornot =  await this.savedService.SavedOrNot(this.idarticle,this.uid)
      console.log(`liked or not':${this.savedornot}`)
console.log(`Number of likes: ${this.nblikes}`);
if(this.likedornot>0){
  this.clicked=true
  const divElement = document.getElementById('likes');
  const iconLikes = document.getElementById('iconlikes');
  this.renderer.setStyle(divElement, 'background', '#ca0202');
  this.renderer.setStyle(divElement, 'color', 'white');
  this.renderer.setStyle(iconLikes, 'color', 'white');

  }
  if(this.savedornot>0){
    this.clickedSave=true
    this.iconSave="fa-solid fa-bookmark"  
    }
       this.profileDet = await this.articleService.profileDetails(this.articleDet.authorId);
      console.log(this.articleDet.title);
       console.log(this.profileDet.name);
    } catch (e) {
      console.error("Error fetching article: ", e);
    }
  }
 
 
  LikeArticle(){
    if(!this.clicked){
      this.clicked=true;
    const divElement = document.getElementById('likes');
    const iconLikes = document.getElementById('iconlikes');
    this.renderer.setStyle(divElement, 'background', '#ca0202');
    this.renderer.setStyle(divElement, 'color', 'white');
    this.renderer.setStyle(iconLikes, 'color', 'white');
    this.likesService.addlikes(this.idarticle,this.uid)
    console.log('id article',this.idarticle)
    console.log('id author',this.uid)
    this.nblikes++

   
    }
    else{
      this.clicked=false
      const divElement = document.getElementById('likes');
      const iconLikes = document.getElementById('iconlikes');
      this.renderer.setStyle(divElement, 'background', 'white');
      this.renderer.setStyle(divElement, 'color', 'black');
      this.renderer.setStyle(iconLikes, 'color', '#ca0202');
    this.likesService.deleteDocument(this.idarticle,this.uid)
    console.log('id article',this.idarticle)
    console.log('id author',this.uid)
    this.nblikes--

    }
  
    
  }
  SaveArticle(){
    if(!this.clickedSave){
      this.clickedSave=true;
    this.iconSave="fa-solid fa-bookmark"
    this.savedService.addsave(this.idarticle,this.uid)

   
    }
    else{
      this.clickedSave=false
      this.iconSave="fa-regular fa-bookmark"
      this.savedService.deleteSave(this.idarticle,this.uid)

    }
  
  }
}
