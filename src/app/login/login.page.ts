import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service'; // Service
import { Router } from '@angular/router'; // Navigation
import { UserService } from '../services/user.service';// User Service
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string = "asa";
  password: string = "asa";
  users: any;

  constructor(private router: Router, public user: UserService) {}

  ngOnInit() {}

  login(e){
    e.preventDefault();
    let un: string = e.target.uname.value;
    let pw: string = e.target.password.value;
    if(un == this.username && pw == this.password){
      this.user.setLogin();
      this.router.navigate(['home']);
    }
  }


}
