import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Http
@Injectable({
  providedIn: 'root'
})
export class DataService {
  // baseURL = 'https://jsonplaceholder.typicode.com/';
  baseURL = ' http://localhost:8080/tenant-hunt/api/';

  constructor(private http: HttpClient) { console.log('its working!') }

  public getData(endpoint) {
    return this.http.get(this.baseURL + endpoint);
  }
}
