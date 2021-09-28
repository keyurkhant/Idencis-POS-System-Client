import { Injectable } from '@angular/core';
import { GlobalConfiguration } from './global';
import { LocalStorage } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private localStorage: LocalStorage) { }

  getCurrentUser(): any{
    const currentUser = JSON.parse(this.localStorage.getLocalStorage(`${GlobalConfiguration.localStorage.currentUser}`));
    currentUser['phone'] = parseInt(currentUser['phone']);
    return currentUser;
  }
}
