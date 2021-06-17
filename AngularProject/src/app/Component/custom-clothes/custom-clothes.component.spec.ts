import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomClothesComponent } from './custom-clothes.component';

describe('CustomClothesComponent', () => {
  let component: CustomClothesComponent;
  let fixture: ComponentFixture<CustomClothesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomClothesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomClothesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
