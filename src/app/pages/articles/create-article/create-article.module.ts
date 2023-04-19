import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateArticlePageRoutingModule } from './create-article-routing.module';

import { CreateArticlePage } from './create-article.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateArticlePageRoutingModule,
    ReactiveFormsModule

  ],
  declarations: [CreateArticlePage]
})
export class CreateArticlePageModule {}
