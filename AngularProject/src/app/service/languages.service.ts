import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
@Injectable({
  providedIn: 'root'
})
export class LanguagesService {
  languages: string = "en";
  constructor(private translateService: TranslateService) {
    this.translateService.addLangs(['en', 'vi']);
  }
  translateSite(langauge: string) {
    this.translateService.use(langauge);
  }
  changeLanguagesToVi() {
    this.languages = "vi";
    this.translateService.setDefaultLang('vi');
  }
  changeLanguagesToEn() {
    this.languages = "en";
    this.translateService.setDefaultLang('en');
  }
}
