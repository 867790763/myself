import type { Router } from "vue-router";
import { useUserStore } from "@/stores/modules/user";
import { PageEnum } from '@/enums/pageEnum';

const LOGIN_PATH = PageEnum.BASE_LOGIN;
// 设置白名单
const whitePathList: PageEnum[]= [LOGIN_PATH]

export const createPermission = (router: Router) => {
  const userStore = useUserStore()
  router.beforeEach(async (to, from, next) => {
    const hasToken = await userStore.getToken
    console.log(hasToken?.length);
    console.log(hasToken);
    if (whitePathList.includes(to.path as PageEnum)) {
      console.log('whitePathList', whitePathList);
      next();
      return;
    }
    if(!hasToken?.length) {
      console.log(hasToken);
      router.push({ path: LOGIN_PATH })
    }
    next();
    return;
  })
}
