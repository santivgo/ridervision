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

  submitReview(re: IReview): Observable<any>{
    const { show, user, fav_riders, review } = re;
    const { id: showId } = show;
    const { id: userId } = user;
    const ridersId = fav_riders.map((value)=> value.id)
    console.log(user)
    return this.http.post(`${this.apiUrl}`, {'review': review, 'user': userId, 'show': showId, 'fav_riders': ridersId })
  }

  getAllReviews(): Observable<IReview> | void{}


}
