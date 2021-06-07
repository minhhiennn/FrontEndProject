import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { User } from '../../../models/user';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  currentUser: User | null = null;
  constructor(private userService: UserService, private router: Router) {
    this.currentUser = this.userService.getCurrentUser();
  }

  ngOnInit(): void {
    this.currentUser = this.userService.getCurrentUser();
  }
  logOut() {
    this.userService.setCurrentUser(null);
  }
  Search(stringSearch: string) {
    if (stringSearch != '') {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(['/shop/', stringSearch]));
    }
  }
}
