import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IReview } from '../interfaces/models/review.interface';
import { IUser } from '../interfaces/models/user.interface';
import { IMedia } from '../interfaces/models/media.interface';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrl = 'http://localhost:8000/reviews/'; 

  constructor(private http: HttpClient) { }

  submitReview(re: IReview): Observable<any>{
    const { show, user, fav_riders, show_review } = re;
    const fav_riders_id = fav_riders.map((rider)=> rider.id)
    return this.http.post(`${this.apiUrl}`, {'show_review': show_review, 'user': user.id, 'show_id': show.id, 'fav_riders_ids': fav_riders_id })
  }

  getReviewsByUser(userID: string): Observable<IReview[]>{
      return this.http.get<IReview[]>(`${this.apiUrl}user/${userID}/`)
  }

  getReviewsMediaByUser(userID: string): Observable<IMedia>{
      return this.http.get<IMedia>(`${this.apiUrl}user/${userID}/media/`)
  }


}
