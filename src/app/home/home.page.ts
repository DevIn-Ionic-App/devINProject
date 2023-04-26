import { AuthService } from './../core/auth.service';
import { UserService } from 'app/shared/services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'app/shared/models/article.model';
import { ArticleService } from 'app/shared/services/article.service';
import * as moment from 'moment';
import { CommentsService } from 'app/shared/services/comments.service';
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


  constructor(private authService: AuthService,
    private router:Router, private userService: UserService,private commentService:CommentsService, private articleService: ArticleService) {}
  //================  articles ====================
  trendy!:any;
  articles: any|null;
  ngOnInit(): void {

    //============================== GET ALL ARTICLES ======================================
    this.articles = this.articleService.articles;
    this.trendy = this.articleService.trendings;
    this.isLoading=false
}

  //================    logout ===========================
  get filteredArticles() {
    let filtered = this.articles; // start with all articles
    
    // apply search filter
    if (!this.searchTerm.trim()) {
      // if search term is empty or whitespace, return all articles
      console.log("Search term is empty or whitespace. Showing all articles.");
    } else {
      // filter articles that match the search term
      filtered = this.articles.filter((article: { data: { title: string; }; }) =>
        article.data.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
      console.log("Showing articles that match search term:", this.searchTerm);
    }
  
    // apply category filter
    if (this.selectedCategory && this.selectedCategory !== "ALL") {
      filtered = filtered.filter((article: { data: { category: string; }; }) => {
        return article.data.category === this.selectedCategory;
      });
      console.log("Showing articles in category:", this.selectedCategory);
    } else {
      console.log("Showing articles in all categories.");
    }
  
    return filtered;
  }
  
  async goToArticleDetails(id: string) {
    await  this.commentService.setData(id);
      console.log("it's set",id)
    this.router.navigate(['/article-details', id]);
  }
  
  
}
