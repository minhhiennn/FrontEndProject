import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListCommentComponent } from './product-list-comment.component';

describe('ProductListCommentComponent', () => {
  let component: ProductListCommentComponent;
  let fixture: ComponentFixture<ProductListCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductListCommentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
