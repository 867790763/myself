<template>
  <!-- <AMenu
  :items="items"
  style="width: 256px;height: 100vh;"
  ></AMenu> -->
  <div style="height: 100vh;">
    <AMenu mode="inline" :inline-collapsed="state.collapsed" theme="dark" style="width: 256px;position: fixed;top: 48px;height: calc(100% - 48px);">
      <template v-for="item in items" :key="item.key">
        <!-- 有子菜单 -->
        <a-sub-menu v-if="item.children" :key="item.key">
          <template #title>
            <span>
              <component :is="item.icon" />
              <!-- <icon v-if="item.icon" :type="item.icon" /> -->
              <span>{{ item.label }}</span>
            </span>
          </template>
          <a-menu-item v-for="child in item.children" :key="child.key">
            {{ child.label }}
          </a-menu-item>
        </a-sub-menu>

        <!-- 无子菜单 -->
        <a-menu-item v-else :key="item.key">
          <component :is="item.icon" />
          <!-- <icon v-if="item.icon" :type="item.icon" /> -->
          <span>{{ item.label }}</span>
        </a-menu-item>
      </template>
    </AMenu>
    <a-button type="primary" @click="toggleCollapsed" style="width: 256px;position: absolute;bottom: 0;">
      <MenuUnfoldOutlined v-if="state.collapsed" />
      <MenuFoldOutlined v-else />
    </a-button>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue'
import { Menu as AMenu } from "ant-design-vue";
import { getMenuList, ItemType} from "@/api/menu";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons-vue';
  const state = reactive({
    collapsed: false,
    selectedKeys: ['1'],
    openKeys: ['sub1'],
    preOpenKeys: ['sub1'],
  });
  const count = ref(0)
  const items: Array<ItemType> = reactive([])

  // 加载菜单数据
  onMounted(async () => {
    try {
      const { data } = await getMenuList()
      items.push(...data)
    } catch (err) {
      console.error('加载菜单失败:', err)
    }
  })

  const toggleCollapsed = () => {
    count.value++
    state.collapsed = !state.collapsed;
    state.openKeys = state.collapsed ? [] : state.preOpenKeys;
  };
  const menuRouter = async () => {
    const { data } = await getMenuList();
    items.push(data)
    console.log(res.data);
    console.log(items);
  }
  // menuRouter()
</script>

<style lang='less' scoped>
</style>
