import { AuthService } from './../core/auth.service';
import { UserService } from 'app/shared/services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'app/shared/models/article.model';
import { ArticleService } from 'app/shared/services/article.service';
import { LikesService } from 'app/shared/services/likes.service';

import * as moment from 'moment';
import { CommentsService } from 'app/shared/services/comments.service';
import { SavedService } from 'app/shared/services/saved.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  

  isLoading:boolean=true;
  //============================== user  =====================================
  userId:string=""
  userPhotoUrl :string = '';
  //============================= tabs variables ================================
  chooseLike:boolean=false;
  chooseSave:boolean=false;
  chooseMine:boolean=false;
  chooseAll:boolean=false;

//=============================== searching variables ===========================
searchTerm: string='';
selectedCategory: string = '';
  //=============================  articles arrays    ==============================
  trendy!:any;
  articles: any|null;
  liked: any[] =[];
  saved !:any;
  mine!:any;

//============================= END OF VARIABLES SECTION =========================

  constructor(private authService: AuthService,
    private likesService:LikesService,
    private savedService:SavedService,

    private router:Router, private userService: UserService,private commentService:CommentsService, private articleService: ArticleService) {
      //  this.articleService.getPhoto()
      
    }

   ngOnInit() {
    this.authService.user.subscribe(async user => {
      if (user) {
        this.userId = user.uid;
        this.likesService.addlikes('',this.userId)
        this.likesService.deleteDocument('',this.userId)
        this.savedService.addsave('',this.userId)
        this.savedService.deleteSave('',this.userId)

      }})
    //============================== GET ALL ARTICLES ======================================
    this.articles = this.articleService.articles;
    if(this.articleService.trendings.length){
      this.trendy = this.articleService.trendings;

    }else {
      this.trendy = this.articles;

    }
    
    this.isLoading=false
    
    this.articleService.getLiked().subscribe((liked: any[] | any) => {
      if (liked instanceof Array) {
        this.liked = liked;
      } })

  }

  //================    logout ===========================
  get filteredArticles() {
    let filtered = this.articles; // start with all articles
    
    // apply search filter
    if (!this.searchTerm.trim()) {
      // if search term is empty or whitespace, return all articles
      // console.log("Search term is empty or whitespace. Showing all articles.");
    } else {
      // filter articles that match the search term
      filtered = this.articles.filter((article: { data: { title: string; }; }) =>
        article.data.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
      // console.log("Showing articles that match search term:", this.searchTerm);
    }
  
    // apply category filter
    if (this.selectedCategory && this.selectedCategory !== "ALL") {
      filtered = filtered.filter((article: { data: { category: string; }; }) => {
        return article.data.category === this.selectedCategory;
      });
      // console.log("Showing articles in category:", this.selectedCategory);
    } 
    if(this.chooseLike){
      // console.log(this.liked)
      if(this.liked.length){
        filtered = this.liked
      }
      // console.log(this.liked)
    }
     if(this.chooseSave){
      filtered = this.saved

    }
     if(this.chooseAll){
      filtered = this.articles

    }
    if(this.chooseMine){
      filtered = this.mine

    }
    else {
      // console.log("Showing articles in all categories.");
    }
  
    return filtered;
  }
  
  async goToArticleDetails(id: string) {
    await  this.commentService.setData(id);
      console.log("it's set",id)
    this.router.navigate(['/article-details', id]);
  }
  //=================================== HANDEL THE TABS CHOICES ===========================
  //============= CHOOSE LIKED ARTICLES================================
  choseLike(){
    // this.getLiked()

    this.chooseLike = true
    this.chooseSave = false
    this.chooseAll = false
    this.chooseMine = false
  }
    //============= CHOOSE SAVED ARTICLES================================
    choseSave(){
      this.chooseLike = false
      this.chooseSave = true
      this.chooseAll = false
      this.chooseMine = false

    }
    //============= CHOOSE USER ARTICLES================================
    choseMine(){
      this.chooseLike = false
      this.chooseSave = false
      this.chooseAll = false
      this.chooseMine = true    }
        //============= CHOOSE USER ARTICLES================================
        choseAll(){
          this.chooseLike = false
          this.chooseSave = false
          this.chooseAll = true
          this.chooseMine = false        }
}
