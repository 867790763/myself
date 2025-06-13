import { http } from "@/utils/http";

export interface LoginParams {
  username: string;
  password: string;
  validCode?: string;
  rememberMe?: boolean;
}

export function loginApi(params?: LoginParams): Promise<LoginParams> {
  return http.request({
    url: `/login`,
    method: "post",
    data: params
  });
}
