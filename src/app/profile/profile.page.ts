import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service'; // Service
import { Router } from '@angular/router'; // Navigation
import { UserService } from '../services/user.service';// User Service

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  posts: any;
  post: any;
  ngOnInit() {
    this.getPosts(); // Call Function
  }
  constructor(private data: DataService, private router: Router,public user: UserService) {}
  goBack(){
    this.router.navigate(['home']);
  }
  goToLogin(){
    this.user.setLogOut();
    this.router.navigate(['login']);
  }

  getPosts(){
    this.data.getData('post').subscribe((res)=>{
      this.posts = res;
      this.post = this.posts.payload;
    });
  }
}
