import './style.css'
import * as THREE from 'three' 
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import gsap from 'gsap'
import * as dat from 'lil-gui'
import {imageSource} from './door.jpg'
import { Clock, MeshPhongMaterial } from 'three'

//*****Debug
const gui = new dat.GUI({closed: true})
window.addEventListener('keydown',(event)=>{
    if(event.key === 'h'){
        if(gui._hidden)
            gui.show()
        else    
            gui.hide()
    }
})

//******Scene
const scene = new THREE.Scene()



/****Textures */
/* //One Way Javascript
const image = new Image()
const texture = new THREE.Texture(image)



image.onload = () => {
    texture.needsUpdate = true
}
image.src = '/textures/door/color.jpg'

const cubex = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({map: texture})
)
scene.add(cubex)
*/
const loadingManager = new THREE.LoadingManager()

loadingManager.onStart = () =>{
    console.log("Start")
}

loadingManager.onLoad = () =>{
    console.log("load")
}
loadingManager.onProgress = () =>{
    console.log("Progress")
}

loadingManager.onError = () =>{
    console.log("Error")
}

const textureLoader = new THREE.TextureLoader(loadingManager)
const alphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const ambientTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const colorTexture = textureLoader.load('/textures/door/color.jpg')
const heightTexture = textureLoader.load('/textures/door/height.jpg')
const metalTexture = textureLoader.load('/textures/door/metalness.jpg')
const normalTexture = textureLoader.load('/textures/door/normal.jpg')
const roughnessTexture = textureLoader.load('/textures/door/roughness.jpg')

const checkTexture = textureLoader.load('/textures/checkerboard-1024x1024.png')
const check2Texture = textureLoader.load('/textures/checkerboard-8x8.png')

//material
const matcapTexture = textureLoader.load('/textures/matcaps/1.png')

const gradientTexture = textureLoader.load('/textures/gradients/3.jpg')


/*
colorTexture.repeat.x = 2
colorTexture.repeat.y = 3
colorTexture.wrapS = THREE.MirroredRepeatWrapping
colorTexture.wrapT = THREE.MirroredRepeatWrapping
colorTexture.offset.x = 0.5
colorTexture.rotation = Math.PI / 4
colorTexture.center.x = 0.5
colorTexture.center.y = 0.5
*/

//colorTexture.minFilter = THREE.NearestFilter 

//check2Texture.magFilter = THREE.NearestFilter 


//Using library THREE js
/*const textureLoader = new THREE.TextureLoader()
const texture = textureLoader.load(
    '/textures/door/color.jpg',
    ()=>{
        console.log("load")   
    },
    ()=>{
        console.log("progress")
    },
    ()=>{
        console.log("error")
    }
    )
*/
/*const cubex = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({map: check2Texture})
)
scene.add(cubex)
*/

/*******Materials */

//const material1 = new THREE.MeshBasicMaterial()
//material1.map = colorTexture
//material1.color.set('#ff0000')
//material1.color = new THREE.Color('#f00')
//material1.wireframe = false
//material1.opacity = 0.5
//material1.transparent = true
//material1.alphaMap = alphaTexture
//material1.side = THREE.DoubleSide

//const material1 = new THREE.MeshNormalMaterial()
//material1.flatShading = true

//const material1 = new THREE.MeshMatcapMaterial()
//material1.matcap = matcapTexture

//const material1 = new THREE.MeshDepthMaterial()

//const material1 = new THREE.MeshLambertMaterial()
//const material1 = new THREE.MeshPhongMaterial()
//material1.shininess = 100
//material1 .specular = new THREE.Color(0xff00ff)

//const material1 = new THREE.MeshToonMaterial()
//material1.gradientMap= gradientTexture
const material1 =new THREE.MeshStandardMaterial()

