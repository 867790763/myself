import { http } from "@/utils/http";

export interface LoginParams {
  username: string;
  password: string;
  validCode?: string;
  rememberMe?: boolean;
}

export function login(params?: LoginParams): Promise<LoginParams> {
  return http.request({
    url: `/login`,
    method: "post",
    data: params
  });
}

export function logout() {
  return http.request({
    url: `/logout`,
    method: "post",
  });
}
