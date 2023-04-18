import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor() { }
  onCameraClick() {
    const inputElement = document.getElementById('image-input') as HTMLInputElement;
    inputElement.click();
  }
  
  ngOnInit() {
  }

}
