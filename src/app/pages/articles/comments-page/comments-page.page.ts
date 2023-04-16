import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
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
  comments: Comment[] = [
    { id: 1, text: 'this is the best article ever.' },
    { id: 2, text: 'I share the same idea as yours .' },
    { id: 3, text: 'nice article.' },
  ];
  constructor(private modalController: ModalController) {}

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }
  newComment: Comment = {
    id: 0,
    text: '',
  };

  newCommentText: string = '';

  addComment(newCommentText:string) {
    // Create a new comment object with a unique ID and the provided text
    const newComment = {
      id: this.comments.length + 1,
      text: this.newCommentText,
    };

    // Add the new comment to the comments array
    this.comments.push(newComment);

    // Reset the new comment text
    this.newCommentText = '';
  }
  
  
  ngOnInit() {
  }

}
