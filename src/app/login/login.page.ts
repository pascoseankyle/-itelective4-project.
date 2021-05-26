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
  userInput: any = {};
  userResult: any;
  date: any;
  constructor(private router: Router, public user: UserService, private data: DataService) {}
  ngOnInit() {}
  login(e) {
    e.preventDefault();
    this.userInput.user_email =  e.target.uname.value;
    this.userInput.user_password = e.target.password.value;
    this.data.getData("login", this.userInput).subscribe((results: any) => {
      this.userResult = results.payload;
      this.date = new Date(Date.now() + 86400e3);
      this.date = this.date.toUTCString();
      document.cookie = "id="+this.userResult.id+";expires="+this.date+";path=/";
      document.cookie = "name="+this.userResult.name+";expires="+this.date+";path=/";
      document.cookie = "location="+this.userResult.location+";expires="+this.date+";path=/";
      if(this.userResult.access === "success"){
        this.user.setLogin();
        this.router.navigate(['home']);
      }
    })
  }
  signup() {
    this.router.navigate(['signup']);
  }
}
