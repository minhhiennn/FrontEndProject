import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/service/user.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  localUrl: any;
  path: string = "";
  userProfileImg: any;
  storageRef: any;
  edited : boolean = true;;

  currentUser: any  ;
  check: boolean = true;
  public myForm3 = new FormGroup({
    name: new FormControl(''),
    email:new FormControl(''),
    password:new FormControl(''),
  });
  base64textString: string = "";
  isLoading = true;
  constructor(private us: UserService, private sanitizer: DomSanitizer, private router: Router,private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.currentUser = this.us.getCurrentUser();
    this.us.getData().subscribe(data => {
      data.forEach(element => {
        if (element.id == this.currentUser.id) {
          if (element.img == "") {
            this.localUrl = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973461_960_720.png";
          }
          else {
            this.localUrl = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + element.img);          
          }
        }
      });
      this.isLoading = false
    })
    this.myForm3 = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(9)]]
    })
    this.myForm3.setValue({
      name: this.currentUser.name,
      email: this.currentUser.email,
      password: this.currentUser.password
    })
  }
  showPreviewImage(event: any) {
    var files = event.target.files;
    var file = files[0];
    if (files && file) {
      var reader = new FileReader();
      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
}

  handleReaderLoaded(readerEvt: any) {
    var binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
    if(this.sizebase64kb(this.base64textString)<1000){
    this.currentUser.img = this.base64textString;
    this.us.updateUser(this.currentUser).subscribe(() => {
      this.isLoading = true;
      this.ngOnInit();
    });
  }else{
    console.log("update2","quá 1mb");
    this.check=false;
  }
  }
  sizebase64kb(stringcaval:String):number {
    const stringLength = stringcaval.length 
    const sizeInBytes = 4 * Math.ceil(stringLength / 3) * 0.5624896334383812;
    const sizeInKb = sizeInBytes / 1000;
    return sizeInKb;
  }
  save() {
    if (this.myForm3.get('name')?.valid && this.myForm3.get('email')?.valid && this.myForm3.get('password')?.valid) {
      let name: string = this.myForm3.get('name')?.value;
      let email: string = this.myForm3.get('email')?.value;
      let password: string = this.myForm3.get('password')?.value;
      let user: User = new User(this.currentUser.id, this.currentUser.img, name, email, password);
      this.isLoading = true;
      this.us.updateUser2(user).subscribe((data: User) => {
        this.myForm3.setValue({
          name: data.name,
          email: data.email,
          password: data.password
        })
        this.us.setCurrentUser(user);
        this.isLoading = false;
        this.edited = false;
        setTimeout( () => {
          this.edited = true;
        }, 3000);
      });

    } else {
      alert('dữ liệu ko hợp lệ');
    }
  }
}
