import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service'; // Service
import { Router } from '@angular/router'; // Navigation
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  varSample:string="Sample String!";
  users: any;
  posts: any;
  post: any;

  constructor(private data: DataService, private router: Router) {}

  ngOnInit() {}

  login(){
    this.router.navigate(['home']);
  }


}
