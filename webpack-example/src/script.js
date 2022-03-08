import './style.css'
import * as THREE from 'three' 

//Scene
const scene = new THREE.Scene()

//Red cube
const groupCubes = new THREE.Group()
groupCubes.position.set(0,1,0)
groupCubes.scale.set(1,2,1)
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
const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.width)
//camera.position.z = 6
//camera.position.x = 2
//camera.position.y = 0
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

renderer.render(scene, camera)


