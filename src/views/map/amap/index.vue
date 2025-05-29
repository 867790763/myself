<template>
  <div id="map-container">
    <el-amap ref="mapRef" :center="center" :zoom="zoom" @init="init" style="width: 100%;height: 100%;"></el-amap>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {ElAmap} from "@vuemap/vue-amap";
const center = ref([114.412495, 30.725714]);
const zoom = ref(10);
const map = ref(null);
const mapRef = ref(null)
const init = () => {
  console.log(mapRef.value);
  
}
</script>

<style lang="less" scoped>
#map-container {
  height: 99vh;
}
</style>