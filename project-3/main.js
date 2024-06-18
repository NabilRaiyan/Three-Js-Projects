import * as THREE from 'three';

// scene 
const scene = new THREE.Scene();

// create shape
const geomatry = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial({
  color: '#00ff83',
});

const mesh = new THREE.Mesh(geomatry, material);
scene.add(mesh);


// creating a camera