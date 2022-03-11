import './style.css'
import * as THREE from 'three' 
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import gsap from 'gsap'

//Scene
const scene = new THREE.Scene()

//Red cube
const groupCubes = new THREE.Group()
//groupCubes.position.set(0,1,0)
//groupCubes.scale.set(1,2,1)
//scene.add(groupCubes) 

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color: 0xff0000})
)
groupCubes.add(cube1)

cube1.position.set(0,2,0)
const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1,2,2,2),
    new THREE.MeshBasicMaterial({color: 0x00ff00, wireframe:true})
)
cube2.position.set(2,0,0)
groupCubes.add(cube2)
const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color: 0x0000ff}),
    
)
cube3.position.set(-2,0,0)
groupCubes.add(cube3)

//CREATE OWN TRIANGLES

const geomtry2 = new THREE.BufferGeometry()
const vertices = new Float32Array([
    0,0,0,
    0,1,0,
    1,0,0
])

geomtry2.setAttribute('position', new THREE.BufferAttribute(vertices,3))
const material2 = new THREE.MeshBasicMaterial({color:0xff0000, wireframe:true})
const mesh2 = new THREE.Mesh(geomtry2,material2)
scene.add(mesh2)



//amount triangles
/*
const count =50*100;
const newVertices = new Float32Array(count * 3 * 3)
for(let i=0; i < count;i++){
    newVertices[i]=(Math.random()-0.5)*4
}
const gemtry3 = new THREE.BufferGeometry()

gemtry3.setAttribute('position', new THREE.BufferAttribute(newVertices,3)) 
const material3 = new THREE.MeshBasicMaterial({color:0xff0000, wireframe:true})
const mesh3 = new THREE.Mesh(gemtry3,material3)
scene.add(mesh3)
*/

//mesh.position.normalize();
//console.log("test", mesh.position.length())
//AXISHELPER
const axisHelper = new THREE.AxesHelper(2)
//scene.add(axisHelper)

//Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
window.addEventListener('resize', () =>{
    
    console.log("resize")
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    //update camera aspect
    camera.aspect = sizes.width /sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width,sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
})
window.addEventListener('dblclick',()=>{
    //Safari
    const fullscreenElement = document.fullscreenElement|| document.webkitFullscreenElement;
    console.log("here",document.fullscreenElement)
    if(!fullscreenElement){
        if(canvas2.requestFullscreen){
            canvas2.requestFullscreen()
        }
        else{
            canvas2.webkitFullscreenElement()
        }
        
    }else{
        if(document.exitFullscreen()){
            document.exitFullscreen()
        }
        else{
            document.webkitExitFullscreen()
        }
        
    }
})

//Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.width,0.1,100)
/*const aspectRatio = sizes.width /sizes.height
const camera = new THREE.OrthographicCamera(
    -1 *aspectRatio,
     1 *aspectRatio, 
     1,-1
     ,0.1
     ,100)
*/
camera.position.z = 3;
scene.add(camera)

//CAMERA WITH CURSOR
const cursor = {
    x:0,
    y:0
}
window.addEventListener('mousemove',(event) =>{    

    
    cursor.x=event.clientX / sizes.width - 0.5
    cursor.y=-( event.clientY /sizes.height - 0.5)
})

 
//console.log("test", mesh.position.distanceTo(camera.position))

//render
const canvas2 = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({
    canvas: canvas2
})

//Controls
const controls = new OrbitControls(camera, canvas2)
controls.enableDamping = true

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
//Animations
//GSAP
//gsap.to(cube3.position, {duration:1,delay:2,x:2})
//gsap.to(cube2.position, {duration:2,delay:2,y:1})
//gsap.to(cube1.position, {duration:3,delay:2,z:1})
let counter2=0.1
const tick = () => {
    counter2= counter2+.01
    if(counter2<8){
        gsap.to(mesh2.rotation, {y:counter2})
        
    }
    else if(counter2>8 && counter2<12){
        gsap.to(mesh2.rotation, {x:counter2})
    }
    else if(counter2>12 && counter2<20){
        gsap.to(mesh2.rotation, {z:counter2})
    }
    else{
        counter2=0
    }
    console.log(counter2)
    controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}
tick()
