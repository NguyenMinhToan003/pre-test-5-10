import envConfig from "@/config";
import { http } from "@/lib/http";
import { LoginRequestType, LoginResponseType } from "@/types/auth";

export const authAPI = {
  login: (data: LoginRequestType) =>
    http.post<LoginResponseType>(
      `${envConfig().NEXT_PUBLIC_API_ENDPOINT}/auth/login`,
      data
    ),
  authServer: (data: LoginResponseType) => http.post("/api/auth", data),
};