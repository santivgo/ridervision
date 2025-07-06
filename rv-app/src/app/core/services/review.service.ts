import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IReview } from '../interfaces/models/review.interface';
import { IUser } from '../interfaces/models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrl = 'http://localhost:8000/reviews/'; 

  constructor(private http: HttpClient) { }

  submitReview(re: IReview): Observable<any>{
    const { show, user, fav_riders, review } = re;
    console.log(review)
    const fav_riders_id = fav_riders.map((rider)=> rider.id)
    return this.http.post(`${this.apiUrl}`, {'show_review': review, 'user': user.id, 'show': show.id, 'fav_riders': fav_riders_id })
  }

  getReviewsByUser(user: IUser): Observable<IReview[]>{
      return this.http.get<IReview[]>(`${this.apiUrl}user/${user.id}/`)
  }


}
