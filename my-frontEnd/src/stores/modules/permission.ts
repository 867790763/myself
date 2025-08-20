import { defineStore } from 'pinia'
import { ItemType } from "@/api/menu";
import { toRaw } from 'vue';
import { AppRouteRecordRaw, Menu } from "@/router/type";
import userStore from "@/store/modules/user";
export const usePermissionStore = defineStore("permission", {
  state: () => ({
    routerArray: [],
  }),
  actions: {
    setRouter() {
      this.routerArray = []
    }
  },
  getters: {
    getRouterArray(): Array<Menu> {
      return this.routerArray
    },
    buildRouterAction() {
      const roleList = toRaw(userStore.getRoleList) || [];
    }

  },
})