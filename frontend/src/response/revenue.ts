import envConfig from "@/config";
import { http } from "@/lib/http";
import { CreateRevenueRequestType, RevenueDashboardResponseType, RevenueItem } from "@/types/revenue";

export const revenueAPI = {
  getDashboard: (params: { date: string}) =>
    http.get<RevenueDashboardResponseType>(
      `${envConfig().NEXT_PUBLIC_API_ENDPOINT}/revenue/dashboard?date=${params.date}`,
    ),
  getAll: () => http.get<{revenues:RevenueItem[]}>(`${envConfig().NEXT_PUBLIC_API_ENDPOINT}/revenue`),
  create: (data: CreateRevenueRequestType) =>
    http.post(`${envConfig().NEXT_PUBLIC_API_ENDPOINT}/revenue`, data),
  update: (id: string, data: Partial<CreateRevenueRequestType>) =>
    http.put(`${envConfig().NEXT_PUBLIC_API_ENDPOINT}/revenue/${id}`, data),
  delete: (id: string) =>
    http.delete(`${envConfig().NEXT_PUBLIC_API_ENDPOINT}/revenue/${id}`),
};