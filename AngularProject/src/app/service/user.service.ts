import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private Users: User[] = [];
  url = 'https://first-fucking-app-angular.herokuapp.com/users';
  private currentUser: User | null = null;
  constructor(private http: HttpClient) {
    if (this.Users.length == 0) {
      this.http.get(this.url).subscribe(((data) => {
        let x: number = Object.values(data).length;
        console.log(x);
        for (let i = 0; i < Object.values(data).length; i++) {
          let x1: any = Object.values(data)[i];
          let user: User = new User(x1.id, x1.name, x1.email, x1.password);
          this.Users.push(user);
        }
      }));
    }
  }
  getAllUser(): User[] {
    return this.Users;
  }
  findUserWithEmailAndPassword(email: string, password: string): User | null {
    for (let i = 0; i < this.Users.length; i++) {
      if (this.Users[i].email === email && this.Users[i].password === password) {
        return this.Users[i];
      }
    }
    return null;
  }
  getCurrentUser() {
    return this.currentUser;
  }
  setCurrentUser(user: User | null) {
    this.currentUser = user;
  }
  addNewUser(name: string, email: string, password: string) {
    let id: number = this.Users.length + 1;
    let newUser: User = new User(id, name, email, password);
    this.http.post(this.url, newUser).subscribe();
    this.Users.push(newUser);
  }
}
