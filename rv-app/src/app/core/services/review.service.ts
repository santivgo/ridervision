import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IReview } from '../interfaces/models/review.interface';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrl = 'http://localhost:8000/reviews/'; 

  constructor(private http: HttpClient) { }

  submitReview(review: IReview): Observable<any>{
    return this.http.post(`${this.apiUrl}/`, review)
  }

  getAllReviews(): Observable<IReview> | void{}


}
