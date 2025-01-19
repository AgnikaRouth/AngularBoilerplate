import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  isLoggedIn(): boolean {
    const token = localStorage.getItem('authToken');
    console.log('function isLoggedIn');
    return !!token;
  }

  constructor() {}
}
