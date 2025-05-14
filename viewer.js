import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';



const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);


document.body.appendChild(renderer.domElement);
//Luces
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 1, 1);
scene.add(light);

const ambient = new THREE.AmbientLight(0xffffff, 1.2);
scene.add(ambient);

camera.position.z = 3;
const controls = new OrbitControls(camera, renderer.domElement);

// Luz hemisférica (simula cielo y suelo)
const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.2);
hemiLight.position.set(0, 20, 0);
scene.add(hemiLight);

// Configuración
const page = window.location.pathname.split('/').pop().replace('.html', '');
const modelConfigs = {
  producto1: { path: './public/producto1/scene.gltf', scale: [2, 2, 2   ] },
  producto2: { path: './public/producto2/scene.gltf', scale: [37, 37, 37] },
  producto3: { path: './public/producto3/scene.gltf', scale: [0.2, 0.2, 0.2] },
  producto4: { path: './public/producto4/scene.gltf', scale: [1, 1, 1] },
  producto5: { path: './public/producto5/scene.gltf', scale: [1, 1, 1] },
  producto6: { path: './public/producto6/scene.gltf', scale: [0.2, 0.2, 0.2] }
};
let model; // declarar variable fuera

const config = modelConfigs[page];

if (!config) {
  console.error(`No hay configuración para "${page}"`);
} else {
  const loader = new GLTFLoader();
  loader.load(config.path, function (gltf) {
    model = gltf.scene;
    model.scale.set(...config.scale);
    scene.add(model);
  }, undefined, function (error) {
    console.error('Error cargando modelo:', error);
  });
}

// Cámara
const isMobile = window.innerWidth < 768;
camera.position.z = isMobile ? 5 : 3;

// Controles
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// Responsive
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
  requestAnimationFrame(animate);
  controls.update();
   if (model) {
    model.rotation.y += 0.010; // ajusta la velocidad aquí
  }
  renderer.render(scene, camera);
}
animate();
