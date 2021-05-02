import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  ngOnInit() {
  }
  constructor(private router: Router) {}
  goToLogin(){
    this.router.navigate(['login']);
  }
  goBack(){
    this.router.navigate(['home']);
  }
}
