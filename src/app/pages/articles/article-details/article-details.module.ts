import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArticleDetailsPageRoutingModule } from './article-details-routing.module';
import { NowPipe } from 'app/shared/pipes/now.pipe';
import { ArticleDetailsPage } from './article-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArticleDetailsPageRoutingModule
  ],
  declarations: [ArticleDetailsPage,NowPipe]
})
export class ArticleDetailsPageModule {}
