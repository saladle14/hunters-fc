import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShirtService {
  baseUrl='https://6245777e6b7ecf057c1e3dc3.mockapi.io/v1/salad-le/todotasks';
  // baseUrl='http://localhost:3000/register-shirt';


  constructor(private http: HttpClient) { }
  getList() {
    return this.http.get<any[]>(this.baseUrl);
  }
  addShirt(data: any) {
    return this.http.post(this.baseUrl, data);
  }
  getShirtById(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
}
