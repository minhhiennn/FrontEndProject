import { Component, OnInit} from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { User } from '../../../models/user';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  currentUser: User | null = null;
  constructor(private userService: UserService)
  { 
    this.currentUser = this.userService.getCurrentUser();
  }

  ngOnInit(): void {
    this.currentUser = this.userService.getCurrentUser();
  }
  test() {
    this.ngOnInit();
    console.log(this.userService.getCurrentUser());
  }
}
