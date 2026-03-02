<template>
  <RouterView>
    <template #default="{ Component, route }">
      <transition>
        <keep-alive>
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
      </transition>
    </template>
  </RouterView>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import { Layout } from 'ant-design-vue';
import type { FunctionalComponent } from 'vue';
import type { RouteLocation } from 'vue-router';
export interface DefaultContext {
  Component: FunctionalComponent;
  route: RouteLocation;
}
export default defineComponent({
  name: 'layoutHeader',
  props: {
  },
  components: {
    AlayoutContent: Layout.Content,
  },
  setup(){
    // const route = useRoute()
    // console.log(route);

    // return {
    //   route
    // }
  }
})
</script>

<style lang='scss' scoped>

</style>
