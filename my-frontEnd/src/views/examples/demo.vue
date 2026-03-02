<template>
  {{ msg }}
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import * as THREE from 'three';
const msg = ref('3D index page');
const scene = new THREE.Scene(); //场景 scene
console.log(scene);

</script>

<style lang='less' scoped>

</style>
