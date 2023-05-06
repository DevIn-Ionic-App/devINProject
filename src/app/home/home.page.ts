import { Firestore, collection } from '@angular/fire/firestore';
import { AuthService } from './../core/auth.service';
import { UserService } from 'app/shared/services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'app/shared/models/article.model';
import { ArticleService } from 'app/shared/services/article.service';
import * as moment from 'moment';
import { CommentsService } from 'app/shared/services/comments.service';
import { filter, first, of, switchMap } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  profile=null;
  searchTerm: string='';
  selectedCategory: string = '';
  isLoading:boolean=true;
  uid:any;
  savedArticles$: any;
  allminesavedpost:any;
  allminelikedpost:any;
  allminePosts:any;
  savedClick:boolean=false
  likedClick: boolean=false;
  mineClick:boolean=false
  constructor(private as: AuthService,private firestore:Firestore,
    private router:Router, private userService: UserService,private commentService:CommentsService, private articleService: ArticleService) {}
  //================  articles ====================
  trendy!:any;
  articles: any|null;
  async ngOnInit() {
    this.as.user.pipe(
      switchMap((user :any ):any => {
        if (user) {
          
           this.articleService.setid(user.uid);
           this.articleService.setidliked(user.uid);
           this.articleService.setidmine(user.uid);
     this.allminesavedpost = this.articleService.savedPosts;
     this.allminelikedpost=this.articleService.likedPosts;
     this.allminePosts=this.articleService.minePosts;
     console.log("this is my posts",this.allminesavedpost)
     return true



        } else {
          return of(null);
        }
      })
    ).subscribe(() => {
      console.log('setid function finished');
      console.log('this is all mine saved post', this.allminesavedpost);
    });
    
    //============================== GET ALL ARTICLES ======================================
    this.articles = this.articleService.articles;
    this.trendy = this.articleService.trendings;
    this.isLoading=false;
    console.log('this is all mine saved post', this.allminesavedpost);

}

  //================    logout ===========================
  get filteredArticles() {
    let filtered = this.articles; // start with all articles
    
    // apply search filter
    if (!this.searchTerm.trim()) {
      // if search term is empty or whitespace, return all articles
      //console.log("Search term is empty or whitespace. Showing all articles.");
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
      //console.log("Showing articles in category:", this.selectedCategory);
    } else {

      console.log('nb selected',filtered.length)
      //console.log("Showing articles in all categories.");

    }
    if(this.savedClick){
      this.likedClick=false
      filtered=this.allminesavedpost
      console.log('this saved clik ',this.savedClick)
      console.log("filtered articles",filtered)
    }
    if(this.likedClick){
      this.savedClick=false
      filtered=this.allminelikedpost
      console.log('this liked click ',this.likedClick)
      console.log("filtered articles",filtered)
    }
    if(this.mineClick){
      this.savedClick=false
      this.likedClick=false
      filtered=this.allminePosts
      console.log('this mine click ',this.mineClick)
      console.log("filtered articles",filtered)
    }
       // If a user is logged in, filter articles based on user likes/saves
      //  if (this.uid) {
      //   this.firestore.collection('saved').valueChanges().subscribe(saved => {
      //     const savedArticles = saved.filter(s => s.userId === this.currentUser.uid).map(s => s.articleId);
      //     this.filteredArticles = this.filteredArticles.filter(article => savedArticles.includes(article.id));
      //   });
      // }
  
    return filtered;
  }
  
  async goToArticleDetails(id: string) {
    await  this.commentService.setData(id);
      console.log("it's set",id)
    this.router.navigate(['/article-details', id]);
  }}
