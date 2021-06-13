import { Comment } from '../../models/comment';
import { Component, OnInit } from '@angular/core';
import { CommentService } from 'src/app/service/comment.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-product-list-comment',
  templateUrl: './product-list-comment.component.html',
  styleUrls: ['./product-list-comment.component.css'],
})
export class ProductListCommentComponent implements OnInit {
 
  myForm1 = this.formBuilder.group({
    txt: '',
    star: '',
  });
  p: number = 1;
  commentDisplay: Comment[] = [];
  fakeArray = new Array(5);
  startGet: any;
  isLoading: boolean = true;
  start: number = 0;
  productId: number = 0;
  total: number = 0;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private commentService: CommentService, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => { this.productId = params['productId']; });

    this.commentService.getLastIndexInProductId(this.productId).subscribe((result) => {
      this.total = result[0]['index'] + 1;
    });

    this.commentService.getCommentByIDProduct(this.productId, (this.p - 1) * 5).subscribe((countries) => {
      countries.forEach((element) => {
        let comment = new Comment(element['nameUser'], element['idProduct'], element['star'], element['text'], element['date'], element['index']);
        this.commentDisplay.push(comment);
      });
      this.isLoading = false;
    });
  }

  pagination(pageNow: number) {
    this.p = pageNow;
    this.isLoading = true;
    this.commentDisplay = [];
    this.ngOnInit();
  }

  submitC() {
    let text: string = this.myForm1.get('txt')?.value;
    let star: number = this.myForm1.get('star')?.value;
    this.commentService.getLastIndexInProductId(this.productId).subscribe((result) => {
      if (result[0] != null) {
        this.commentService.postComment(new Comment('aasd', this.productId, star, text, new Date(), result[0]['index'] + 1));
      } else {
        this.commentService.postComment(new Comment('aasd', this.productId, star, text, new Date(), 0)
        );
      }
    });
    this.myForm1.get('txt')?.setValue("")
    this.myForm1.get('star')?.setValue(0);
    this.pagination(this.p);
  }
  setStar(numberStar: number) {
    this.startGet = numberStar;
  }
}
