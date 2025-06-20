<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import { StyleProvider, ConfigProvider } from "ant-design-vue";
import { useUserStore } from '@/stores/modules/user';
const logOut = () => {
  const useUserStores = useUserStore();
  useUserStores.logout();
}
</script>

<template>
  <StyleProvider>
    <ConfigProvider>
      <RouterView />
    </ConfigProvider>
  </StyleProvider>
</template>

<style scoped>

</style>
