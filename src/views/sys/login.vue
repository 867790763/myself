<template>
  <div class="bgDiv">
    <div class="formDiv">
      <!-- <div class="topDiv"></div> -->
      <a-row style="padding: 2rem;">
        <a-col :span="12">
          <a-qrcode
            error-level="H"
            value="https://www.antdv.com"
            icon="https://www.antdv.com/assets/logo.1ef800a8.svg"
            style="margin: auto 2rem;"
          />
        </a-col>
        <a-col :span="12">
          <a-tabs v-model:activeKey="activeKey">
            <a-tab-pane key="1" tab="短信登录">
              <a-form :model="formData" :wrapper-col="{ span: 24 }">
                <a-form-item name="phone">
                  <a-input v-model="formData.phone" placeholder="手机号"></a-input>
                </a-form-item>
                <a-form-item  name="verCode">
                  <a-input v-model="formData.verCode" placeholder="验证码"></a-input>
                </a-form-item>
                <a-form-item>
                  <a-button type="primary" html-type="submit" style="width: 100%;">登录</a-button>
                </a-form-item>
              </a-form>
            </a-tab-pane>
            <a-tab-pane key="2" tab="密码登录">
              <a-form :model="formData" :wrapper-col="{ span: 24 }">
                <a-form-item name="username">
                  <a-input v-model="formData.username" placeholder="用户名/手机号"></a-input>
                </a-form-item>
                <a-form-item  name="password">
                  <a-input v-model="formData.password" placeholder="密码"></a-input>
                </a-form-item>
                <a-form-item>
                  <a-button type="primary" html-type="submit" style="width: 100%;">登录</a-button>
                </a-form-item>
              </a-form>
            </a-tab-pane>
          </a-tabs>
          <a-row>
            <a-col>第三方账号登录</a-col>
          </a-row>
          <a-row>
            <a-col>
              <WechatFilled />
            </a-col>
            <a-col>
              <AlipayCircleFilled />
            </a-col>
            <a-col>
              <GithubFilled />
            </a-col>
          </a-row>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
interface FormState {
  username: string;
  password: string;
  remember: boolean;
}
const activeKey = ref('1')
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
  height: 480px;
  background: white;
  border-radius: 8px;
  position: absolute;
  top: 50%;
  transform: translate(115%, -50%);
}
</style>
