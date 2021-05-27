import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogSingComponent } from './blog-sing.component';

describe('BlogSingComponent', () => {
  let component: BlogSingComponent;
  let fixture: ComponentFixture<BlogSingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogSingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogSingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
