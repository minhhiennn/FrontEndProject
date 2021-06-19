import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/models/cart-item';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/service/cart.service';
import { UserService } from 'src/app/service/user.service';
import { User } from '../../models/user';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  options = {
    minimum: 0.08,
    maximum: 1,
    ease: 'linear',
    speed: 200,
    trickleSpeed: 300,
    meteor: true,
    spinner: true,
    spinnerPosition: 'right',
    direction: 'leftToRightIncreased',
    color: 'red',
    thick: true
  };
  preventAbuse = false;
  myForm: FormGroup = new FormGroup({});
  myForm2: FormGroup = new FormGroup({});
  user: User | null = null;
  items: CartItem[] = [];
  isLoading : boolean = false;
  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router, private cartService: CartService) { }

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
    this.preventAbuse = true;
    let email: string = this.myForm.get('email')?.value;
    let password: string = this.myForm.get('password')?.value;
    let user: User | null = null;
    this.userService.getUserByEmailAndPassword(email, password).subscribe((data: User[]) => {
      user = data[0];
      if (user == null) {
        alert('Đăng nhập thất bại');
      } else {
        this.userService.setCurrentUser(user);
        if (confirm("Bạn có muốn đồng bộ giỏ hàng không ? ")) {
          let cartItems = JSON.parse(localStorage.getItem('CookieCart') as any)
          this.preventAbuse = this.cartService.cartSync(cartItems, 0);
          //this.isLoading = this.cartService.cartSync(cartItems, 0)
        } else {
          localStorage.removeItem("CookieCart");
          this.router.navigate(['']);
        }
        
      }
    })
  }
  signUp() {
    let name: string = this.myForm2.get('name')?.value;
    let email: string = this.myForm2.get('email')?.value;
    let password: string = this.myForm2.get('password')?.value;
    if (this.myForm2.get('name')?.valid && this.myForm2.get('email')?.valid && this.myForm2.get('password')?.valid) {
       let id: number =this.userService.getData.length;
     this.userService.addNewUser(id,name,email, password).subscribe((data)=>{
       console.log("addNewUsr",data);
     });
     this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
     this.router.navigate(['/login']));
     alert('đăng kí thành công');
    } else {
     alert('Đăng ký thất bại');
    }
  }
}
