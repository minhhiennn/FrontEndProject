import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { User } from '../../../models/user';
import { Router } from '@angular/router';
import { LanguagesService } from 'src/app/service/languages.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  languagueEng: boolean = true;
  currentUser: User | null = null;
  constructor(private userService: UserService, private router: Router, private translate: LanguagesService) {
    if (this.translate.languages == "en") {
      this.languagueEng = true;
    } else if (this.translate.languages == "vi") {
      this.languagueEng = false;
    }
  }
  ngOnInit(): void {
    if (this.userService.getCurrentUser() != null) {
      this.currentUser = this.userService.getCurrentUser();
    }
  }
  logOut() {
    this.userService.logOutCurrentUser();
  }
  Search(stringSearch: string) {
    if (stringSearch != '') {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        this.router.navigate(['/shop'], { queryParams: { search: stringSearch } }));
    }
  }
  changeLanguges(ele: any) {
    if (ele.value == "Vi") {
      this.translate.changeLanguagesToVi();
    } else {
      this.translate.changeLanguagesToEn();
    }
  }
}
