import { SavedService } from './../../../shared/services/saved.service';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CommentsPagePage } from '../comments-page/comments-page.page';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from 'app/shared/services/article.service';
import { LikesService } from 'app/shared/services/likes.service';
import { AuthService } from 'app/core/auth.service';
import { CommentsService } from 'app/shared/services/comments.service';

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
isLoading: boolean = true;
iconSave:any="fa-regular fa-bookmark"
allcomment:any=this.commentService.comments

  constructor(private modalController: ModalController,
    private route: ActivatedRoute,
    private articleService:ArticleService,
    private likesService:LikesService,
    private commentService:CommentsService,
    private as:AuthService,
    private savedService:SavedService,
    private renderer: Renderer2) {
      
  }



  
  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.as.user.subscribe(user =>{
      
      this.uid =user?.uid;
      
          })
          console.log(this.isLoading)
    this.idarticle = id;
    
    try {
     
      this.articleDet = await this.articleService.articleDetails(id);
      console.log(this.articleDet.authorId);
      this.nblikes = await this.likesService.numberoflikes(this.idarticle);
      console.log(`Number of likes: ${this.nblikes}`);
      this.likedornot =  await this.likesService.LikedOrNot(this.idarticle,this.uid)
      console.log(`liked or not':${this.likedornot}`)
      this.savedornot =  await this.savedService.SavedOrNot(this.idarticle,this.uid)
      console.log(`saved or not':${this.savedornot}`)


       this.profileDet = await this.articleService.profileDetails(this.articleDet.authorId);
      console.log(this.articleDet.title);
       console.log(this.profileDet.name);
       this.isLoading=false
    console.log('this is loading ',this.isLoading)
    } catch (e) {
      console.error("Error fetching article: ", e);
    }
    

    if (this.savedornot > 0) {
      this.clickedSave = true;
      this.iconSave = "fa-solid fa-bookmark";
    }
    
    if (this.likedornot > 0) {
      console.log("m in the liked or not condition ")
      const divElement = document.querySelector('.likes');
      const iconLikes = document.querySelector('.iconlikes');
      
      if (divElement) {
        console.log("div element is readed ")
        this.renderer.setStyle(divElement, 'background', '#ca0202');
        this.renderer.setStyle(divElement, 'color', 'white');
      }
      
      if (iconLikes) {
        this.renderer.setStyle(iconLikes, 'color', 'white');
      }
      this.clicked = true;

    }
    
  }
 
 // open the modall
  async showComments() {
    let comments =  await this.commentService.comments

    const modal = await this.modalController.create({
      component: CommentsPagePage,
      componentProps: {
        comment: comments,
        idarticle:this.idarticle,
        idauthor: this.uid
      },
    });
    return await modal.present();
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
