import { Observable } from 'rxjs';
import { Analytic } from '../interfaces/analytic';
import { Res } from '../interfaces/res';
import { HttpClient } from '@angular/common/http';
import { AnalyticServices } from '../interfaces/analytic_service';

export class AnalyticService implements AnalyticServices {
  private api: string = 'http://localhost:3000/analytic';

  constructor(private http: HttpClient) {}

  getAnalytics(): Observable<Res<Analytic>> {
    return this.http.get<Res<Analytic>>(`${this.api}/get`);
  }
}
