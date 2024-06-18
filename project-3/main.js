import * as THREE from "three";
import "./style.css";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import gsap from "gsap";

// scene 
const scene = new THREE.Scene();

// create shape
const geomatry = new THREE.SphereGeometry(3, 70, 70);
const material = new THREE.MeshStandardMaterial({
  color: "#00ff83",
  roughness: 0.2,
  
})

const mesh = new THREE.Mesh(geomatry, material);
scene.add(mesh);

// view port sizes 
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

// setting up the light
const light = new THREE.PointLight(0xffffff, 250, 100);
light.position.set(0, 10, 10);

scene.add(light);


// creating a camera
const camera = new THREE.PerspectiveCamera(45, sizes.width/sizes.height, 0.1, 100);
camera.position.z = 16;
scene.add(camera);

// rendering the scene into html

const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(2);


// rendering camera and scene
renderer.render(scene, camera); 

// resize
window.addEventListener('resize', ()=>{

  // update window sizes
  sizes.width = window.innerWidth,
  sizes.height = window.innerHeight

  // update camera
  camera.updateProjectionMatrix();
  camera.aspect = sizes.width / sizes.height;
  renderer.setSize(sizes.width, sizes.height);
})



// controlling the sphere
const controll = new OrbitControls(camera, renderer.domElement);
controll.enableDamping = true;
controll.enablePan = false;
controll.enableZoom = false;
controll.autoRotate = true;
controll.autoRotateSpeed = 10;



//  re-render the whole canvas
function animate(){
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  controll.update();
}
animate();

// Timeline magic (animating our content)
const timeLine = gsap.timeline({defaults: {duration:1}});
timeLine.fromTo(mesh.scale, {z:0, x:0, y:0}, {z:1, x:1, y:1});
timeLine.fromTo('nav', {y: "-100%"}, {y: '0%'})
timeLine.fromTo('.title', {opacity: 0}, {opacity: 1});

// Mouse animation color
let mouseDown = false;
let rgb = [];
window.addEventListener('mousedown', ()=>{
  mouseDown = true
});
window.addEventListener('mouseup', ()=>{
  mouseDown = false
});

window.addEventListener('mousemove', (e)=>{
  if (mouseDown){
    rgb = [
      Math.round((e.pageX / sizes.width) * 255), Math.round((e.pageY / sizes.height) * 255), 150,
    ]

    // animate color
    let newColor = new THREE.Color(`rgb(${rgb.join(",")})`);
    gsap.to(mesh.material.color, {r: newColor.r, g: newColor.g, b: newColor.b});
  }
})