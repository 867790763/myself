<template>
  <div class="bgDiv">
    <div class="formDiv">
      <!-- <div class="topDiv"></div> -->
      <a-row style="padding: 1rem 0;">
        <a-col :span="12" style="padding: 0 1.5rem;">
          <p style="padding: 12px 0;border-bottom: 1px solid #eeeeee;">扫描二维码登录</p>
          <div style="text-align: center;">
            <a-qrcode
              error-level="H"
              value="https://www.antdv.com"
              icon="https://www.antdv.com/assets/logo.1ef800a8.svg"
              style="width: 100%;margin: 1rem auto;"
            />
            <p>请使用 微信 扫码登录</p>
            <p>打开站酷APP - 我的 - 右上角扫一扫</p>
          </div>
        </a-col>
        <a-col :span="12" style="padding: 0 1.5rem;">
          <a-tabs v-model:activeKey="activeKey">
            <a-tab-pane key="1" tab="短信登录">
              <a-form :model="formData" :wrapper-col="{ span: 24 }">
                <a-form-item name="phone" :rules="[{ required: true, message: '请填写手机号' }]">
                  <a-input v-model="formData.phone"  placeholder="手机号"></a-input>
                </a-form-item>
                <a-form-item  name="verCode" :rules="[{ required: true, message: '请填写验证码' }]">
                  <a-input v-model="formData.verCode" placeholder="验证码"></a-input>
                </a-form-item>
                <a-form-item>
                  <a-button type="primary" html-type="submit" style="width: 100%;">登录</a-button>
                </a-form-item>
              </a-form>
            </a-tab-pane>
            <a-tab-pane key="2" tab="密码登录">
              <a-form :model="formData" :wrapper-col="{ span: 24 }">
                <a-form-item name="username" :rules="[{ required: true, message: '请填写用户名/手机号' }]">
                  <a-input v-model="formData.username" placeholder="用户名/手机号"></a-input>
                </a-form-item>
                <a-form-item  name="password" :rules="[{ required: true, message: '请填写密码' }]">
                  <a-input v-model="formData.password" placeholder="密码"></a-input>
                </a-form-item>
                <a-form-item>
                  <a-button type="primary" html-type="submit" style="width: 100%;">登录</a-button>
                </a-form-item>
              </a-form>
            </a-tab-pane>
          </a-tabs>
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
interface FormState {
  username: string;
  password: string;
  remember: boolean;
}
const activeKey = ref('2')
const formData = ref(<FormState>{
  username: '',
  password: '',
  remember: false
})
console.log(formData.value.username);

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
</style>
