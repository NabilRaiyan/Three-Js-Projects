import * as THREE from 'three';
import {OrbitControls} from 'jsm/controls/OrbitControls.js';


// setting up the camera, scene and height and width of canvas
const w = window.innerWidth ;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer({antialias: true});

renderer.setSize(w, h);


document.body.appendChild(renderer.domElement);


const fov = 75;
const aspect = w/h;
const near = 0.1;
const far = 10;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

camera.position.z = 2;

const scene = new THREE.Scene();

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;

//  creating mesh and geometry object
const geomatry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial({
    color: 0xffff00,
    
});

const cube = new THREE.Mesh(geomatry, material);
scene.add(cube);

const wireMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true
})

const wireMesh = new THREE.Mesh(geomatry, wireMat);
wireMesh.scale.setScalar(1.001);
cube.add(wireMesh); // adding wire mesh as a child of mesh

const hemLight = new THREE.HemisphereLight(0x0097ff, 0xaa5500); // setting the lighting for the scene
scene.add(hemLight);

function animate(t = 0){
    requestAnimationFrame(animate);
    cube.rotation.y = t * 0.0001;
    renderer.render(scene, camera);
    controls.update();
}
animate();


