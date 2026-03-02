<template>
  <div>
    <Layout>
      <LayoutHeader></LayoutHeader>
      <Layout style="height: 100vh;">
        <LayoutSider />
        <Layout class="layout-content">
          <LayoutContent />
        </Layout>
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
.layout-content{
  position: relative;
  top: 48px;
  flex: 1 1 auto;
  min-height: 0;
  max-height: calc(100vh - 48px);
  padding: 12px 12px 0;
  background-color: #f0f2f5;
}
</style>
