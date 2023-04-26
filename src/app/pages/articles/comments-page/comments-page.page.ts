import { SavedService } from './../../../shared/services/saved.service';
import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from 'app/shared/services/article.service';
import { LikesService } from 'app/shared/services/likes.service';
import { AuthService } from 'app/core/auth.service';
import { CommentsService } from 'app/shared/services/comments.service';

interface Comment {
  id: number;
  text: string;
}
@Component({
  selector: 'app-comments-page',
  templateUrl: './comments-page.page.html',
  styleUrls: ['./comments-page.page.scss'],
})
export class CommentsPagePage implements OnInit {
  comments:any;
  uid:any;
  isLoading:boolean = true;
  @Input() comment: any // This is the article you passed before open the modal
  @Input() idarticle:any
  @Input() idauthor:any;
  allcomment:any=this.commentService.comments

  constructor(private modalController: ModalController,
    private route: ActivatedRoute,
    private articleService:ArticleService,
    private likesService:LikesService,
    private commentService:CommentsService,
    private as:AuthService,
    private savedService:SavedService,
    private renderer: Renderer2) {}

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }
 

  newCommentText: string = '';

  async addComment(newCommentText:string) {
    // Create a new comment object with a unique ID and the provided text
    // const newComment = {
    //   id: this.comments.length + 1,
    //   text: this.newCommentText,
    //};

    // Add the new comment to the comments array
    //this.comments.push(newComment);
    // Reset the new comment text
   // this.commentService.addComment()
  // console.log(this.comment.author)
  if(this.newCommentText!=''){
    await this.commentService.addComment(this.idarticle,this.idauthor,this.newCommentText)
   console.log('comment added')
  }
  else{
    console.log("comment not added!")
  }
   
    this.newCommentText = '';
    console.log('all comments ',this.allcomment)
  }
  
  
  async ngOnInit() {
          console.log('loading comment page',this.isLoading)
//await console.log('comments ',this.comment.data)
   
  this.isLoading=true
  console.log('loading comment page',this.isLoading)
}
}
