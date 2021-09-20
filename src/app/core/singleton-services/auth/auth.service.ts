import { Injectable } from '@angular/core';
import { FakeUser } from './FakeUser';
import { Router } from '@angular/router';

import { BackendService } from '../backend/backend.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(
    private backendService: BackendService,
    public router: Router
  ) {
  }

  login(currentUser: FakeUser) {
    localStorage.setItem('access_token', currentUser.bearerToken);
    localStorage.setItem('current_user', JSON.stringify(currentUser));
    this.router.navigate(['']);
  }

  getFakeUsers() {
    return this.backendService.getFakeUsers();
  }

  get token() {
    return localStorage.getItem('access_token');
  }

  get currentUser() : FakeUser {
    let currentUser = localStorage.getItem('current_user');
    return currentUser && JSON.parse(currentUser);
  }

  get isLoggedIn(): boolean {
    return (this.token !== null) ? true : false;
  }

  logout() {
    let removeToken = localStorage.removeItem('access_token');
    localStorage.removeItem('current_user');
    if (removeToken == null) {
      this.router.navigate(['login']);
    }
  }
}
