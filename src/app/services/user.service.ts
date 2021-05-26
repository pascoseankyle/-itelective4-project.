import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  loggedIn: boolean = false;
  constructor() { }
  isLoggedIn(): boolean {
    this.loggedIn = window.sessionStorage.getItem('login')=='true'?true:false;
    return this.loggedIn;
  }
  setLogin(){
    window.sessionStorage.setItem('login','true');
    this.loggedIn = true;
  }
  setLogOut(){
    window.sessionStorage.clear();
    this.loggedIn = false;
  }
}
