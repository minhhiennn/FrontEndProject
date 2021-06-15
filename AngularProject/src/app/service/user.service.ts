import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = 'https://first-fucking-app-angular.herokuapp.com/users/';
  constructor(private http: HttpClient, private router: Router) { }

  setCurrentUser(user: User) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    this.router.navigate(['']);
  }
  getCurrentUser(): User {
    
    let object: any = localStorage.getItem("currentUser");
    let object2 = JSON.parse(object as any);
    return new User(object2.id, object2.img, object2.name, object2.email, object2.password);
   
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
  updateUser(user : User ){
    return this.http.put(this.url + user.id, user);
  }
  
}
