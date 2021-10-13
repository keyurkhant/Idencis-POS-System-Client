import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/User';
import { GlobalConfiguration } from '../utility/global';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  updateUserProfileDetails(userData:User, token:any): Observable<any>{
    userData['phone'] = String(userData['phone']);
    let bearer = `Bearer ${token}`;
    let header = new HttpHeaders().set("Authorization", bearer);
    return this.http.post<any>(`${GlobalConfiguration.GlobalAPI}/update-profile`, userData, { 'headers': header });
  }

  getAllUserData(token:any): Observable<any>{
    let bearer = `Bearer ${token}`;
    let header = new HttpHeaders().set("Authorization", bearer);
    return this.http.get<any>(`${GlobalConfiguration.GlobalAPI}/get-all-user-data`, { 'headers': header });
  }

  addNewUser(userData:any, token:any): Observable<any>{
    userData['phone'] = String(userData['phone']);
    let bearer = `Bearer ${token}`;
    let header = new HttpHeaders().set("Authorization", bearer);    
    return this.http.post<any>(`${GlobalConfiguration.GlobalAPI}/add-user`, userData, { 'headers': header });
  }

  getUserDataByUsername(username:any, token: any): Observable<any> {
    let bearer = `Bearer ${token}`;
    let header = new HttpHeaders().set("Authorization", bearer);            
    return this.http.get<any>(`${GlobalConfiguration.GlobalAPI}/get-user-by-username/` + username, {'headers': header});
  }

  updateUserDetails(userData:any, token:any): Observable<any>{
    userData['phone'] = String(userData['phone']);
    let bearer = `Bearer ${token}`;
    let header = new HttpHeaders().set("Authorization", bearer);
    return this.http.put<any>(`${GlobalConfiguration.GlobalAPI}/user-details`, userData, { 'headers': header });
  }

}
