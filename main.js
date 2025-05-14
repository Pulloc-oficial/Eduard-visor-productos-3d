import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

// Escena básica de prueba
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
scene.background = new THREE.Color(0xffffff); // blanco

// Luz
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 1, 1);
scene.add(light);


//añadiendo modelo
const loader = new GLTFLoader();
loader.load(
  './public/producto2/scene.gltf', // ruta a tu archivo glTF
  (gltf) => {
    const model = gltf.scene;
    scene.add(model);
    model.position.set(0, 0, 0); // opcional: ajusta posición
    model.scale.set(0.5, 0.5, 0.5); // Escala uniforme al 50%
  },
  undefined,
  (error) => {
    console.error('Error cargando el modelo GLTF:', error);
  }
);

// Cámara y controles
camera.position.z = 5;
const controls = new OrbitControls(camera, renderer.domElement);

// GUI

// Loop de render
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
