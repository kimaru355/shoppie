import { Analytic } from "./analytic";

export interface AnalyticServices {
  getAnalytics(): Promise<Analytic>;
}
