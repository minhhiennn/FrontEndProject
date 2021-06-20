import { TestBed } from '@angular/core/testing';

import { LanguagesService } from './languages.service';

describe('LangugesService', () => {
  let service: LanguagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LanguagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
