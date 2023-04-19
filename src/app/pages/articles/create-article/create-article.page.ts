import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { Article } from 'app/shared/models/article.model';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.page.html',
  styleUrls: ['./create-article.page.scss'],
})
export class CreateArticlePage implements OnInit {

  articleData!: FormGroup;
  article!: Article;
  constructor(private fb:FormBuilder,
    private loadingController:LoadingController,
    private alertController:AlertController, ) { }

  ngOnInit() {
    this.articleData = this.fb.group({
      title :['', [Validators.required]],
      photo :['', [Validators.required]],
      content :['', [Validators.required]],
      category :['', [Validators.required]],

    });
  }

}
