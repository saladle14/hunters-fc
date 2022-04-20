import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShirtService {
  url='https://6245777e6b7ecf057c1e3dc3.mockapi.io/v1/list-shirt/todotasks';

  constructor(private http: HttpClient) { }
  getList() {
    return this.http.get(this.url);
  }
  addShirt(data: any) {
    return this.http.post(this.url, data);
  }
  getShirtById(id: any): Observable<any> {
    return this.http.get(`${this.url}/${id}`);
  }
}
