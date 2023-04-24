import { AuthService } from './../core/auth.service';
import { UserService } from 'app/shared/services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'app/shared/models/article.model';
import { ArticleService } from 'app/shared/services/article.service';
import * as moment from 'moment';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  profile=null;

  constructor(private authService: AuthService,
    private router:Router, private userService: UserService, private articleService: ArticleService) {}
  //================  articles ====================
  trendy!:any;
  articles: any;
  ngOnInit(): void {

    //============================== GET ALL ARTICLES ======================================
    this.articles = this.articleService.articles;
    this.trendy = this.articleService.articles;
    
}
  //================    logout ===========================
  logout(){
    this.authService.logout();
    this.router.navigateByUrl('/',{replaceUrl:true});
  }
  goToArticleDetails(id: string) {
    this.router.navigate(['/article-details', id]);
  }
  
  
}
