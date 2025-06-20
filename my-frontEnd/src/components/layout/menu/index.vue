<template>
  <AMenu
  :items="items"
  style="width: 256px;"
  ></AMenu>
</template>

<script lang="ts">
import { defineComponent, h } from 'vue'
import { Menu, type ItemType } from "ant-design-vue";
import { getMenuList } from "@/api/menu";
import {
  MailOutlined,
  CalendarOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from '@ant-design/icons-vue';
export default defineComponent({
  name: 'layoutMenu',
  props: {
  },
  components:{
    AMenu: Menu
  },
  setup(){
    // let items = {}
    function getItem(
      label: string,
      key: string,
      icon?: any,
      children?: ItemType[],
      type?: 'group',
    ): ItemType {
      return {
        key,
        icon,
        children,
        label,
        type,
      } as ItemType;
    }
    const items: ItemType[] = ([
      getItem('Navigation One', '1', h(MailOutlined)),
      getItem('Navigation Two', '2', h(CalendarOutlined)),
      getItem('Navigation Two', 'sub1', h(AppstoreOutlined), [
        getItem('Option 3', '3'),
        getItem('Option 4', '4'),
        getItem('Submenu', 'sub1-2', null, [getItem('Option 5', '5'), getItem('Option 6', '6')]),
      ]),
      getItem('Navigation Three', 'sub2', h(SettingOutlined), [
        getItem('Option 7', '7'),
        getItem('Option 8', '8'),
        getItem('Option 9', '9'),
        getItem('Option 10', '10'),
      ]),
    ]);
    // async function menuRouter() {
    //   const res = await getMenuList();
    //   items = res.data.map(d => getItem(d.name, d.id, d.icon, d.children));
    //   console.log(items);
    // }
    // menuRouter()
    
    return{
      items
    }
  },
})
</script>

<style lang='less' scoped>
</style>