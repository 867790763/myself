<template>
  <div class="bgDiv">
    <div class="formDiv">
      <!-- <div class="topDiv"></div> -->
      <a-row>
        <a-col :span="12">
          <a-qrcode
            error-level="H"
            value="https://www.antdv.com"
            icon="https://www.antdv.com/assets/logo.1ef800a8.svg"
          />
        </a-col>
        <a-col :span="12">
          <a-form :model="formData" :wrapper-col="{ span: 24 }">
            <a-form-item name="username">
              <a-input v-model="formData.username" placeholder="请输入用户名"></a-input>
            </a-form-item>
            <a-form-item  name="password">
              <a-input v-model="formData.password" placeholder="请输入密码"></a-input>
            </a-form-item>
            <a-form-item>
              <a-button type="primary" html-type="submit" style="width: 100%;">登录</a-button>
            </a-form-item>
          </a-form>
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
