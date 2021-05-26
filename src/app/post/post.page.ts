import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {
  // add post array
  addInputPost: any = {};
  post: any;
  fakeId: any = 1;
  id: any = "id";
  empty: any = "";
  constructor(private data: DataService,private router: Router) {}
  ngOnInit() {
  }
  goBack(){
    this.router.navigate(['home']);
  }
  addPost(event) {
    this.addInputPost.post_title = event.target.post_title.value;
    this.addInputPost.post_location = event.target.post_location.value;
    this.addInputPost.post_price_month = event.target.post_price_month.value;
    this.addInputPost.post_description = event.target.post_description.value;
    this.addInputPost.user_id = this.getCookie(this.id);
    this.data.getData("add_post", this.addInputPost).subscribe(() => {
      this.getPosts();
    })
    this.goBack();
    this.addInputPost = this.empty;
   }
   getPosts() {
    this.data.getData("all_post", null).subscribe((results: any) => {
      this.post = results.payload;
    })
  }
  getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
}
