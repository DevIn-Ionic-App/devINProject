import { AuthService } from './../../core/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from 'app/shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials!:FormGroup;
  constructor(private fb:FormBuilder,
    private loadingController:LoadingController,
    private alertController:AlertController,
    private authService:AuthService,
    private router:Router,
    private userService:UserService) { }

    get email(){
      return this.credentials.get('email');
    }
    get password(){
      return this.credentials.get('password');
    }
  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  async showAlert(header:any,message:string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: 
      ['OK']
    })
    await alert.present();
}


async login(){
  const loading = await this.loadingController.create();
  await loading.present();
  const user= await this.authService.login(this.credentials.value);
  await loading.dismiss();

  if(user== null){
    this.showAlert('Login failed', 'Please try again later!')

  }
  else{
    
    this.userService.userId = user.user.uid
    this.router.navigateByUrl('/home',{replaceUrl:true});

  }
}

}
