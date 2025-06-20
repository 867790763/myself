import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
// import router from './router'
import { setupRouter, router } from "@/router";
import { setupStore } from "@/stores";
import { createPermission } from "@/router/permission";
import VueAMap, {initAMapApiLoader} from '@vuemap/vue-amap';
// import VueAMapLoca from '@vuemap/vue-amap-loca';
// import VueAMapExtra from '@vuemap/vue-amap-extra';
import '@vuemap/vue-amap/dist/style.css'
initAMapApiLoader({
  key: 'f40e736e34b89f24e7106555df500959',
  // securityJsCode: '—', // 新版key需要配合安全密钥使用
  //Loca:{
  //  version: '2.0.0'
  //} // 如果需要使用loca组件库，需要加载Loca
})
const app = createApp(App)
setupRouter(app)
setupStore(app)
app.use(VueAMap)
createPermission(router)
app.mount('#app')
