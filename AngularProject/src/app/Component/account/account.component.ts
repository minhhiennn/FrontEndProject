import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  config: User[] = [];
  url = 'http://localhost:3000/users';
  dataPost: User = new User(6, "HienPro", "ahihi@gmail.com", "ahuhuhaha");
  dataPost2 = {
    "id": 6,
    "name": "HienPro",
    "email": "ahihi@gmail.com",
    "password":"ahuhuhaha"
  }

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    //this.http.get(this.url).subscribe(((data) => {
    //  let x: number = Object.values(data).length;
    //  console.log(x);
    //  for (let i = 0; i < Object.values(data).length; i++) {
    //    let x1: any = Object.values(data)[i];
    //    let user: User = new User(x1.id, x1.name, x1.email, x1.password);
    //    this.config.push(user);
    //  }
    //}));
    this.http.post(this.url, this.dataPost).subscribe(data => console.log(data));
    //this.http.patch(this.url + "/" + 1, JSON.stringify({ isRead: true })).subscribe(data => console.log(data));
    //this.http.put(this.url + "/" + 1, this.postData).subscribe(data => { this.config = data; console.log(data) });
    //let country: Country | null = null;
    //for (let i = 0; i < countries.length; i++) {
    //  country = new Country(countries[i].name, countries[i].code);
    //  this.config.push(country);
    //}
  }
}
