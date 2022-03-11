
//Scene
const scene = new THREE.Scene()

//Red cube
const geometry = new THREE.BoxGeometry(1,1,1)
const material = new THREE.MeshBasicMaterial({color:0xff0000})
const mesh = new THREE.Mesh(geometry, material)
mesh.position.x=1;
scene.add(mesh)

//Sizes
const sizes = {
    width:800,
    height: 600
}

//Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.width)
camera.position.z = 10
camera.position.x = 3
camera.position.y = 3
scene.add(camera)

//render
const canvas2 = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({
    canvas: canvas2
})

renderer.setSize(sizes.width, sizes.height)

renderer.render(scene, camera)


