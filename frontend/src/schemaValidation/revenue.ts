import { RevenueSource } from "@/types/enum";
import z from "zod";

export const RevenueSchema = z.object({
  amount: z.number().min(1, "Amount must be at least 1"),
  source: z.enum(RevenueSource, "Invalid source"),
  date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
})