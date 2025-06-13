<template>
  <div class="bgDiv">
    <div class="formDiv">
      <!-- <div class="topDiv"></div> -->
      <a-row style="padding: 1rem 0;">
        <a-col :span="12" style="padding: 0 1.5rem;">
          <p class="pBorder">扫描二维码登录</p>
          <div style="text-align: center;">
            <a-qrcode
              error-level="H"
              value="https://www.antdv.com"
              icon="https://www.antdv.com/assets/logo.1ef800a8.svg"
              style="width: 100%;margin: 1rem auto;"
            />
            <p>请使用 微信 扫码登录</p>
            <p>打开微信 - 右上角扫一扫</p>
          </div>
        </a-col>
        <a-col :span="12" style="padding: 0 1.5rem;">
          <p class="pBorder">登录</p>
          <div style="text-align: center;"></div>
          <a-form :model="formData" :wrapper-col="{ span: 24 }" @submit="submit" style="margin-top: 20px;">
            <a-form-item name="username" :rules="[{ required: true, message: '请填写用户名/手机号' }]">
              <a-input v-model:value="formData.username" placeholder="用户名/手机号"></a-input>
            </a-form-item>
            <a-form-item  name="password" :rules="[{ required: true, message: '请填写密码' }]">
              <a-input-password v-model:value="formData.password" placeholder="密码"></a-input-password>
            </a-form-item>
            <a-form-item>
              <a-button type="primary" html-type="submit" style="width: 100%;" :loading="loading">登录</a-button>
            </a-form-item>
          </a-form>
          <!-- <a-tabs v-model:activeKey="activeKey">
            <a-tab-pane key="1" tab="短信登录">
              <a-form :model="formData1" :wrapper-col="{ span: 24 }"  @finish="onFinish">
                <a-form-item name="phone" :rules="[{ required: true, message: '请填写手机号' }]">
                  <a-input v-model="formData1.phone"  placeholder="手机号"></a-input>
                </a-form-item>
                <a-form-item  name="verCode" :rules="[{ required: true, message: '请填写验证码' }]">
                  <a-input v-model="formData1.verCode" placeholder="验证码"></a-input>
                </a-form-item>
                <a-form-item>
                  <a-button type="primary" html-type="submit" style="width: 100%;">登录</a-button>
                </a-form-item>
              </a-form>
            </a-tab-pane>
            <a-tab-pane key="2" tab="密码登录">
              <a-form :model="formData" :wrapper-col="{ span: 24 }" @submit="submit">
                <a-form-item name="username" :rules="[{ required: true, message: '请填写用户名/手机号' }]">
                  <a-input v-model:value="formData.username" placeholder="用户名/手机号"></a-input>
                </a-form-item>
                <a-form-item  name="password" :rules="[{ required: true, message: '请填写密码' }]">
                  <a-input-password v-model:value="formData.password" placeholder="密码"></a-input-password>
                </a-form-item>
                <a-form-item>
                  <a-button type="primary" html-type="submit" style="width: 100%;">登录</a-button>
                </a-form-item>
              </a-form>
            </a-tab-pane>
          </a-tabs> -->
          <a-row justify="center">
            <a-col style="font-size: 16px;">第三方账号登录</a-col>
          </a-row>
          <a-row justify="center" style="margin-top: 1rem;">
            <a-col :span="4">
              <WechatFilled style="font-size: 28px;" />
            </a-col>
            <a-col :span="4" :offset="1">
              <AlipayCircleFilled style="font-size: 28px;" />
            </a-col>
            <a-col :span="4" :offset="1">
              <GithubFilled style="font-size: 28px" />
            </a-col>
          </a-row>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  WechatFilled,
  AlipayCircleFilled,
  GithubFilled,
} from '@ant-design/icons-vue';
import { useUserStore } from "@/stores/modules/user";
import { router } from "@/router";
import axios from "axios";
import { message } from "ant-design-vue";
const activeKey = ref('2');
const loading  = ref(false);
const formData = ref(<LoginParams>{
  username: '',
  password: '',
  validCode: '',
  rememberMe: false
})
const submit = async () => {
  console.log(formData.value);
  loading.value = true
  useUserStore().login(formData.value).then(res => {
    loading.value = false
    console.log(res);
    if (res.code === 200) {
      // message.success({ content: res.data.msg, duration: 2 });
      message.loading({ content: '请稍等，正在进入系统...', duration: 1.5 }).then(() => router.push('/'))
    }
  })
};
</script>

<style lang="less" scoped>
.bgDiv {
  width: 100%;
  height: 100vh;
  background: url("../../assets/img/bgimg.jpg");
  background-repeat: no-repeat;
  background-size: 100%;
}
.topDiv{
  // width: 100%;
  // height: 50px;
}
.formDiv {
  width: 30%;
  height: 400px;
  background: white;
  border-radius: 8px;
  position: absolute;
  top: 50%;
  transform: translate(115%, -50%);
}
.pBorder{
  padding: 12px 0;
  font-size: 18px;
  font-weight: 700;
  border-bottom: 1px solid #eeeeee;
}
</style>
