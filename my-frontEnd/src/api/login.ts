import { http } from "@/utils/http";

export interface LoginParams {
  username: string;
  password: string;
  validCode?: string;
  rememberMe?: boolean;
}

export function login(params?: LoginParams): Promise<LoginParams> {
  console.log(import.meta.env.VITE_BASE_API,);
  return http.request({
    url: `/login`,
    method: "post",
    data: params
  });
}

export function logout(params: any) {
  return http.request({
    url: `/logout`,
    method: "post",
    data: params
  });
}
