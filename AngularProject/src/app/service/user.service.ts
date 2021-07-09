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
    
  }
  getCurrentUser(): User | null {
    let object: any = localStorage.getItem("currentUser");
    let object2 = JSON.parse(object as any) as User;
    if (object != null) {
      return object2;
    }
    return null;
  }
  logOutCurrentUser() {
    localStorage.removeItem("currentUser");
    this.router.navigate(['/login']);
  }
  getData(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }
  getUserByEmailAndPassword(email: string, password: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}?email=${email}&password=${password}`);
  }
  updateUser(user: User): Observable<any> {
    return this.http.put(this.url + user.id, user);
  }
  addNewUser(id:number,name: string, email: string, password: string): Observable<User[]> {
    // let id: number = this.getData1.length+1 ;
    let newUser: User = new User(id,'', name, email, password);
    console.log(newUser);
    console.log(id);
    return this.http.post<User[]>(`${this.url}`, newUser);    
  }
  updateUser2(user: User): Observable<User> {
    return this.http.patch<User>(this.url + "/" + user.id, user);
  }
}
