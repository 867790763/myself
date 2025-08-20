import { defineStore } from 'pinia'
import { login as userLogin, logout as userLogout } from '@/api/login'
import { getCookie, setCookie, removeCookie } from '@/utils/auth'
import { setStorage, getStorage } from "@/utils/cache";
import { message } from "ant-design-vue";
import { PageEnum } from "@/enums/pageEnum";
import { router } from "@/router/index";
export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: {} as object | null,
    username: '',
    token: '',
    roleList: [] as Array<string>
  }),

  actions: {
    // 登录
    async login(userInfo: { username: string; password: string }) {
      try {
        const data = await userLogin(userInfo)
        if (data.code !== 200) {
          message.error(data.msg)
          return data
        }
        this.username = userInfo.username
        this.setToken(data.data.token)
        this.setRoleList(data.data.role)
        this.setUserInfo(data.data)
        setCookie('token', data.data.token)
        setCookie('roleList', data.data.roles)
        setStorage('userInfo', data.data.user)
        return data
      } catch (err) {
        removeCookie('token')
        throw err
      }
    },

    // 登出
    async logout() {
      try {
        await userLogout()
      } finally {
        this.username = ''
        this.token = ''
        this.setRoleList([]);
        this.setUserInfo(null)
        removeCookie('token')
        setStorage('userInfo', null)
        router.push(PageEnum.BASE_LOGIN)
      }
    },
    setToken(token: string) {
      this.token = token
      setCookie('token', token)
    },
    setRoleList(roleList: Array<string>) {
      this.roleList = roleList
      setCookie('roleList', roleList + '')
    },
    setUserInfo(res: Recordable | null) {
      this.userInfo = res
      setStorage('userInfo', res + '')
    }
  },
  getters: {
    getToken(): string {
      return this.token || getCookie('token')
    },
    getUserInfo(): string {
      return getStorage('userInfo')
    },
    getRoleList(): Array<string> {
      return this.roleList || getCookie('roleList')
    }
  }
})
