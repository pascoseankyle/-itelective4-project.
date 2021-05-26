import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Http
@Injectable({
  providedIn: 'root'
})
export class DataService {
  // baseURL = 'https://jsonplaceholder.typicode.com/';
  URL = ' http://localhost:8080/tenant-hunt/api/';

  constructor(private http: HttpClient) {}

  public getData(endpoint: any, results: any) {
    return  <any>( 
      this.http.post(this.URL + endpoint, btoa(JSON.stringify(results)))
    );
  }
}
