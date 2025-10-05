import { RevenueSource } from "./enum";

export type RevenueDashboardResponseType = {
  start: string;
  end: string;
  weeklyData: DailyRevenue[];
  prevWeeklyData: DailyRevenue[];
}
export type DailyRevenue = {
    dayOfWeek: number;
    pos: number;
    eatclub: number;
    labour: number;
}
export type CreateRevenueRequestType = {
  amount: number;
  source: RevenueSource;
  date: string;
}
export type RevenueItem = {
  _id: string;
  amount: number;
  source: RevenueSource;
  date: string;
}