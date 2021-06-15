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
    localStorage.setItem("currentUser", JSON.stringify(user));
    this.router.navigate(['']);
  }
  getCurrentUser(): User | null{
    let currentUser: User | null = null;
    let object: any = localStorage.getItem("currentUser");
    let object2 = JSON.parse(object as any);
    if (object != null) {
      currentUser = new User(object2.id, object2.img, object2.name, object2.email, object2.password);
    }
    return currentUser;
  }
  logOutCurrentUser() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
  getData(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }
  getUserByEmailAndPassword(email: string, password: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}?email=${email}&password=${password}`);
  }
}
