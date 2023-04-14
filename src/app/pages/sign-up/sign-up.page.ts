import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
 

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
    get name(){
      return this.credentials.get('name');
    }
  ngOnInit() {
    this.credentials = this.fb.group({
      name: ['', [Validators.required,Validators.minLength(3)]],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
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
// Registraion 
async register(){
  const loading = await this.loadingController.create();
  await loading.present();
  const user= await this.authService.register(this.credentials.value);
  await loading.dismiss();

  if(user==null){
    this.showAlert('Registration failed', 'Please try again later!')

  }
  else{
    const name= this.credentials.value.name;
    const email= this.credentials.value.email;
    this.authService.addUser(name,email, user.user.uid )
    this.router.navigateByUrl('/home',{replaceUrl:true});
  }
}

}
