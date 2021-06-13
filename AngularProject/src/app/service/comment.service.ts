import { Injectable, Query } from '@angular/core';
import { Comment } from '../models/comment';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})
export class CommentService {
  
  items: Observable<Comment[]> | undefined;
  urlComment = "https://first-fucking-app-angular.herokuapp.com/comment";
  stringJson: any;
  isLoading: boolean = true;
  item : Observable<Comment> | undefined ;
  
  constructor(private http: HttpClient) {
    
  }
  getCommentByIDProduct(id : number,page:number) : Observable<Comment[]>{
   return this.http.get<Comment[]>(`${this.urlComment}?idProduct=${id}&_sort=date&_order=desc&_start=${page}&_limit=${5}`);
  }
  getLastIndexInProductId(id : number) : Observable<Comment[]>{
   return this.http.get<Comment[]>(`${this.urlComment}?idProduct=${id}&_sort=date&_order=desc&_limit=1`);
   
  }

  postComment(comment: Comment) {
    return this.http.post(this.urlComment, comment).subscribe();
  }
}