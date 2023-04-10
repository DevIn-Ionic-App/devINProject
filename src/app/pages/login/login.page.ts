import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

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
    private router:Router) { }

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

  if(user){
    this.router.navigateByUrl('/home',{replaceUrl:true});
  }
  else{
    this.showAlert('Login failed', 'Please try again later!')
  }
}
}
