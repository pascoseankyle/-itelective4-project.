import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tenant',
  templateUrl: './tenant.page.html',
  styleUrls: ['./tenant.page.scss'],
})
export class TenantPage implements OnInit {

  constructor(private router: Router) {}
  ngOnInit() {
  }
  goToHome(){
    this.router.navigate(['home']);
  }
}
