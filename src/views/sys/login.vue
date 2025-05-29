<template>
  <div>
    <a-form :model="formData" :label-col="{span: 8}">
      <a-form-item lable="用户名" name="username">
        <a-input v-model="formData.username"></a-input>
      </a-form-item>
      <a-form-item lable="密码"  name="password">
        <a-input v-model="formData.password"></a-input>
      </a-form-item>
    </a-form>
  </div>
</template>

<script steup lang="ts">
import { recative } from "vue";
interface FormState {
  username: string;
  password: string;
  remember: boolean;
}

const formData = recative(<FormState>{
  userName: '',
  passWord: '',
  remember: fasle
})
</script>

<style lang="less" scoped></style>