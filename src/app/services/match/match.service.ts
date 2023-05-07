import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MatchService {
  baseUrl =
    'https://6245777e6b7ecf057c1e3dc3.mockapi.io/v1/salad-le/listmatchs';
  // baseUrl = 'http://localhost:3000/listTestMatches';
  storageUrl = 'http://localhost:3000/listMatches';

  constructor(private http: HttpClient) {}

  getAllMatches() {
    return this.http.get(this.baseUrl);
  }

  getMatchById(id: any) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createNewMatch(data: any) {
    return this.http.post(this.baseUrl, data);
  }

  deleteMatch(id:any) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  updateMatch(id: any, data: any) {
    // const testData = {
    //   hour: '05:00',
    //   session: 'Sáng',
    //   weekdays: 'Chủ Nhật',
    //   day: '15/10/2022',
    //   stadium: 'SVĐ Suối',
    //   memberObj: ['001', '002', '003', '004', '005'],
    // };
    // console.log(testData);
    // debugger;
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  addMatchToStorage(data: any) {
    return this.http.post(this.storageUrl, data);
  }
}
