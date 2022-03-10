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
scene.add(groupCubes) 

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color: 0xff0000})
)
groupCubes.add(cube1)
const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color: 0x00ff00})
)
cube2.position.set(2,0,0)
groupCubes.add(cube2)
const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color: 0x0000ff}),
    
)
cube3.position.set(-2,0,0)
groupCubes.add(cube3)

//mesh.position.normalize();
//console.log("test", mesh.position.length())
//AXISHELPER
const axisHelper = new THREE.AxesHelper(2)
scene.add(axisHelper)

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
camera.position.z = 2;
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

const tick = () => {
    controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}
tick()
