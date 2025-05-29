<template>
  <div ref="container" class="scene-container"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const container = ref(null);
let scene, camera, renderer, controls, cube;

onMounted(() => {
  initScene();
  animate();
});

function initScene() {
  // 1. 创建场景
  scene = new THREE.Scene();
  scene.background = new THREE.Color('black');

  // 2. 创建相机
  camera = new THREE.PerspectiveCamera(
    75,
    container.value.clientWidth / container.value.clientHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  // 3. 创建渲染器
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.value.clientWidth, container.value.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.value.appendChild(renderer.domElement);

  // 4. 添加控制器
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  // 5. 添加物体
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const geometry1 = new THREE.CircleGeometry(1, 2);
  const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
  // cube = new THREE.Mesh(geometry, material);
  cube = new THREE.Mesh(geometry1, material);
  scene.add(cube);

  // 6. 添加光源
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5, 5, 5);
  scene.add(directionalLight);

  // 7. 响应窗口大小变化
  window.addEventListener('resize', handleResize);
}

function animate() {
  requestAnimationFrame(animate);
  
  // 更新立方体旋转
  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;
  
  controls.update();
  renderer.render(scene, camera);
}

function handleResize() {
  camera.aspect = container.value.clientWidth / container.value.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.value.clientWidth, container.value.clientHeight);
}

onUnmounted(() => {
  // 清理资源
  window.removeEventListener('resize', handleResize);
  if (renderer) renderer.dispose();
});
</script>

<style scoped>
.scene-container {
  width: 100vw;
  height: 100vh;
}
</style>