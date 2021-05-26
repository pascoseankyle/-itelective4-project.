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
  post: any;
  userArray: any ={};
  postArray: any ={}; 
  userInfo: any={};
  id: any = "id"; 
  name: any = "name";
  location: any = "location";
  modalActive: boolean = false;
  modalEdit: boolean = false;
  userGet: any;
  userEdit: any = {};
  ngOnInit() {
    this.getPosts(); // Call Function
    this.showUser();
    this.getUser();
  }
  constructor(private data: DataService, private router: Router,public user: UserService) {}
  showUser(): void{
    this.userInfo.name = this.getCookie(this.name);
    this.userInfo.location = this.getCookie(this.location);
    this.userInfo.id = this.getCookie(this.id);
  }
  goBack(): void{
    this.router.navigate(['home']);
  }
  goToLogin(){
    this.user.setLogOut();
    this.router.navigate(['login']);
  }
  // ------- Modal ------------
  // Post Modal
  openPostModal(post: any): void{
    this.modalActive = true;
    this.postArray.post_id = post.post_id;
    this.postArray.post_title = post.post_title;
    this.postArray.post_location = post.post_location;
    this.postArray.post_price_month = post.post_price_month;
    this.postArray.post_description = post.post_description;
  }
  closePostModal(): void{
    this.modalActive = false;
  }
  openEdit(getUser: any): void{
    this.userEdit.user_fullname = getUser.user_fullname;
    this.userEdit.user_location = getUser.user_location;
    this.userEdit.user_id = this.getCookie(this.id);
    this.modalEdit = true;
  }
  closeEdit(): void{
    this.modalEdit = false;
  }
  // Update Post
  updatePost(): void{
    this.data.getData("update_post", this.postArray).subscribe(() => {
      this.getPosts();
    })
    this.closePostModal();
  }
  // Delete Post
  deletePost(): void{
    this.data.getData("delete_post", this.postArray).subscribe(() => {
      this.getPosts();
    })
    this.closePostModal();
  }
  // Get All User Post
  getPosts(): void{
    this.userArray.user_id = this.getCookie(this.id); 
    this.data.getData("all_user_post", this.userArray).subscribe((results: any) => {
      this.post = results.data;
    })
  }
  getCookie(cname){
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
  updateUser(): void{
    this.data.getData("update_user", this.userEdit).subscribe(() => {
      this.getUser();
    })
    this.closeEdit();
  }
  getUser(): void{
    this.data.getData("all_user", this.userInfo).subscribe((results: any) => {
      this.userGet = results.data;
    })
  }
}
