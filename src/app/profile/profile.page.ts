import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service'; // Service
import { Router } from '@angular/router'; // Navigation

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
  constructor(private data: DataService, private router: Router) {}
  goToLogin(){
    this.router.navigate(['login']);
  }
  goBack(){
    this.router.navigate(['home']);
  }

  getPosts(){
    this.data.getData('post').subscribe((res)=>{
      console.log(res);
      this.posts = res;
      this.post = this.posts.payload;
      console.log(this.post);
    });
  }
}
