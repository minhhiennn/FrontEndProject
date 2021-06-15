import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = 'https://first-fucking-app-angular.herokuapp.com/users';
  urlCurrentUser = 'https://first-fucking-app-angular.herokuapp.com/currentUser';
  constructor(private http: HttpClient, private router: Router) { }

  setCurrentUser(user: User) {
    this.http.post(this.urlCurrentUser, user).subscribe(() => {
      this.router.navigate(['']);
    })
  }
  getCurrentUser(): Observable<User> {
    return this.http.get<User>(this.urlCurrentUser);
  }
  logOutCurrentUser() {
    this.http.post(this.urlCurrentUser, {}).subscribe(() => {
      this.router.navigate(['']);
    });
  }
  getData(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }
  getUserByEmailAndPassword(email: string, password: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}?email=${email}&password=${password}`);
  }
}
