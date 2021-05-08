import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { User } from '../../models/user';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  myForm: FormGroup = new FormGroup({});
  user: User | null = null;
  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(9)]]
    });
  }
  submit() {
    let email: string = this.myForm.get('email')?.value;
    let password: string = this.myForm.get('password')?.value;
    let user: User | null = this.userService.findUserWithEmailAndPassword(email, password);
    if (user == null) {
      alert('Đăng nhập thất bại');
    } else {
      this.userService.setCurrentUser(user);
      this.router.navigate(['']);
    }
  }
}
