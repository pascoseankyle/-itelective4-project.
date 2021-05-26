import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service'; // Service
import { Router } from '@angular/router'; // Navigation
import { UserService } from '../services/user.service';// User Service
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  userInput: any = {};
  empty: any={};
  type:number = 1;
  ifTenant: boolean = false;
  constructor(private router: Router, public user: UserService, private data: DataService ) {}
  ngOnInit() {
  }
  login() {
    this.router.navigate(['login']);
  }
  register(event) {
    this.userInput.user_fullname = event.target.firstname.value +' '+ event.target.lastname.value;
    this.userInput.user_email = event.target.email.value;
    this.userInput.user_mobile = event.target.mobile.value;
    this.userInput.user_location = event.target.location.value;
    this.userInput.user_password = event.target.password.value;
    this.data.getData("register", this.userInput).subscribe(() => {})
    this.userInput = this.empty;
    this.router.navigate(['login']);
  }

  change(event){
      this.userInput.user_type = event.target.value;
  }
  ifThisIsTenant(): void{
    this.ifTenant = true;
  }
  closeIfThisTenant(){
    this.ifTenant = false;
  }

}
