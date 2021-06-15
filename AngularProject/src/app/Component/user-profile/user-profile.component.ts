import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/service/user.service';
import { DomSanitizer } from '@angular/platform-browser';

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
  currentUser: User;
  base64textString: string = "";
  isLoading = true;
  constructor(private us: UserService, private sanitizer: DomSanitizer) {
    this.currentUser = us.getCurrentUser();
  }

  ngOnInit(): void {
    this.us.getData().subscribe(data => {
      data.forEach(element => {
        if (element.id == this.currentUser.id) {
          if (element.img == "") {
            this.localUrl = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973461_960_720.png";
          } else {
            this.localUrl = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + element.img);
          }
        }
      });
      this.isLoading = false
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
    this.currentUser.img = this.base64textString;
    this.us.updateUser(this.currentUser).subscribe(() => {
      this.isLoading = true;
      this.ngOnInit();
    });

  }

  save() {
    this.us.updateUser(this.currentUser).subscribe(() => { });

  }
}