/*
const material1 =new THREE.MeshStandardMaterial()
//material1.metalness = 0.45
//material1.roughness = 0.05
material1.map = colorTexture
material1.aoMap = ambientTexture
material1.aoMapIntensity = 1
material1.displacementMap = heightTexture
material1.displacementScale = .1
material1.metalnessMap = metalTexture
material1.roughnessMap = roughnessTexture
material1.normalMap = normalTexture
material1.alphaMap = alphaTexture
material1.transparent = true
//material1.normalScale.set(0.5,0.5)
//DEBUG
gui.add(material1,'metalness').min(0).max(1).step(0.0001)
gui.add(material1,'roughness').min(0).max(1).step(0.0001)
gui.add(material1,'aoMapIntensity').min(0).max(10).step(0.0001)
gui.add(material1,'displacementScale').min(0).max(1).step(0.0001)
*/

/**Environment */
const material2 =new THREE.MeshStandardMaterial()
material2.metalness = 1
material2.roughness = 0
const cubeLoaderEnvironment = new THREE.CubeTextureLoader()

const environment = cubeLoaderEnvironment.load([
    '/textures/environmentMaps/0/px.jpg',
    '/textures/environmentMaps/0/nx.jpg',
    '/textures/environmentMaps/0/py.jpg',
    '/textures/environmentMaps/0/ny.jpg',
    '/textures/environmentMaps/0/pz.jpg',
    '/textures/environmentMaps/0/nz.jpg'
]) 
material2.envMap = environment
//DEBUG
gui.add(material2,'metalness').min(0).max(1).step(0.0001)
gui.add(material2,'roughness').min(0).max(1).step(0.0001)


//scene.add(environment)

//***Lights
const ambientLight = new THREE.AmbientLight(0xffffff,0.5)
scene.add(ambientLight)
const pointLight = new THREE.PointLight(0xffffff, 0.5)
pointLight.position.x= 2
pointLight.position.y= 2
pointLight.position.z= 2
scene.add(pointLight)

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5,64,64),
    material2
)
sphere.position.x = -1.5

sphere.geometry.setAttribute('uv2', new THREE.BufferAttribute(sphere.geometry.attributes.uv.array,2))

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1,1,100,100),
    material1
)
plane.geometry.setAttribute('uv2', new THREE.BufferAttribute(plane.geometry.attributes.uv.array,2))

const thorus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3,0.2,64,128),
    material1
)
thorus.position.x=1.5

thorus.geometry.setAttribute('uv2', new THREE.BufferAttribute(thorus.geometry.attributes.uv.array,2))

scene.add(sphere,plane, thorus)




//Red cube
const groupCubes = new THREE.Group()
//groupCubes.position.set(0,1,0)
//groupCubes.scale.set(1,2,1)
//scene.add(groupCubes) 


const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color: 0x00ff00})
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

//CREATE OWN TRIANGLES USING BUFFER GEOMETRY
/*
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

//Debug
gui.add(mesh2.position, 'y', -2, 2,0.01)
gui.add(mesh2.position, 'x').min(-2)
                            .max(-2)
                            .step(0.01)
                            .name('elevation X')
gui.add(mesh2.position, 'z', -2, 2,0.01)
gui.add(mesh2, 'visible')
gui.add(material2, 'wireframe')
const colordebug = {
    color: 0xff00ff,
    spin: () => {
        gsap.to(mesh2.rotation, {duration:1,y:mesh2.rotation.y+10})
    }
}
gui.addColor(colordebug, 'color')
   .onChange(()=>{
       material2.color.set(colordebug.color)

    })
gui.add(colordebug,'spin')
*/

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

const clock = new THREE.Clock()
const tick = () => {
    controls.update()

    //update objects materials
    const elapseTime = clock.getElapsedTime()
    sphere.rotation.y = 0.1 * elapseTime 
    plane.rotation.y = 0.1 * elapseTime
    thorus.rotation.y = 0.1 * elapseTime
    sphere.rotation.x = 0.15 * elapseTime 
    plane.rotation.x = 0.15 * elapseTime
    thorus.rotation.x = 0.15 * elapseTime


    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}
tick()
