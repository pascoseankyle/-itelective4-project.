import { Component } from '@angular/core';
import { DataService } from '../services/data.service'; // Service
import { Router } from '@angular/router'; // Navigation

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  posts: any;
  post: any;

  constructor(private data: DataService, private router: Router) {}

  ngOnInit() {
    this.getPosts(); // Call Function
  }

  goToProfile(){
    this.router.navigate(['profile']);
  }
  goToPost(){
    this.router.navigate(['post']);
  }
  goToTenants(){
    this.router.navigate(['tenant']);
  }

  getPosts(){
    this.data.getData('post').subscribe((res)=>{
      this.posts = res;
      this.post = this.posts.payload;
    });
  }
}
