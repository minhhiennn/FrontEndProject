import { Comment } from '../../models/comment';
import { Component, OnInit } from '@angular/core';
import { CommentService } from 'src/app/service/comment.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { FormBuilder } from '@angular/forms';
import { User } from 'src/app/models/user';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-product-list-comment',
  templateUrl: './product-list-comment.component.html',
  styleUrls: ['./product-list-comment.component.css'],
})
export class ProductListCommentComponent implements OnInit {
  p: number = 1;
  listSrc:any[] = [];
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
    private router: Router,
    private sanitizer: DomSanitizer
  ) { 
    /*this.currentUser = userService.getCurrentUser();*/
    
    
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.productId = params['productId'];
    });
    const productIdFromRoute = this.productId;
    this.commentService.getLastIndexInProductId(productIdFromRoute).subscribe((result) => { this.total = result[0]['index'] + 1 });
    this.commentService.getCommentByIDProduct(productIdFromRoute, (this.p - 1) * 5).subscribe((data) => {
      data.forEach((element) => {
        let comment = new Comment(element['idProduct'], element['star'], element['text'], element['date'], element['index'], element['nameUser']);
        this.commentDisplay.push(comment);
        this.userService.getData().subscribe(data => {
          data.forEach(element1 => {
            if (element1.email == element['nameUser']) {
              if (element1.img == "") {
                this.listSrc.push( "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973461_960_720.png");
              } else {
                this.listSrc.push(this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + element1.img));
              }
            }
          });
        })
        this.listSrc.push();
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
    this.currentUser = this.userService.getCurrentUser();
    if (this.currentUser != null) {
      let text: string = this.myForm1.get('txt')?.value;
      let star: number = this.myForm1.get('star')?.value;
      this.commentService.getLastIndexInProductId(this.productId).subscribe((result) => {
        let comment: Comment;
        if (result[0] != null) {

          comment = (new Comment(this.productId, star, text, new Date(), result[0]['index'] + 1, this.currentUser?.email));
        } else {
          comment = (new Comment(this.productId, star, text, new Date(), 0, this.currentUser?.email));
        }

        this.commentService.postComment(comment).subscribe(data => {
          this.myForm1.get('txt')?.setValue("")
          this.myForm1.get('star')?.setValue(0);
          this.pagination(1)
        })
      });
    } else {
      alert("Bạn phải đăng nhập để bình luận");
    }
  }
  setStar(numberStar: number) {
    this.startGet = numberStar;
  }
}
