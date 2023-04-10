import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  profile=null;
  constructor(private authService: AuthService,
    private router:Router) {}
  logout(){
    this.authService.logout();
    this.router.navigateByUrl('/',{replaceUrl:true});
  }
}
