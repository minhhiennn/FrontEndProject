import { Comment } from '../../models/comment';
import { Component, OnInit } from '@angular/core';
import { CommentService } from 'src/app/service/comment.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/service/user.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-product-list-comment',
  templateUrl: './product-list-comment.component.html',
  styleUrls: ['./product-list-comment.component.css'],
})
export class ProductListCommentComponent implements OnInit {
  p: number = 1;

  commentsFake: any[] = [];
  comments: Comment[] = [];
  commentDisplay: Comment[] = [];
  fakeArray = new Array(5);
  myForm1 = this.formBuilder.group({
    txt: '',
    star: '',
  });
  startGet: any;
  currentUser: any;
  isLoading: boolean = true;
  start: number = 0;
  productId: number = 0;
  total: number = 0;
  commentSingle: Comment | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private commentService: CommentService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.productId = params['productId'];
    });
      const productIdFromRoute = this.productId;
      this.commentService
      .getLastIndexInProductId(productIdFromRoute)
      .subscribe((result) => {this.total = result[0]['index'] +1});
     console.log(this.p);
    this.commentService
      .getCommentByIDProduct(productIdFromRoute, (this.p - 1) * 5)
      .subscribe((countries) => {
        console.log(countries.length)
        this.commentsFake = countries;
        if (countries == null) {
          this.isLoading = false;
        }
        this.commentsFake.forEach((element) => {
          let comment = new Comment(
            element.nameUser,
            element.idProduct,
            element.star,
            element.text,
            element.date,
            element.index
          );
          this.commentDisplay.push(comment);
        });
        this.isLoading = false;
       
      });
  }
  pagination(pageNow: number) {
    this.p = pageNow;
<<<<<<< HEAD
    this.comments = [];
=======
    this.isLoading = true;
>>>>>>> 0e942fdefaa5fd91efb744157757bba6a01fbb5e
    this.commentDisplay = [];
    this.ngOnInit();
  }
  submitC() {
    let text: string = this.myForm1.get('txt')?.value;
    let star: number = this.myForm1.get('star')?.value;
<<<<<<< HEAD
    const productIdFromRoute = this.productId;
    this.commentService
      .getLastIndexInProductId(productIdFromRoute)
      .subscribe((result) => {
        if (result[0] != null) {
          let index = result[0]['index'];
          this.commentService.postComment(
            new Comment(
              'aasd',
              productIdFromRoute,
              star,
              text,
              new Date(),
              result[0]['index'] + 1
            )
          );
        } else {
          this.commentService.postComment(
            new Comment('aasd', productIdFromRoute, star, text, new Date(), 0)
          );
        }
      });
    let navigationExtras: NavigationExtras = {
      queryParams: { productId: productIdFromRoute },
    };
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/products'], navigationExtras);
=======
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
>>>>>>> 0e942fdefaa5fd91efb744157757bba6a01fbb5e
  }
  setStar(numberStar: number) {
    this.startGet = numberStar;
  }
}
