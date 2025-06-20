<template>
  <AlayoutHeader class="lay-header">
    <div :class="`${prefixCls}-left`">
      <div :class="`${prefixCls}-log`">
        后台系统
      </div>
    </div>

    <div :class="`${prefixCls}-menu`">
      <div class="menuDiv"></div>
    </div>

    <div :class="`${prefixCls}-action`">
      <a-dropdown style="height: 48px">
        <div style="display: flex;align-items: center;">
          <a-avatar>
            <template #icon>
              <UserOutlined />
            </template>
          </a-avatar>
          <a @click.prevent>
            {{ userInfo.name }}
          </a>
        </div>
        <template #overlay>
          <a-menu>
            <a-menu-item>
              <a href="javascript:;" @click="logout">登出</a>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </AlayoutHeader>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useUserStore } from "@/stores/modules/user";
import { Layout } from 'ant-design-vue';
import { UserOutlined } from '@ant-design/icons-vue';
export default defineComponent({
  name: 'layoutHeader',
  props: {
  },
  components: {
    AlayoutHeader: Layout.Header,
    UserOutlined
  },
  setup(){
    const prefixCls = 'layout-self'
    const userInfo = useUserStore().getUserInfo
    function logout() {
      useUserStore().logout();
    }
    return{
      prefixCls,
      userInfo,
      logout
    }
  }
})
</script>

<style lang="less" scoped>
@import '../index.less';
</style>
