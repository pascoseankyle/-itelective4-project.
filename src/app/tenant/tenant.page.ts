import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service'; // Service
import { Router } from '@angular/router'; // Navigation
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-tenant',
  templateUrl: './tenant.page.html',
  styleUrls: ['./tenant.page.scss'],
})
export class TenantPage implements OnInit {
  post: any;
  tenantPost: any ={};
  viewPostData: any={};
  addTenantModal: boolean=false;
  viewPost: boolean=false;
  id: any="id";
  constructor(private data: DataService, private router: Router) {}
  ngOnInit() {
    this.getPostsTenant(); // Call Function
  }
  goToHome(){
    this.router.navigate(['home']);
  }  
  getPostsTenant(){
    this.data.getData("tenant", null).subscribe((results: any) => {
      this.post = results.data;
    })
  }
  openTenantModal(): void {
    this.addTenantModal = true;
  }
  closeTenantModal(): void {
    this.addTenantModal = false;
  }
  addTenant(): void{
    this.tenantPost.id = this.getCookie(this.id);
    console.log(this.tenantPost)
    this.data.getData("add_tenant", this.tenantPost).subscribe(() => {
      this.getPostsTenant();
    })
    this.closeView();
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
  closeView(): void{
    this.viewPost=false;
  }
  openView(post:any): void{
    this.viewPostData.title = post.post_tenant_title;
    this.viewPostData.budget = post.post_tenant_budget;
    this.viewPostData.location = post.post_tenant_location;
    this.viewPostData.mobile = post.user_mobile;
    this.viewPost=true;
  }
}

