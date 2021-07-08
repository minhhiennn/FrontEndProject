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

  currentUser: any  ;
  check: boolean = true;
  public myForm3 = new FormGroup({
    name:new FormControl(''),
    email:new FormControl(''),
    password:new FormControl(''),

  });
  base64textString: string = "";
  isLoading = true;
  constructor(private us: UserService, private sanitizer: DomSanitizer, private router: Router,private formBuilder: FormBuilder) {
    this.currentUser = us.getCurrentUser();
  }

  ngOnInit(): void {
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
    this.us.getData().subscribe(data => {
      data.forEach(element => {
      element.name = this.myForm3.controls.name.value;
        element.email = this.myForm3.controls.email.value;
      element.password = this.myForm3.controls.password.value;
        if (element.id == this.currentUser.id) {
          if (element.name!='' && element.email==''&& element.password=='') {
            element.name = this.myForm3.controls.name.value;
            element.email=this.currentUser.email;
            element.password=this.currentUser.password;
            this.us.updateUser(element).subscribe((data) => {
              console.log("update", data);
              this.isLoading = true;
              this.us.setCurrentUser(data);
              this.currentUser=data;
                
             
        
              });
           
          }
          else  if (element.name=='' && element.email!=''&& element.password=='') {
            element.email = this.myForm3.controls.email.value;
            element.name=this.currentUser.name;
            element.password=this.currentUser.password;
            this.us.updateUser(element).subscribe((data) => {
              console.log("update", data);
              this.isLoading = true;
              this.us.setCurrentUser(data);
              this.currentUser=data;
             
        
              });
           
          }  else  if (element.name=='' && element.email==''&& element.password!='') {
            element.password = this.myForm3.controls.password.value;
            element.name=this.currentUser.name;
            element.email=this.currentUser.email;
            this.us.updateUser(element).subscribe((data) => {
              console.log("update", data);
              this.isLoading = true;
              this.us.setCurrentUser(data);
              this.currentUser=data;
             
        
              });
           
          }else  if (element.name!='' && element.email!=''&& element.password=='') {
            element.name = this.myForm3.controls.name.value;
            element.email= this.myForm3.controls.email.value;
            element.password=this.currentUser.password;
            this.us.updateUser(element).subscribe((data) => {
              console.log("update", data);
              this.isLoading = true;
              this.us.setCurrentUser(data);
              this.currentUser=data;
             
        
              });
           
           
          }else  if (element.name=='' && element.email!=''&& element.password!='') {
            element.email = this.myForm3.controls.email.value;
            element.password= this.myForm3.controls.password.value;
            element.name=this.currentUser.name;
            this.us.updateUser(element).subscribe((data) => {
              console.log("update", data);
              this.isLoading = true;
              this.us.setCurrentUser(data);
              this.currentUser=data;
        
              });
           
          }else  if (element.name!='' && element.email==''&& element.password!='') {
            element.name = this.myForm3.controls.name.value;
            element.password= this.myForm3.controls.password.value;
            element.email=this.currentUser.email;
            this.us.updateUser(element).subscribe((data) => {
              console.log("update", data);
              this.isLoading = true;
              this.us.setCurrentUser(data);
              this.currentUser=data;
        
              });
           
          }else  if (element.name!='' && element.email!=''&& element.password!='') {
            element.name = this.myForm3.controls.name.value;
            element.password= this.myForm3.controls.password.value;
            element.email= this.myForm3.controls.email.value;
            this.us.updateUser(element).subscribe((data) => {
              console.log("update", data);
              this.isLoading = true;
              this.us.setCurrentUser(data);
              this.currentUser=data;
        
              });
           
          }
          else{

            console.log("thong bao","ban muốn thay đổi j v")
          }
        }
      });
    
    })
   
    
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
    this.router.navigate(['/user']));
  }

}
