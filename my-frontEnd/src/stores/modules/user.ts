import { defineStore } from 'pinia'
import { login as userLogin, logout as userLogout } from '@/api/login'
import { setCookie, removeCookie } from '@/utils/auth'
import { setStorage, getStorage } from "@/utils/cache";
import { message } from "ant-design-vue";
import { PageEnum } from "@/enums/pageEnum";
import { router } from "@/router/index";
export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: {},
    username: '',
    token: ''
  }),

  actions: {
    // 登录
    async login(userInfo: { username: string; password: string }) {
      try {
        const data = await userLogin(userInfo)
        console.log('data.code !== 200', data);
        if (data.code !== 200) {
          message.error(data.msg)
          return data
        }
        this.username = userInfo.username
        this.setToken(data.data.token)
        setCookie('token', data.data.token)
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
        removeCookie('token')
        setStorage('userInfo', '')
        router.push(PageEnum.BASE_LOGIN)
      }
    },
    setToken(token: string) {
      this.token = token
      console.log('this.token', token);
      
    },
    setUserInfo() {}
  },
  getters: {
    getToken(): string {
      return this.token
    },
    getUserInfo(): string {
      return getStorage('userInfo')
    },
  }
})
