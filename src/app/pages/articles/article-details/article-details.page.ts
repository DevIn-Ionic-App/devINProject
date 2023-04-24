import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CommentsPagePage } from '../comments-page/comments-page.page';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from 'app/shared/services/article.service';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.page.html',
  styleUrls: ['./article-details.page.scss'],
})
export class ArticleDetailsPage implements OnInit {
articleDet:any
profileDet:any
  constructor(private modalController: ModalController,private route: ActivatedRoute,private articleService:ArticleService) {

  }

  async showComments() {
    const modal = await this.modalController.create({
      component: CommentsPagePage,
    });
    return await modal.present();
  }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    try {
      this.articleDet = await this.articleService.articleDetails(id);
      console.log(this.articleDet.authorId);

       this.profileDet = await this.articleService.profileDetails(this.articleDet.authorId);
      console.log(this.articleDet.title);
       console.log(this.profileDet.name);
    } catch (e) {
      console.error("Error fetching article: ", e);
    }
  }

}
