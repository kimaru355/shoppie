import { Request, Response } from "express";
import { AnalyticService } from "../services/analytic.service";

export const getAnalytics = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const analyticService: AnalyticService = new AnalyticService();
  const response = await analyticService.getAnalytics();
  return res.status(200).json(response);
};
