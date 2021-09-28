import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/User';
import { GlobalConfiguration } from '../utility/global';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  updateUserDetails(userData:User, token:any): Observable<any>{
    userData['phone'] = String(userData['phone']);
    let bearer = `Bearer ${token}`;
    let header = new HttpHeaders().set("Authorization", bearer);
    return this.http.post<any>(`${GlobalConfiguration.GlobalAPI}/update-profile`, userData, { 'headers': header });
  }
}
