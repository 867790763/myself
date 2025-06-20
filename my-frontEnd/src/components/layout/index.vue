<template>
  <div>
    <Layout>
      <layoutHeader></layoutHeader>
      <Layout>
        <layoutSider></layoutSider>
      </Layout>
    </Layout>
    <layoutMenu></layoutMenu>
  </div>
</template>

<script setup lang='ts'>
// import { ref } from 'vue'
import { Layout } from 'ant-design-vue';
import layoutHeader from "./header/index.vue";
import layoutMenu from "./menu/index.vue";
import layoutSider from "./sider/index.vue";
</script>

<style scoped>
</style>