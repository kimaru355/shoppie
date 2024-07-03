import { Res } from './res';
import { Observable } from "rxjs";
import { Analytic } from "./analytic";

export interface AnalyticServices {
  getAnalytics(): Observable<Res<Analytic | null>>;
}
