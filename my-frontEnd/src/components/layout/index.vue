<template>
  <div>
    <Layout>
      <LayoutHeader></LayoutHeader>
      <Layout style="flex-direction: row;">
        <LayoutSider>
          
        </LayoutSider>
        <!-- <Layout style="width: 0;display: flex;flex-direction: column;"> -->
          <LayoutContent></LayoutContent>
        <!-- </Layout> -->
      </Layout>
    </Layout>
  </div>
</template>

<script setup lang='ts'>
// import { ref } from 'vue'
import { Layout } from 'ant-design-vue';
import LayoutHeader from "./header/index.vue";
import LayoutSider from "./sider/index.vue";
import LayoutContent from "./content/index.vue";
</script>

<style scoped>
</style>