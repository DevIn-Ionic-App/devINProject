import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CommentsPagePage } from '../comments-page/comments-page.page';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.page.html',
  styleUrls: ['./article-details.page.scss'],
})
export class ArticleDetailsPage implements OnInit {

  constructor(private modalController: ModalController) {}

  async showComments() {
    const modal = await this.modalController.create({
      component: CommentsPagePage,
    });
    return await modal.present();
  }

  ngOnInit() {
  }

}
