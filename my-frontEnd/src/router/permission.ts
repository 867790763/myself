import type { Router } from "vue-router";
import { useUserStore } from "@/stores/modules/user";
import { PageEnum } from '@/enums/pageEnum';

const LOGIN_PATH = PageEnum.BASE_LOGIN;
// 设置白名单
const whitePathList: PageEnum[]= [LOGIN_PATH]

export const createPermission = (router: Router) => {
  const userStore = useUserStore()
  const hasToken = userStore.getToken as string
  console.log(!hasToken);
  console.log(hasToken);
  router.beforeEach((to, from, next) => {
    if (whitePathList.includes(to.path as PageEnum)) {
      next();
      return;
    }
    if(!hasToken) {
      // console.log(hasToken);
      router.push({ path: LOGIN_PATH })
    }else {
      console.log('123456');
      
      next()
      return;
    }
  })
}
