import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Player } from 'src/app/models/player';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = 'https://6245777e6b7ecf057c1e3dc3.mockapi.io/v1/salad-le/user';

  constructor(private http: HttpClient) { }
  getAllUsers() {
    return this.http.get<Player[]>(this.baseUrl);
  }

  getUserById(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
}
