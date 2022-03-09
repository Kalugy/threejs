import './style.css'
import * as THREE from 'three' 
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
    width:600,
    height: 600
}

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
camera.position.set(1,1,6)
scene.add(camera)

//camera.lookAt(new THREE.Vector3(3,0,0))
//camera.lookAt(mesh.position)

//console.log("test", mesh.position.distanceTo(camera.position))

//render
const canvas2 = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({
    canvas: canvas2
})

renderer.setSize(sizes.width, sizes.height)



//Animations


//GSAP
gsap.to(cube3.position, {duration:1,delay:2,x:2})
gsap.to(cube2.position, {duration:2,delay:2,y:1})
gsap.to(cube1.position, {duration:3,delay:2,z:1})


const tick = () => {
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}
tick()


//With Javascript Set up the time render independ the computer
/*
let time = Date.now();
const tick = () => {
    console.log("Tick")
    const currentTime = Date.now()
    const deltaTime = currentTime - time
    time = currentTime
    console.log(deltaTime)
    groupCubes.rotation.y += 0.001 * deltaTime
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}
tick()*/

//animation with Three js clock
/*
const clock = new THREE.Clock()
const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    console.log(elapsedTime)
    //groupCubes.rotation.y = elapsedTime 
    //groupCubes.position.y = Math.sin(elapsedTime) 
    //groupCubes.position.x = Math.cos(elapsedTime)

    camera.position.y = Math.sin(elapsedTime) 
    camera.position.x = Math.cos(elapsedTime)
    camera.lookAt(groupCubes.position)

    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}
tick()*/


