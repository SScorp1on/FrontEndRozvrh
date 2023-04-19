import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {User} from "../user.model";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  private readonly TOKEN_NAME = 'profanis_auth';
  user: User | null;

  get token(): any {
    return localStorage.getItem(this.TOKEN_NAME);
  }

  constructor() {
    this._isLoggedIn$.next(!!this.token);
    this.user = this.getUser(this.token);
  }

  private getUser(token: string): User | null {
    if (!token) {
      return null
    }
    return JSON.parse(atob(token.split('.')[1])) as User;
  }
}
