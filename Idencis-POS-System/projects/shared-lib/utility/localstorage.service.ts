import { Injectable } from '@angular/core';
import { GlobalConfiguration } from './global';

@Injectable({
  providedIn: 'root'
})
export class LocalStorage {

  constructor() { }

  setLocalStorage(key:string, value:any){
    localStorage.setItem(key, value);
  }

  getLocalStorage(key:string):any{
    return localStorage.getItem(key);
  }

  removeLocalStorage(key:string){
    localStorage.removeItem(key);
  }
}
