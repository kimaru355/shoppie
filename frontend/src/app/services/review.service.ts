import { Injectable } from '@angular/core';
import { ReviewServices } from '../interfaces/review_service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NewReview, Review } from '../interfaces/review';
import { Observable } from 'rxjs';
import { Res } from '../interfaces/res';

@Injectable({
  providedIn: 'root',
})
export class ReviewService implements ReviewServices {
  api: string = 'http://localhost:3000/reviews';
  headers = new HttpHeaders({
    Authorization: localStorage.getItem('authToken') || '',
  });
  constructor(private http: HttpClient) {}

  createReview(review: NewReview): Observable<Res<null>> {
    return this.http.post<Res<null>>(`${this.api}/create`, review, {
      headers: this.headers,
    });
  }

  updateReview(review: Review): Observable<Res<null>> {
    return this.http.put<Res<null>>(`${this.api}/update/${review.id}`, review, {
      headers: this.headers,
    });
  }

  deleteReview(id: string): Observable<Res<null>> {
    return this.http.delete<Res<null>>(`${this.api}/delete/${id}, {
      headers: this.headers,
    }`);
  }

  getAllReviews(): Observable<Res<Review[] | null>> {
    return this.http.get<Res<Review[] | null>>(`${this.api}/all`);
  }

  getReviewsByUserId(userId: string): Observable<Res<Review[] | null>> {
    return this.http.get<Res<Review[] | null>>(`${this.api}/user/${userId}`, {
      headers: this.headers,
    });
  }

  getReviewsByProductId(productId: string): Observable<Res<Review[] | null>> {
    return this.http.get<Res<Review[] | null>>(
      `${this.api}/product/${productId}`
    );
  }
}
