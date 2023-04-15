import { AuthService } from './../core/auth.service';
import { UserService } from 'app/shared/services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'app/shared/models/article.model';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  profile=null;

  constructor(private authService: AuthService,
    private router:Router, private userService: UserService) {}
  //================  articles ====================
  trendy!: Article[];
  articles!: Article[];
  ngOnInit(): void {
    this.trendy =[
      {
        title: 'New research has shown that while',
        authorId: 'KfXxsRYiaYhThcJCUbX1pfvQRgE3',
        date:new Date(2023, 3, 15, 12, 30, 0, 0),
        content: 'New research has shown that while the use of immersive virtual reality (IVR) increases student enjoyment and presence in a task, when used on its own it does not improve procedural or declarative knowledge when compared to the more traditional learning activity of watching a video.',
        likes :200,
        saves : 100,
        img:"https://kenzie.snhu.edu/wp-content/uploads/2020/11/AdobeStock_241083104-540x420.jpg",
        category:"IT"
      },
      // {
      //   title: 'article 1',
      //   authorId: 'KfXxsRYiaYhThcJCUbX1pfvQRgE3',
      //   date:new Date(2023, 3, 15, 12, 30, 0, 0),
      //   content: 'New research has shown that while the use of immersive virtual reality (IVR) increases student enjoyment and presence in a task, when used on its own it does not improve procedural or declarative knowledge when compared to the more traditional learning activity of watching a video.',
      //   likes :200,
      //   saves : 100,
      //   img:"https://kenzie.snhu.edu/wp-content/uploads/2020/11/AdobeStock_241083104-540x420.jpg",
      //   category:"IT"
      // },    
      // {
      //   title: 'article 1',
      //   authorId: 'KfXxsRYiaYhThcJCUbX1pfvQRgE3',
      //   date:new Date(2023, 3, 15, 12, 30, 0, 0),
      //   content: 'New research has shown that while the use of immersive virtual reality (IVR) increases student enjoyment and presence in a task, when used on its own it does not improve procedural or declarative knowledge when compared to the more traditional learning activity of watching a video.',
      //   likes :200,
      //   saves : 100,
      //   img:"https://kenzie.snhu.edu/wp-content/uploads/2020/11/AdobeStock_241083104-540x420.jpg",
      //   category:"IT"
      // },    {
      //   title: 'article 1',
      //   authorId: 'KfXxsRYiaYhThcJCUbX1pfvQRgE3',
      //   date:new Date(2023, 3, 15, 12, 30, 0, 0),
      //   content: 'New research has shown that while the use of immersive virtual reality (IVR) increases student enjoyment and presence in a task, when used on its own it does not improve procedural or declarative knowledge when compared to the more traditional learning activity of watching a video.',
      //   likes :200,
      //   saves : 100,
      //   img:"https://kenzie.snhu.edu/wp-content/uploads/2020/11/AdobeStock_241083104-540x420.jpg",
      //   category:"IT"
      // },    {
      //   title: 'article 1',
      //   authorId: 'KfXxsRYiaYhThcJCUbX1pfvQRgE3',
      //   date:new Date(2023, 3, 15, 12, 30, 0, 0),
      //   content: 'New research has shown that while the use of immersive virtual reality (IVR) increases student enjoyment and presence in a task, when used on its own it does not improve procedural or declarative knowledge when compared to the more traditional learning activity of watching a video.',
      //   likes :200,
      //   saves : 100,
      //   img:"https://kenzie.snhu.edu/wp-content/uploads/2020/11/AdobeStock_241083104-540x420.jpg",
      //   category:"IT"
      // },
    ]
    this.articles =[
      {
        title: 'article 1',
        authorId: 'KfXxsRYiaYhThcJCUbX1pfvQRgE3',
        date:new Date(2023, 3, 15, 12, 30, 0, 0),
        content: 'New research has shown that while the use of immersive virtual reality (IVR) increases student enjoyment and presence in a task, when used on its own it does not improve procedural or declarative knowledge when compared to the more traditional learning activity of watching a video.',
        likes :200,
        saves : 100,
        img:"https://kenzie.snhu.edu/wp-content/uploads/2020/11/AdobeStock_241083104-540x420.jpg",
        category:"IT"
      },
      {
        title: 'article 1',
        authorId: 'KfXxsRYiaYhThcJCUbX1pfvQRgE3',
        date:new Date(2023, 3, 15, 12, 30, 0, 0),
        content: 'New research has shown that while the use of immersive virtual reality (IVR) increases student enjoyment and presence in a task, when used on its own it does not improve procedural or declarative knowledge when compared to the more traditional learning activity of watching a video.',
        likes :200,
        saves : 100,
        img:"https://kenzie.snhu.edu/wp-content/uploads/2020/11/AdobeStock_241083104-540x420.jpg",
        category:"IT"
      },    {
        title: 'article 1',
        authorId: 'KfXxsRYiaYhThcJCUbX1pfvQRgE3',
        date:new Date(2023, 3, 15, 12, 30, 0, 0),
        content: 'New research has shown that while the use of immersive virtual reality (IVR) increases student enjoyment and presence in a task, when used on its own it does not improve procedural or declarative knowledge when compared to the more traditional learning activity of watching a video.',
        likes :200,
        saves : 100,
        img:"https://kenzie.snhu.edu/wp-content/uploads/2020/11/AdobeStock_241083104-540x420.jpg",
        category:"IT"
      },    {
        title: 'article 1',
        authorId: 'KfXxsRYiaYhThcJCUbX1pfvQRgE3',
        date:new Date(2023, 3, 15, 12, 30, 0, 0),
        content: 'New research has shown that while the use of immersive virtual reality (IVR) increases student enjoyment and presence in a task, when used on its own it does not improve procedural or declarative knowledge when compared to the more traditional learning activity of watching a video.',
        likes :200,
        saves : 100,
        img:"https://kenzie.snhu.edu/wp-content/uploads/2020/11/AdobeStock_241083104-540x420.jpg",
        category:"IT"
      },    {
        title: 'article 1',
        authorId: 'KfXxsRYiaYhThcJCUbX1pfvQRgE3',
        date:new Date(2023, 3, 15, 12, 30, 0, 0),
        content: 'New research has shown that while the use of immersive virtual reality (IVR) increases student enjoyment and presence in a task, when used on its own it does not improve procedural or declarative knowledge when compared to the more traditional learning activity of watching a video.',
        likes :200,
        saves : 100,
        img:"https://kenzie.snhu.edu/wp-content/uploads/2020/11/AdobeStock_241083104-540x420.jpg",
        category:"IT"
      },
    ]
}
  //================    logout ===========================
  logout(){
    this.authService.logout();
    this.router.navigateByUrl('/',{replaceUrl:true});
  }
  //============================
 
  user = this.userService.getUserById("sqLUtIGYCKS2jUWHfqc3nUHULJ32")
  
}
