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
  myForm2: FormGroup = new FormGroup({});
  user: User | null = null;
  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(9)]]
    });
    this.myForm2 = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(9)]]
    })
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
  signUp() {
    let name: string = this.myForm2.get('name')?.value;
    let email: string = this.myForm2.get('email')?.value;
    let password: string = this.myForm2.get('password')?.value;
    if (this.myForm2.get('name')?.valid && this.myForm2.get('email')?.valid && this.myForm2.get('password')?.valid) {
      this.userService.addNewUser(name, email, password);
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(['/login']));
    } else {
      alert('Đăng ký thất bại');
    }
  }
}
