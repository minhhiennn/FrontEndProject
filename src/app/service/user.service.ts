import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private Users: User[] = [
    new User(1, 'Hien', 'minhhien2000k@gmail.com', '123456789hien'),
    new User(2, 'Phung', 'Phung@gmail.com', '123456789hien'),
    new User(3, 'Van Anh', 'VanAnh@gmail.com', '123456789hien'),
    new User(4, 'Hoang Hiep', 'HoangHiep@gmail.com', '123456789hien'),
    new User(5, 'An', 'An@gmail.com', '123456789hien'),
  ];
  private currentUser: User | null = null;
  constructor() { }
  getAllUser(): User[] {
    return this.Users;
  }
  findUserWithEmailAndPassword(email: string, password: string): User | null {
    for (let i = 0; i < this.Users.length; i++) {
      if (this.Users[i].getEmail() === email && this.Users[i].getPassword() === password) {
        return this.Users[i];
      }
    }
    return null;
  }
  getCurrentUser() {
    return this.currentUser;
  }
  setCurrentUser(user: User) {
    this.currentUser = user;
  }
}
