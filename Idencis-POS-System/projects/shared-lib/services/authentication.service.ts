import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { GlobalConfiguration } from '../utility/global';
import { User } from '../interfaces/User';
import { LocalStorage } from '../utility/localstorage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient,
    private localStorage: LocalStorage,
    private router: Router) {
    this.updateUserDataLocally();
  }

  updateUserDataLocally() {
    let userData = JSON.parse(this.localStorage.getLocalStorage(`${GlobalConfiguration.localStorage.currentUser}`));
    if (userData != null) {
      this.currentUserSubject.next(userData);
    }
  }

  userLogin(userData: any): Observable<any> {
    return this.http.post<any>(`${GlobalConfiguration.GlobalAPI}/login`, userData);
  }

  getUserDataByToken(token: any): Observable<any> {
    let bearer = `Bearer ${token}`;
    let header = new HttpHeaders().set("Authorization", bearer);

    return this.http.get<any>(`${GlobalConfiguration.GlobalAPI}/getUserData`, { headers: header });
  }

  setLocalStorage(user: User) {
    let userObj: User = {
      username: user.username,
      email: user.email,
      phone: user.phone,
      first_name: user.first_name,
      last_name: user.last_name,
      gender: user.gender,
      token: user.token,
      last_login: user.last_login,
      userRole: user.userRole
    }
    this.localStorage.setLocalStorage(`${GlobalConfiguration.localStorage.currentUser}`, JSON.stringify(userObj));
  }

  getLandingPage(userRole: string) {
    let routeName: string = '';
    if (userRole === 'superadmin' || userRole == 'admin') {
      routeName = '/dashboard'
    }
    else if (userRole === 'manager') {
      routeName = '/manager'
    }
    return routeName;
  }

  userLogout() {
    this.localStorage.removeLocalStorage(`${GlobalConfiguration.localStorage.currentUser}`);
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  changePassoword(changePasswordData: any, token: any): Observable<any> {
    let bearer = `Bearer ${token}`;
    let header = new HttpHeaders().set("Authorization", bearer);
    return this.http.post<any>(`${GlobalConfiguration.GlobalAPI}/change-user-password`, changePasswordData, { 'headers': header });
  }
}
