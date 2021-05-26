import { Component } from '@angular/core';
import { DataService } from '../services/data.service'; // Service
import { Router } from '@angular/router'; // Navigation

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  post: any;
  id: any;
  modalActive: boolean = false;
  adMOdal: boolean =false;
  postArray: any = {};
  constructor(private data: DataService, private router: Router) {}
  ngOnInit() {
    this.getPosts();
  }
  goToProfile() { 
    this.router.navigate(['profile']);
  }
  goToPost() {
    this.router.navigate(['post']);
  }
  goToTenants() {
    this.router.navigate(['tenant']);
  }
  getPosts() {
    this.data.getData("all_post", null).subscribe((results: any) => {
      this.post = results.payload;
    })
  }
  openPostModal(post: any) {
    this.postArray.post_id = post.post_id;
    this.postArray.post_title = post.post_title;
    this.postArray.post_location = post.post_location;
    this.postArray.post_price_month = post.post_price_month;
    this.postArray.post_description = post.post_description;
    this.postArray.user_mobile = post.user_mobile;
    this.modalActive = true;
  }
  closePostModal() {
    this.modalActive = false;
  }
  openAdModal(){
    this.adMOdal =true;
  }
  closeAdModal(){
    this.adMOdal =false;
  }
}
