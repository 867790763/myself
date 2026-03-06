import * as THREE from 'three';
// 创建一个场景
const scene = new THREE.Scene();
// 创建相机(视野范围，宽高比，近裁剪面，远裁剪面)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// 创建渲染器
const renderer = new THREE.WebGLRenderer();
// 设置渲染尺寸
renderer.setSize(window.innerWidth, window.innerHeight)
// 将 renderer 元素添加到 HTML 文档，渲染器用它来来展示场景
document.body.appendChild(renderer.domElement);
// 创建一个立方体
const geometry = new THREE.BoxGeometry(1, 1, 1); // 盒形几何体
// 给几何体设置材质
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // 网格基础材质
// 网格是一个接受几何体并将材质应用于其上的对象，然后我们可以将它插入场景中并自由移动。
const cute = new THREE.Mesh(geometry, material);
// 调用 scene.add() 时，添加的对象会被放置在坐标 (0,0,0) 处
scene.add(cute);
//
camera.position.z = 5;
//
function animate(time) {
    cute.rotation.x = time / 2000;
    cute.rotation.y = time / 1000;
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);