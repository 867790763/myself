import type { Router } from "vue-router";
import { useUserStore } from "@/stores/modules/user";
import { PageEnum } from '@/enums/pageEnum';
import { getCookie } from '@/utils/auth'
const LOGIN_PATH = PageEnum.BASE_LOGIN;
// 设置白名单
const whitePathList: PageEnum[]= [LOGIN_PATH]

export const createPermission = (router: Router) => {
  const userStore = useUserStore()
  const hasToken = getCookie()
  router.beforeEach((to, from, next) => {
    console.log(hasToken?.length);
  console.log(hasToken);
    if (whitePathList.includes(to.path as PageEnum)) {
      next();
      return;
    }
    if(hasToken?.length === 0) {
      console.log(hasToken);
      router.push({ path: LOGIN_PATH })
    }
    next();
    return;
  })
}
