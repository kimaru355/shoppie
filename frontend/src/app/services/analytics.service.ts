import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Res } from '../interfaces/res';
import { Analytic } from '../interfaces/analytic';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  api: string = 'http://localhost:3000/analytics';
  constructor(private http: HttpClient) { }

  getAnalytics(): Observable<Res<Analytic | null>> {
    return this.http.get<Res<Analytic | null>>(this.api);
  }
}
