import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

import star from '../img/star.jpg';
import sunTexture from '../img/sun.jpg';
import mercuryTexture from '../img/mercury.jpg';
import venusTexture from '../img/venus.jpg';
import earthTexture from '../img/earth.jpg';
import marsTexture from '../img/mars.jpg';
import jupiterTexture from '../img/jupiter.jpg';
import saturnTexture from '../img/saturn.jpg';
import saturnRingTexture from '../img/saturn ring.png';
import uranusTexture from '../img/uranus.jpg';
import uranusRingTexture from '../img/uranus ring.png';
import neptuneTexture from '../img/neptune.jpg';
import plutoTexture from '../img/pluto.jpg';
import moonTexture from '../img/moon.jpg';
import { SphereGeometry } from 'three';


const size ={
    width : window.innerWidth,
    height: window.innerHeight
}
const renderer = new THREE.WebGL1Renderer();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, size.width/size.height, 0.1, 1000);
renderer.setSize(size.width, size.height);
const controller = new OrbitControls(camera ,renderer.domElement);

//lightning
const ambLight = new THREE.AmbientLight(0xffffff , 0.2);
scene.add(ambLight);

const pntLight = new THREE.PointLight(0xffffff, 2,300);
scene.add(pntLight);
//textureLoader
const loader = new THREE.TextureLoader();

/////////////////////////////////////////////////////////////////////////////////////////////////////////
scene.background = loader.load(star);

//sun
const sunGEO =  new THREE.SphereGeometry(19, 220, 120);
const sunMat = new THREE.MeshBasicMaterial({ map: loader.load(sunTexture)});
const sun = new THREE.Mesh(sunGEO,sunMat);
scene.add(sun);


const mercury = createPlanet(3.2, mercuryTexture , 28);
const venus = createPlanet(5.8,venusTexture,44);
const earth = createPlanet(6,earthTexture,62);
const mars = createPlanet(4,marsTexture,78);
const jupiter = createPlanet(12,jupiterTexture,100);;
const saturn = createPlanet(10,saturnTexture,138,{innerRadius:10 ,outerRadius:20 , texture: saturnRingTexture});;
const uranus = createPlanet(7,uranusTexture,176,{innerRadius:7 ,outerRadius:12, texture:uranusRingTexture});
const neptune = createPlanet(7,neptuneTexture,200);
const pluto = createPlanet(2.8, plutoTexture,216);

////////////////////////////////////////////////////////////////////////////////////////////////////////
camera.position.set(90,40,80);
controller.update();

//functions
function createPlanet(size , texture , position ,ring){
    const geo = new THREE.SphereGeometry(size , 120, 120);
    const mat = new THREE.MeshPhongMaterial({map: loader.load(texture)});
    const mesh = new THREE.Mesh(geo,mat);
    mesh.position.x = position;
    const obj = new THREE.Object3D();
    if(ring){
        
        const ringGeo = new THREE.RingGeometry(ring.innerRadius,ring.outerRadius,32);
        const ringMat = new THREE.MeshBasicMaterial({map : loader.load(ring.texture),side: THREE.DoubleSide});
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        obj.add(ringMesh);
        ringMesh.position.x = position ;
        ringMesh.rotation.x = -0.5 * Math.PI;
        
    }
    obj.add(mesh);
    scene.add(obj);
    
    return{mesh , obj};
}



//animate
animate();
function animate(){
    requestAnimationFrame(animate);
    //selfrotation
    sun.rotateY(0.004);
    mercury.mesh.rotateY(0.004);
    venus.mesh.rotateY(0.002);
    earth.mesh.rotateY(0.02);
   // moon.mesh.rotateY(0.001);
    mars.mesh.rotateY(0.018);
    jupiter.mesh.rotateY(0.04);
    saturn.mesh.rotateY(0.038);
    uranus.mesh.rotateY(0.03);
    neptune.mesh.rotateY(0.032);
    pluto.mesh.rotateY(0.008);
    //object rotate
    //earthObj.rotateY(0.2);
    mercury.obj.rotateY(0.04);
    venus.obj.rotateY(0.015);
    earth.obj.rotateY(0.01);
    mars.obj.rotateY(0.008);
    jupiter.obj.rotateY(0.002);
    saturn.obj.rotateY(0.0009);
    uranus.obj.rotateY(0.0004);
    neptune.obj.rotateY(0.0001);
    pluto.obj.rotateY(0.00007);
    renderer.render(scene,camera);
}
renderer.render(scene , camera);
document.body.appendChild(renderer.domElement);
