import * as THREE from "three";
import "./style.css";
// scene 
const scene = new THREE.Scene();

// create shape
const geomatry = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial({
  color: "#00ff83",
  
})

const mesh = new THREE.Mesh(geomatry, material);
scene.add(mesh);

// view port sizes 
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

// setting up the light
const light = new THREE.PointLight(0xffffff, 150, 100);
light.position.set(0, 10, 10);
scene.add(light);


// creating a camera
const camera = new THREE.PerspectiveCamera(45, sizes.width/sizes.height, 0.1, 100);
camera.position.z = 20;
scene.add(camera);

// rendering the scene into html

const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(sizes.width, sizes.height);

// rendering camera and scene
renderer.render(scene, camera); 

