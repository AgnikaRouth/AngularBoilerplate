import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { User } from 'src/app/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);

  private _users = signal<User[]>([]);
  readonly users = this._users.asReadonly();

  constructor() {
    this.fetchUsers();
  }

  private fetchUsers() {
    this.http
      .get<{ users: User[] }>('https://dummyjson.com/users')
      .subscribe((res) => {
        console.log(res);
        this._users.set(res.users);
      });
  }
}
