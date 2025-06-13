import { http } from "@/utils/http";


export function getUsers(params?: unknown): Promise<unknown> {
  console.log(import.meta.env.VITE_BASE_API,);
  return http.request({
    url: `/users/getUsers`,
    method: "post",
    data: params
  });
}

export function createUser(params: unknown) {
  return http.request({
    url: `/users/createUser`,
    method: "post",
    data: params
  });
}
