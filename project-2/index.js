import * as THREE from 'three';
import {OrbitControls} from 'jsm/controls/OrbitControls.js';
import getStarfield from "./src/getStarfield.js";
import {getFresnelMat} from "./src/getFresnelMat.js";

// setting up the camera, scene and height and width of canvas
const w = window.innerWidth ;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer({antialias: true});

renderer.setSize(w, h);


document.body.appendChild(renderer.domElement);


const fov = 75;
const aspect = w/h;
const near = 0.1;
const far = 1000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

camera.position.z = 2;

const scene = new THREE.Scene();



const earthGroup = new THREE.Group();
earthGroup.rotation.z = -23.4 * Math.PI / 180;
scene.add(earthGroup);
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;


const detail = 12;
//  creating mesh and geometry object
const loader = new THREE.TextureLoader(); // creating texture loader
const geomatry = new THREE.IcosahedronGeometry(1, detail);
const material = new THREE.MeshStandardMaterial({
    map: loader.load("./textures/00_earthmap1k.jpg"),
    
});

const earthMesh = new THREE.Mesh(geomatry, material);
earthGroup.add(earthMesh);

// making star 
const stars = getStarfield({numStars: 1000});
scene.add(stars);


// adding light 
const lightMat = new THREE.MeshBasicMaterial({
    map: loader.load("./textures/03_earthlights1k.jpg"),
    blending: THREE.AdditiveBlending
});

const lightsMesh = new THREE.Mesh(geomatry, lightMat);
earthGroup.add(lightsMesh);

// cloude mat
const cloudeMat = new THREE.MeshStandardMaterial({
    map: loader.load("./textures/05_earthcloudmaptrans.jpg"),
    blending: THREE.AdditiveBlending

})


const cloudeMesh = new THREE.Mesh(geomatry, cloudeMat);
cloudeMesh.scale.setScalar(cloudeMesh);
earthGroup.add(cloudeMesh);

// get freshnel mat
const fresnelMat = getFresnelMat();
const glowMesh = new THREE.Mesh(geomatry, fresnelMat);
earthGroup.add(glowMesh);

// adding sunlight
const sunLight = new THREE.DirectionalLight(0xffffff);
sunLight.position.set(-2, -0.5, 1.5);
scene.add(sunLight);



function animate(){
    requestAnimationFrame(animate);
    earthMesh.rotation.y += 0.002;
    lightsMesh.rotation.y += 0.002;
    cloudeMesh.rotation.y += 0.002;
    glowMesh.rotation.y += 0.002;
    

    renderer.render(scene, camera);
    controls.update();
}
animate();


