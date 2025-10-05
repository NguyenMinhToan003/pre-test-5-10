import envConfig from "@/config";
import { http } from "@/lib/http";
import { UserType } from "@/types/user";

export const userAPI = {
  me: () => http.get<{user: UserType}>(
    `${envConfig().NEXT_PUBLIC_API_ENDPOINT}/user/me`,
  ),
};