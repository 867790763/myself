<template>
  <!-- <AMenu
  :menuList="menuList"
  style="width: 256px;height: 100vh;"
  ></AMenu> -->
  <AlayoutSider>
    <AMenu mode="inline" :inline-collapsed="state.collapsed" theme="dark" style="max-width: 256px;position: fixed;top: 48px;height: calc(100% - 48px);">
      <template v-for="item in menuList" :key="item.key">
        <!-- 有子菜单 -->
        <SubMenu v-if="item.children" :key="item.key">
          <template #title>
            <span>
              <component :is="item.icon" />
              <!-- <icon v-if="item.icon" :type="item.icon" /> -->
              <span>{{ item.label }}</span>
            </span>
          </template>
          <MenuItem v-for="child in item.children" :key="child.key" @click="handleClickMenu(child)">
            {{ child.label }}
          </MenuItem>
        </SubMenu>

        <!-- 无子菜单 -->
        <MenuItem v-else :key="item.key">
          <component :is="item.icon" />
          <!-- <icon v-if="item.icon" :type="item.icon" /> -->
          <span>{{ item.label }}</span>
        </MenuItem>
      </template>
    </AMenu>
    <a-button type="primary" @click="toggleCollapsed" style="width: 100%;max-width: 265px;position: absolute;bottom: 0;">
      <MenuUnfoldOutlined v-if="state.collapsed" />
      <MenuFoldOutlined v-else />
    </a-button>
  </AlayoutSider>
</template>

<script lang="ts">
import { onMounted, ref } from 'vue'
import { Menu, SubMenu, MenuItem } from "ant-design-vue";
import { getMenuList, ItemType} from "@/api/menu";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';
import { defineComponent } from 'vue'
import { Layout } from 'ant-design-vue';
export default defineComponent({
  name: 'layoutSider',
  props: {
  },
  components: {
    AlayoutSider: Layout.Sider,
    AMenu: Menu,
    SubMenu,
    MenuItem,
    MenuFoldOutlined,
    MenuUnfoldOutlined
  },
  setup(){
    const router = useRouter() // 获取路由实例
    const state = {
      collapsed: false,
      selectedKeys: ['1'],
      openKeys: ['sub1'],
      preOpenKeys: ['sub1'],
    };
    let count = 0;
    const menuList: Array<ItemType> = ref([]);
    const toggleCollapsed = () => {
      count++;
      state.collapsed = !state.collapsed;
      state.openKeys = state.collapsed ? [] : state.preOpenKeys;
    };
    const menuRouter = async () => {
      const { data } = await getMenuList();
      menuList.value.push(...data)
    }
    const handleClickMenu = (child: object) => {
      console.log(child);
      router.push({path: child.path})
    }
     // 加载菜单数据
    onMounted(() => {
      menuRouter();
    })
    return { state, count, menuList, toggleCollapsed, menuRouter, handleClickMenu }
  }
})
</script>

<style lang='less' scoped>
</style>
