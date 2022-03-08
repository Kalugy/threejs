import './style.css'
import * as THREE from 'three' 

//Scene
const scene = new THREE.Scene()

//Red cube
const geometry = new THREE.BoxGeometry(1,1,1)
const material = new THREE.MeshBasicMaterial({color:0xff0000})
const mesh = new THREE.Mesh(geometry, material)
//mesh.position.x=0.7
//mesh.position.y=-0.6
//mesh.position.z=1
mesh.position.set(0.7,-0.6,1)
mesh.scale.set(2,0.5,0.5)

//mesh.rotation.reorder('YXZ')
mesh.rotation.set(0.5,0.5,0)
scene.add(mesh)

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
const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.width)
//camera.position.z = 6
//camera.position.x = 2
//camera.position.y = 0
camera.position.set(1,1,6)
scene.add(camera)

//camera.lookAt(new THREE.Vector3(3,0,0))
camera.lookAt(mesh.position)

//console.log("test", mesh.position.distanceTo(camera.position))

//render
const canvas2 = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({
    canvas: canvas2
})

renderer.setSize(sizes.width, sizes.height)

renderer.render(scene, camera)


