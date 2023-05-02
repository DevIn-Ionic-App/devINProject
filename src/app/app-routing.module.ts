import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {canActivate, redirectLoggedInTo, redirectUnauthorizedTo} from '@angular/fire/auth-guard';
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);
const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    ...canActivate(redirectUnauthorizedToLogin)

  },
  {
    path: '',
    redirectTo: 'firstpage',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
    // ...canActivate(redirectLoggedInToHome)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./pages/sign-up/sign-up.module').then( m => m.SignUpPageModule),
    // ...canActivate(redirectLoggedInToHome)

  },
  {
    path: 'firstpage',
    loadChildren: () => import('./pages/firstpage/firstpage.module').then( m => m.FirstpagePageModule)
  },
  {
    path: 'article-details/:id',
    loadChildren: () => import('./pages/articles/article-details/article-details.module').then( m => m.ArticleDetailsPageModule)
  },
  {
    path: 'comments-page',
    loadChildren: () => import('./pages/articles/comments-page/comments-page.module').then( m => m.CommentsPagePageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  }
  ,
 
  {
    path: 'create-article',
    loadChildren: () => import('./pages/articles/create-article/create-article.module').then( m => m.CreateArticlePageModule)
  },
  {
    path: 'edit-article/:id',
    loadChildren: () => import('./pages/articles/edit-article/edit-article.module').then( m => m.EditArticlePageModule)
  }



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
