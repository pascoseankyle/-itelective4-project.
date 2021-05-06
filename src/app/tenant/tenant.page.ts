import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service'; // Service
import { Router } from '@angular/router'; // Navigation

@Component({
  selector: 'app-tenant',
  templateUrl: './tenant.page.html',
  styleUrls: ['./tenant.page.scss'],
})
export class TenantPage implements OnInit {
  posts: any;
  post: any;

  constructor(private data: DataService, private router: Router) {}
 
  ngOnInit() {
    this.getPostsTenant(); // Call Function
  }

  goToHome(){
    this.router.navigate(['home']);
  }

  
  getPostsTenant(){
    this.data.getData('tenant').subscribe((res)=>{
      this.posts = res;
      this.post = this.posts.payload;
    });
  }

}
