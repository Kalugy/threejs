let camera, scene, renderer, mesh,mesh2,mesh3,mesh4;
const groupCubes = new THREE.Group()
const groupCubes2 = new THREE.Group()
const groupCubesOne = new THREE.Group()
const groupCubesThree = new THREE.Group()
const groupCubesRight = new THREE.Group()

init();
//animate();

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

function init() {
    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 100 );
    camera.position.z = 10;
    //camera.position.x = 5;
    //camera.position.y = 7;
    moveUp =2
    separation =2

    scene = new THREE.Scene();
    CreateInialCubes2x2()
    scene.add(groupCubesOne)
	scene.add( groupCubes );
    scene.add( groupCubes2 );
    scene.add( groupCubesThree );
    
    //camera.lookAt(groupCubes.position)
    //camera.rotation.x=1
    camera.position.z=10
    //camera.rotation.z=Math.PI
    camera.position.x=3
    camera.position.y=3
    
    console.log("groupCubes.position",groupCubes.position)
    var canvas2 = document.querySelector('.webgl')

    renderer = new THREE.WebGLRenderer({
        canvas: canvas2
    })
    //renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( window.innerWidth, window.innerHeight );
    //document.body.appendChild( renderer.domElement );

}

function animate() {

    requestAnimationFrame( animate );

    //mesh.rotation.x += 0.01;
    //mesh.rotation.y += 0.02;
    renderer.render( scene, camera );

}
const clock = new THREE.Clock()
//Controls

var arrowUp=false;
var arrowDown=false;
var arrowRight=false;
var arrowLeft=false;
var numberFour=false;
var numberSix=false;
var numberEight=false;
var numberFive=false;
var numberNine=false;
var numberThree=false;
var numberSeven=false;
var numberOne=false;


var positionStates = [mesh,mesh2,mesh3,mesh4,mesh5,mesh6,mesh7,mesh8]

var moveUp 
var separation 

document.addEventListener('keydown', (event) => {
    var name = event.key;
    var code = event.code;
    if(name=='ArrowDown'){
        arrowDown=true;
    }
    else if(name=='ArrowUp'){
        arrowUp=true;
    }
    else if(name=='ArrowRight'){
        arrowRight=true;
    }
    else if(name=='ArrowLeft'){
        arrowLeft=true;
    }
    else if(name=='4'){
        numberFour=true;
    }
    else if(name=='6'){
        numberSix=true;
    }
    else if(name=='8'){
        numberEight=true;
    }
    else if(name=='5'){
        numberFive=true;
    }
    else if(name=='9'){
        numberNine=true;
    }
    else if(name=='3'){
        numberThree=true;
    }
    else if(name=='7'){
        numberSeven=true;
    }
    else if(name=='1'){
        numberOne=true;
    }
    // Alert the key name and key code on keydown
    //alert("Key"+name+ code)
  }, false);

var movementArray=""
var a=0;
var counterMovementUpper=0
const tick = () => {
    //update objects materials
    const elapseTime = clock.getElapsedTime()
    groupCubes2.rotation.x = 0.35 * elapseTime
    groupCubesOne.rotation.x = 0.35 * elapseTime
    groupCubesThree.rotation.x = 0.35 * elapseTime
    if(arrowUp){
        //1342 Rotation
        
        RotationBackSideClock()
        
        movementArray=movementArray+"B"
        arrowUp=false
        console.log(movementArray)
    }
    if(arrowDown){
        
        RotationBackSideAntiClock()
        movementArray=movementArray+"B´"
        arrowDown=false
        console.log(movementArray)
    }
    if(arrowLeft){
        RotationUpSide()
        
        movementArray=movementArray+"U"
        arrowLeft=false
        console.log(movementArray)
    }
    if(arrowRight){
        RotationUpSideAntiClock()
        
        movementArray=movementArray+"U'"
        arrowRight=false
        console.log(movementArray)
    }
    if(numberFour){
        RotationDownSideClock()
     
        movementArray=movementArray+"D"
        numberFour=false
        console.log(movementArray)
    }
    if(numberSix){
        RotationDownSideAntiClock()
     
        movementArray=movementArray+"D'"
        numberSix=false
        console.log(movementArray)
    }
    if(numberEight){
        RotationFrontSideClock()
        
        movementArray=movementArray+"F"
        numberEight=false
        console.log(movementArray)
    }
    if(numberFive){
        RotationFrontSideAntiClock()
        
        movementArray=movementArray+"F'"
        numberFive=false
        console.log(movementArray)
    }
    if(numberNine){
        RotationLeftSideClock()
        movementArray=movementArray+"L"
        numberNine=false
        console.log(movementArray)
    }
    if(numberThree){
        RotationLeftSideAntiClock()
        movementArray=movementArray+"L'"
        numberThree=false
        console.log(movementArray)
    }
    if(numberSeven){
        RotationRightSideClock()
        movementArray=movementArray+"R"
        numberSeven=false
        console.log(movementArray)
    }
    if(numberOne){
        RotationRightSideAntiClock()
        movementArray=movementArray+"R'"
        numberOne=false
        console.log(movementArray)
        
    }
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}
tick()

//Rotations
var counterRotationsUpperSide = 0;
var counterRotationsBackSide = 0;
var counterRotationsDownSide = 0;
var counterRotationsInfrontSide = 0;
var counterRotationsLeftSide = 0;
var counterRotationsRightSide = 0;

//Right Faces
function RotationRightSideClock(){
    var positionStart = new THREE.Vector3(0,0,0)
    var positionStart2 = new THREE.Vector3(0,moveUp,0)
    var positionStart5 = new THREE.Vector3(0,0,moveUp)
    var positionStart6 = new THREE.Vector3(0,moveUp,moveUp)
    
    //2056
    let meshRelative=positionStates[0]
    let meshRelative1=positionStates[1]
    let meshRelative2=positionStates[4]
    let meshRelative3=positionStates[5]
    
    if(meshRelative.position.x==positionStart.x && meshRelative.position.y==positionStart.y){
        meshRelative.position.set(positionStart5.x,positionStart5.y,positionStart5.z)
        positionStates[4] = meshRelative
    }
    //Muevo la pieza posicion=3 mesh=cualquiera 
    if(meshRelative1.position.x==positionStart2.x && meshRelative1.position.y==positionStart2.y){
        meshRelative1.position.set(positionStart.x,positionStart.y,positionStart.z)
        positionStates[0] = meshRelative1
    }
    //Muevo la pieza posicion=5 mesh=cualquiera 
    if(meshRelative2.position.x==positionStart5.x && meshRelative2.position.y==positionStart5.y){
        meshRelative2.position.set(positionStart6.x,positionStart6.y,positionStart6.z)
        positionStates[5] = meshRelative2
    }
    //Muevo la pieza posicion=7 mesh=cualquiera 
    if(meshRelative3.position.x==positionStart6.x && meshRelative3.position.y==positionStart6.y){
        meshRelative3.position.set(positionStart2.x,positionStart2.y,positionStart2.z)
        positionStates[1] = meshRelative3
    }
    counterRotationsRightSide++
    meshRelative.rotation.x= 3/2*Math.PI * counterRotationsRightSide
    meshRelative1.rotation.x= 3/2*Math.PI * counterRotationsRightSide
    meshRelative2.rotation.x= 3/2*Math.PI * counterRotationsRightSide
    meshRelative3.rotation.x = 3/2*Math.PI * counterRotationsRightSide
    
}

function RotationRightSideAntiClock(){
    
    var positionStart = new THREE.Vector3(0,0,0)
    var positionStart2 = new THREE.Vector3(0,moveUp,0)
    var positionStart5 = new THREE.Vector3(0,0,moveUp)
    var positionStart6 = new THREE.Vector3(0,moveUp,moveUp)
    
    //5026
    let meshRelative=positionStates[0]
    let meshRelative1=positionStates[1]
    let meshRelative2=positionStates[4]
    let meshRelative3=positionStates[5]
    
    if(meshRelative.position.x==positionStart.x && meshRelative.position.y==positionStart.y){
        meshRelative.position.set(positionStart2.x,positionStart2.y,positionStart2.z)
        positionStates[1] = meshRelative
    }
    //Muevo la pieza posicion=3 mesh=cualquiera 
    if(meshRelative1.position.x==positionStart2.x && meshRelative1.position.y==positionStart2.y){
        meshRelative1.position.set(positionStart6.x,positionStart6.y,positionStart6.z)
        positionStates[5] = meshRelative1
    }
    //Muevo la pieza posicion=5 mesh=cualquiera 
    if(meshRelative2.position.x==positionStart5.x && meshRelative2.position.y==positionStart5.y){
        meshRelative2.position.set(positionStart.x,positionStart.y,positionStart.z)
        positionStates[0] = meshRelative2
    }
    //Muevo la pieza posicion=7 mesh=cualquiera 
    if(meshRelative3.position.x==positionStart6.x && meshRelative3.position.y==positionStart6.y){
        meshRelative3.position.set(positionStart5.x,positionStart5.y,positionStart5.z)
        positionStates[4] = meshRelative3
    }
    counterRotationsRightSide--
    let lastestLRotation=3/2*Math.PI * counterRotationsRightSide
    meshRelative.rotation.x= lastestLRotation;
    meshRelative1.rotation.x= lastestLRotation;
    meshRelative2.rotation.x= lastestLRotation;
    meshRelative3.rotation.x = lastestLRotation;
}


//Left Faces
function RotationLeftSideClock(){
    var positionStart3 = new THREE.Vector3(moveUp,0,0)
    var positionStart4 = new THREE.Vector3(moveUp,moveUp,0)
    var positionStart7 = new THREE.Vector3(moveUp,0,moveUp)
    var positionStart8 = new THREE.Vector3(moveUp,moveUp,moveUp)
    
    //4378
    let meshRelative=positionStates[2]
    let meshRelative1=positionStates[3]
    let meshRelative2=positionStates[6]
    let meshRelative3=positionStates[7]
    
    if(meshRelative.position.x==positionStart3.x && meshRelative.position.y==positionStart3.y){
        meshRelative.position.set(positionStart7.x,positionStart7.y,positionStart7.z)
        positionStates[6] = meshRelative
    }
    //Muevo la pieza posicion=3 mesh=cualquiera 
    if(meshRelative1.position.x==positionStart4.x && meshRelative1.position.y==positionStart4.y){
        meshRelative1.position.set(positionStart3.x,positionStart3.y,positionStart3.z)
        positionStates[2] = meshRelative1
    }
    //Muevo la pieza posicion=5 mesh=cualquiera 
    if(meshRelative2.position.x==positionStart7.x && meshRelative2.position.y==positionStart7.y){
        meshRelative2.position.set(positionStart8.x,positionStart8.y,positionStart8.z)
        positionStates[7] = meshRelative2
    }
    //Muevo la pieza posicion=7 mesh=cualquiera 
    if(meshRelative3.position.x==positionStart8.x && meshRelative3.position.y==positionStart8.y){
        meshRelative3.position.set(positionStart4.x,positionStart4.y,positionStart4.z)
        positionStates[3] = meshRelative3
    }
    counterRotationsLeftSide++
    meshRelative.rotation.x= 3/2*Math.PI * counterRotationsLeftSide
    meshRelative1.rotation.x= 3/2*Math.PI * counterRotationsLeftSide
    meshRelative2.rotation.x= 3/2*Math.PI * counterRotationsLeftSide
    meshRelative3.rotation.x = 3/2*Math.PI * counterRotationsLeftSide
    
}

function RotationLeftSideAntiClock(){
    var positionStart3 = new THREE.Vector3(moveUp,0,0)
    var positionStart4 = new THREE.Vector3(moveUp,moveUp,0)
    var positionStart7 = new THREE.Vector3(moveUp,0,moveUp)
    var positionStart8 = new THREE.Vector3(moveUp,moveUp,moveUp)
    
    //7348
    let meshRelative=positionStates[2]
    let meshRelative1=positionStates[3]
    let meshRelative2=positionStates[6]
    let meshRelative3=positionStates[7]
    
    if(meshRelative.position.x==positionStart3.x && meshRelative.position.y==positionStart3.y){
        meshRelative.position.set(positionStart4.x,positionStart4.y,positionStart4.z)
        positionStates[3] = meshRelative
    }
    //Muevo la pieza posicion=3 mesh=cualquiera 
    if(meshRelative1.position.x==positionStart4.x && meshRelative1.position.y==positionStart4.y){
        meshRelative1.position.set(positionStart8.x,positionStart8.y,positionStart8.z)
        positionStates[7] = meshRelative1
    }
    //Muevo la pieza posicion=5 mesh=cualquiera 
    if(meshRelative2.position.x==positionStart7.x && meshRelative2.position.y==positionStart7.y){
        meshRelative2.position.set(positionStart3.x,positionStart3.y,positionStart3.z)
        positionStates[2] = meshRelative2
    }
    //Muevo la pieza posicion=7 mesh=cualquiera 
    if(meshRelative3.position.x==positionStart8.x && meshRelative3.position.y==positionStart8.y){
        meshRelative3.position.set(positionStart7.x,positionStart7.y,positionStart7.z)
        positionStates[6] = meshRelative3
    }
    counterRotationsLeftSide--
    let lastestLRotation=3/2*Math.PI * counterRotationsLeftSide
    meshRelative.rotation.x= lastestLRotation;
    meshRelative1.rotation.x= lastestLRotation;
    meshRelative2.rotation.x= lastestLRotation;
    meshRelative3.rotation.x = lastestLRotation;
}

//Front Faces
function RotationFrontSideClock(){
    var positionStart5 = new THREE.Vector3(0,0,moveUp)
    var positionStart6 = new THREE.Vector3(0,moveUp,moveUp)
    var positionStart7 = new THREE.Vector3(moveUp,0,moveUp)
    var positionStart8 = new THREE.Vector3(moveUp,moveUp,moveUp)
    //6578
    let meshRelative=positionStates[4]
    let meshRelative1=positionStates[5]
    let meshRelative2=positionStates[6]
    let meshRelative3=positionStates[7]
    
    if(meshRelative.position.x==positionStart5.x && meshRelative.position.y==positionStart5.y){
        meshRelative.position.set(positionStart7.x,positionStart7.y,positionStart7.z)
        positionStates[6] = meshRelative
    }
    //Muevo la pieza posicion=3 mesh=cualquiera 
    if(meshRelative1.position.x==positionStart6.x && meshRelative1.position.y==positionStart6.y){
        meshRelative1.position.set(positionStart5.x,positionStart5.y,positionStart5.z)
        positionStates[4] = meshRelative1
    }
    //Muevo la pieza posicion=5 mesh=cualquiera 
    if(meshRelative2.position.x==positionStart7.x && meshRelative2.position.y==positionStart7.y){
        meshRelative2.position.set(positionStart8.x,positionStart8.y,positionStart8.z)
        positionStates[7] = meshRelative2
    }
    //Muevo la pieza posicion=7 mesh=cualquiera 
    if(meshRelative3.position.x==positionStart8.x && meshRelative3.position.y==positionStart8.y){
        meshRelative3.position.set(positionStart6.x,positionStart6.y,positionStart6.z)
        positionStates[5] = meshRelative3
    }
    
    counterRotationsInfrontSide--
    let lastestURotation=3/2*Math.PI *counterRotationsInfrontSide
    meshRelative.rotation.z= lastestURotation;
    meshRelative1.rotation.z= lastestURotation;
    meshRelative2.rotation.z= lastestURotation;
    meshRelative3.rotation.z = lastestURotation;
    
}

function RotationFrontSideAntiClock(){
    var positionStart5 = new THREE.Vector3(0,0,moveUp)
    var positionStart6 = new THREE.Vector3(0,moveUp,moveUp)
    var positionStart7 = new THREE.Vector3(moveUp,0,moveUp)
    var positionStart8 = new THREE.Vector3(moveUp,moveUp,moveUp)
    //6875
    let meshRelative=positionStates[4]
    let meshRelative1=positionStates[5]
    let meshRelative2=positionStates[6]
    let meshRelative3=positionStates[7]
    
    if(meshRelative.position.x==positionStart5.x && meshRelative.position.y==positionStart5.y){
        meshRelative.position.set(positionStart6.x,positionStart6.y,positionStart6.z)
        positionStates[5] = meshRelative
    }
    //Muevo la pieza posicion=3 mesh=cualquiera 
    if(meshRelative1.position.x==positionStart6.x && meshRelative1.position.y==positionStart6.y){
        meshRelative1.position.set(positionStart8.x,positionStart8.y,positionStart8.z)
        positionStates[7] = meshRelative1
    }
    //Muevo la pieza posicion=5 mesh=cualquiera 
    if(meshRelative2.position.x==positionStart7.x && meshRelative2.position.y==positionStart7.y){
        meshRelative2.position.set(positionStart5.x,positionStart5.y,positionStart5.z)
        positionStates[4] = meshRelative2
    }
    //Muevo la pieza posicion=7 mesh=cualquiera 
    if(meshRelative3.position.x==positionStart8.x && meshRelative3.position.y==positionStart8.y){
        meshRelative3.position.set(positionStart7.x,positionStart7.y,positionStart7.z)
        positionStates[6] = meshRelative3
    }
    counterRotationsInfrontSide++
    meshRelative.rotation.z= 3/2*Math.PI * counterRotationsInfrontSide
    meshRelative1.rotation.z= 3/2*Math.PI * counterRotationsInfrontSide
    meshRelative2.rotation.z= 3/2*Math.PI * counterRotationsInfrontSide
    meshRelative3.rotation.z = 3/2*Math.PI * counterRotationsInfrontSide
}

//Down Faces
function RotationDownSideClock(){
    var positionStart = new THREE.Vector3(0,0,0)
    var positionStart3 = new THREE.Vector3(moveUp,0,0)
    var positionStart5 = new THREE.Vector3(0,0,moveUp)
    var positionStart7 = new THREE.Vector3(moveUp,0,moveUp)
    //0375
    //Moving back side each mesh
    let meshRelative=positionStates[0]
    let meshRelative1=positionStates[2]
    let meshRelative2=positionStates[4]
    let meshRelative3=positionStates[6]
    //Muevo la pieza posicion=0 mesh=cualquiera
    
    if(meshRelative.position.x==positionStart.x && meshRelative.position.y==positionStart.y){
        meshRelative.position.set(positionStart3.x,positionStart3.y,positionStart3.z)
        positionStates[2] = meshRelative
    }
    //Muevo la pieza posicion=3 mesh=cualquiera 
    if(meshRelative1.position.x==positionStart3.x && meshRelative1.position.y==positionStart3.y){
        meshRelative1.position.set(positionStart7.x,positionStart7.y,positionStart7.z)
        positionStates[6] = meshRelative1
    }
    //Muevo la pieza posicion=5 mesh=cualquiera 
    if(meshRelative2.position.x==positionStart5.x && meshRelative2.position.y==positionStart5.y){
        meshRelative2.position.set(positionStart.x,positionStart.y,positionStart.z)
        positionStates[0] = meshRelative2
    }
    //Muevo la pieza posicion=7 mesh=cualquiera 
    if(meshRelative3.position.x==positionStart7.x && meshRelative3.position.y==positionStart7.y){
        meshRelative3.position.set(positionStart5.x,positionStart5.y,positionStart5.z)
        positionStates[4] = meshRelative3
    }
    counterRotationsDownSide--
    let lastestURotation=Math.PI/2*counterRotationsDownSide
    meshRelative.rotation.y= lastestURotation;
    meshRelative1.rotation.y= lastestURotation;
    meshRelative2.rotation.y= lastestURotation;
    meshRelative3.rotation.y = lastestURotation;



}

function RotationDownSideAntiClock(){
    var positionStart = new THREE.Vector3(0,0,0)
    var positionStart3 = new THREE.Vector3(moveUp,0,0)
    var positionStart5 = new THREE.Vector3(0,0,moveUp)
    var positionStart7 = new THREE.Vector3(moveUp,0,moveUp)
    //3570 rotation
  
    //Moving back side each mesh
    let meshRelative=positionStates[0]
    let meshRelative1=positionStates[2]
    let meshRelative2=positionStates[4]
    let meshRelative3=positionStates[6]
    
    if(meshRelative.position.x==positionStart.x && meshRelative.position.y==positionStart.y){
        meshRelative.position.set(positionStart5.x,positionStart5.y,positionStart5.z)
        positionStates[4] = meshRelative
    }
    //Muevo la pieza posicion=3 mesh=cualquiera 
    if(meshRelative1.position.x==positionStart3.x && meshRelative1.position.y==positionStart3.y){
        meshRelative1.position.set(positionStart.x,positionStart.y,positionStart.z)
        positionStates[0] = meshRelative1
    }
    //Muevo la pieza posicion=5 mesh=cualquiera 
    if(meshRelative2.position.x==positionStart5.x && meshRelative2.position.y==positionStart5.y){
        meshRelative2.position.set(positionStart7.x,positionStart7.y,positionStart7.z)
        positionStates[6] = meshRelative2
    }
    //Muevo la pieza posicion=7 mesh=cualquiera 
    if(meshRelative3.position.x==positionStart7.x && meshRelative3.position.y==positionStart7.y){
        meshRelative3.position.set(positionStart3.x,positionStart3.y,positionStart3.z)
        positionStates[2] = meshRelative3
    }

    counterRotationsDownSide++
    meshRelative.rotation.y= Math.PI/2 * counterRotationsDownSide
    meshRelative1.rotation.y= Math.PI/2 * counterRotationsDownSide
    meshRelative2.rotation.y= Math.PI/2 * counterRotationsDownSide
    meshRelative3.rotation.y = Math.PI/2 * counterRotationsDownSide
 
    
}

//BACK
function RotationBackSideClock(){
    var positionStart = new THREE.Vector3(0,0,0)
    var positionStart2 = new THREE.Vector3(0,moveUp,0)
    var positionStart3 = new THREE.Vector3(moveUp,0,0)
    var positionStart4 = new THREE.Vector3(moveUp,moveUp,0)
    //1243 Rotation
    //Moving back side each mesh
    meshRelative=positionStates[0]
    meshRelative1=positionStates[1]
    meshRelative2=positionStates[2]
    meshRelative3=positionStates[3]
    //Muevo la pieza posicion=0 mesh=cualquiera 
    if(meshRelative.position.x==positionStart.x && meshRelative.position.y==positionStart.y){
        meshRelative.position.set(positionStart3.x,positionStart3.y,positionStart3.z)
        positionStates[2] = meshRelative
    }
    //Muevo la pieza posicion=1 mesh=cualquiera 
    if(meshRelative1.position.x==positionStart2.x && meshRelative1.position.y==positionStart2.y){
        meshRelative1.position.set(positionStart.x,positionStart.y,positionStart.z)
        positionStates[0] = meshRelative1
    }
    //Muevo la pieza posicion=2 mesh=cualquiera 
    if(meshRelative2.position.x==positionStart3.x && meshRelative2.position.y==positionStart3.y){
        meshRelative2.position.set(positionStart4.x,positionStart4.y,positionStart4.z)
        positionStates[3] = meshRelative2
    }
    //Muevo la pieza posicion=3 mesh=cualquiera 
    if(meshRelative3.position.x==positionStart4.x && meshRelative3.position.y==positionStart4.y){
        meshRelative3.position.set(positionStart2.x,positionStart2.y,positionStart2.z)
        positionStates[1] = meshRelative3
        
    }

    counterRotationsBackSide--
    let lastest = 3/2*Math.PI * counterRotationsBackSide;

    meshRelative.rotation.z=lastest;
    meshRelative1.rotation.z= lastest;
    meshRelative2.rotation.z= lastest;
    meshRelative3.rotation.z =  lastest;


}

function RotationBackSideAntiClock(){
    var positionStart = new THREE.Vector3(0,0,0)
    var positionStart2 = new THREE.Vector3(0,moveUp,0)
    var positionStart3 = new THREE.Vector3(moveUp,0,0)
    var positionStart4 = new THREE.Vector3(moveUp,moveUp,0)
    //1342 Rotation
    //Moving back side each mesh
    let meshRelative=positionStates[0]
    let meshRelative1=positionStates[1]
    let meshRelative2=positionStates[2]
    let meshRelative3=positionStates[3]
    //Muevo la pieza posicion=0 mesh=cualquiera
    if(meshRelative.position.x==positionStart.x && meshRelative.position.y==positionStart.y){
        meshRelative.position.set(positionStart2.x,positionStart2.y,positionStart2.z)
        positionStates[1] = meshRelative
    }
    //Muevo la pieza posicion=1 mesh=cualquiera 
    if(meshRelative1.position.x==positionStart2.x && meshRelative1.position.y==positionStart2.y){
        meshRelative1.position.set(positionStart4.x,positionStart4.y,positionStart4.z)
        positionStates[3] = meshRelative1
    }
    //Muevo la pieza posicion=2 mesh=cualquiera 
    if(meshRelative2.position.x==positionStart3.x && meshRelative2.position.y==positionStart3.y){
        meshRelative2.position.set(0,0,0)
        positionStates[0] = meshRelative2

    }
    //Muevo la pieza posicion=3 mesh=cualquiera 
    if(meshRelative3.position.x==positionStart4.x && meshRelative3.position.y==positionStart4.y){
        meshRelative3.position.set(positionStart3.x,positionStart3.y,positionStart3.z)
        positionStates[2] = meshRelative3
    }


    counterRotationsBackSide++
    console.log("meshRelative.rotation.z",meshRelative.rotation.z)
    meshRelative.rotation.z= 3/2*Math.PI * counterRotationsBackSide;
    meshRelative1.rotation.z= 3/2*Math.PI * counterRotationsBackSide;
    meshRelative2.rotation.z= 3/2*Math.PI * counterRotationsBackSide;
    meshRelative3.rotation.z = 3/2*Math.PI * counterRotationsBackSide;

}



function RotationUpSide(){
    var positionStart2 = new THREE.Vector3(0,moveUp,0)
    var positionStart4 = new THREE.Vector3(moveUp,moveUp,0)
    var positionStart6 = new THREE.Vector3(0,moveUp,moveUp)
    var positionStart8 = new THREE.Vector3(moveUp,moveUp,moveUp)
    //Moving back side each mesh
    let meshRelative=positionStates[1]
    let meshRelative1=positionStates[3]
    let meshRelative2=positionStates[5]
    let meshRelative3=positionStates[7]
    //Muevo la pieza posicion=2 mesh=cualquiera

    if(meshRelative.position.x==positionStart2.x && meshRelative.position.y==positionStart2.y){
        meshRelative.position.set(positionStart4.x,positionStart4.y,positionStart4.z)
        positionStates[3] = meshRelative
    }
    //Muevo la pieza posicion=4 mesh=cualquiera 
    if(meshRelative1.position.x==positionStart4.x && meshRelative1.position.y==positionStart4.y){
        meshRelative1.position.set(positionStart8.x,positionStart8.y,positionStart8.z)
        positionStates[7] = meshRelative1
    }
    //Muevo la pieza posicion=6 mesh=cualquiera 
    if(meshRelative2.position.x==positionStart6.x && meshRelative2.position.y==positionStart6.y){
        meshRelative2.position.set(positionStart2.x,positionStart2.y,positionStart2.z)
        positionStates[1] = meshRelative2
    }
    //Muevo la pieza posicion=8 mesh=cualquiera 
    if(meshRelative3.position.x==positionStart8.x && meshRelative3.position.y==positionStart8.y){
        meshRelative3.position.set(positionStart6.x,positionStart6.y,positionStart6.z)
        positionStates[5] = meshRelative3
    }
    counterRotationsUpperSide--
    let lastestURotation=Math.PI/2*counterRotationsUpperSide
    
    meshRelative.rotation.y= lastestURotation;
    meshRelative1.rotation.y= lastestURotation;
    meshRelative2.rotation.y= lastestURotation;
    meshRelative3.rotation.y = lastestURotation;


}
function RotationUpSideAntiClock(){
    
    var positionStart2 = new THREE.Vector3(0,moveUp,0)
    var positionStart4 = new THREE.Vector3(moveUp,moveUp,0)
    var positionStart6 = new THREE.Vector3(0,moveUp,moveUp)
    var positionStart8 = new THREE.Vector3(moveUp,moveUp,moveUp)
    //2684 rotation
  
    //Moving back side each mesh
    let meshRelative=positionStates[1]
    let meshRelative1=positionStates[3]
    let meshRelative2=positionStates[5]
    let meshRelative3=positionStates[7]
    //Muevo la pieza posicion=2 mesh=cualquiera
    if(meshRelative.position.x==positionStart2.x && meshRelative.position.y==positionStart2.y){
        meshRelative.position.set(positionStart6.x,positionStart6.y,positionStart6.z)
        positionStates[5] = meshRelative
    }
    //Muevo la pieza posicion=4 mesh=cualquiera 
    if(meshRelative1.position.x==positionStart4.x && meshRelative1.position.y==positionStart4.y){
        meshRelative1.position.set(positionStart2.x,positionStart2.y,positionStart2.z)
        positionStates[1] = meshRelative1
    }
    //Muevo la pieza posicion=6 mesh=cualquiera 
    if(meshRelative2.position.x==positionStart6.x && meshRelative2.position.y==positionStart6.y){
        meshRelative2.position.set(positionStart8.x,positionStart8.y,positionStart8.z)
        positionStates[7] = meshRelative2
    }
    //Muevo la pieza posicion=8 mesh=cualquiera 
    if(meshRelative3.position.x==positionStart8.x && meshRelative3.position.y==positionStart8.y){
        meshRelative3.position.set(positionStart4.x,positionStart4.y,positionStart4.z)
        positionStates[3] = meshRelative3
    }
    counterRotationsUpperSide++
    meshRelative.rotation.y= Math.PI/2 * counterRotationsUpperSide
    meshRelative1.rotation.y= Math.PI/2 * counterRotationsUpperSide
    meshRelative2.rotation.y= Math.PI/2 * counterRotationsUpperSide
    meshRelative3.rotation.y = Math.PI/2 * counterRotationsUpperSide   


}


function CreateInialCubes2x2(){
    const geometry = new THREE.BoxGeometry( 1, 1, 1 ).toNonIndexed();
	// vertexColors must be true so vertex colors can be used in the shader
    const material = new THREE.MeshBasicMaterial( { vertexColors: true } ); 
    // generate color data for each vertex
    const positionAttribute = geometry.getAttribute( 'position' );
    const colors = [];
    const color = new THREE.Color();
    var counter=0
    for ( let i = 0; i < positionAttribute.count; i += 3 ) {
        //define Colors cube
        switch(true){
            case (counter<2):color.set( 0x0000ff );break;
            case (counter<4):color.set( 0x00ff00 );break;
            case (counter<6):color.set( 0xff0000 );break;
            case (counter<8):color.set( 0xFF9900 );break;
            case (counter<10):color.set( 0xffff00 );break;
            case (counter<12):color.set( 0xffffff );break;
            //default: color.set( 0xffffff );
        }
        counter++
        // define the same color for each vertex of a triangle
        colors.push( color.r, color.g, color.b );
        colors.push( color.r, color.g, color.b );
        colors.push( color.r, color.g, color.b );
    }
    // define the new attribute
    geometry.setAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );
    const material1 = new THREE.MeshBasicMaterial( {color: 0xff0000} );
    const material2 = new THREE.MeshBasicMaterial( {color: 0xffffff} );
    const material3 = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
    const material4 = new THREE.MeshBasicMaterial( {color: 0x0000ff} );
    const material5 = new THREE.MeshBasicMaterial( {color: 0x00ffff} );
    const material6 = new THREE.MeshBasicMaterial( {color: 0xffff00} );
    const material7 = new THREE.MeshBasicMaterial( {color: 0x0fAfff} );
    const material8 = new THREE.MeshBasicMaterial( {color: 0xffAff0} );
    
    //Four

    mesh0 = new THREE.Mesh( geometry, material );

    mesh = new THREE.Mesh( geometry, material );
    mesh2 = new THREE.Mesh( geometry, material );
    mesh3 = new THREE.Mesh( geometry, material );
    mesh4 = new THREE.Mesh( geometry, material );
    mesh.name="Mesh1"
    mesh2.name="Mesh2"
    mesh3.name="Mesh3"
    mesh4.name="Mesh4"
    //Four
    mesh5 = new THREE.Mesh( geometry, material );
    mesh6 = new THREE.Mesh( geometry, material );
    mesh7 = new THREE.Mesh( geometry, material );
    mesh8 = new THREE.Mesh( geometry, material );
    mesh5.name="Mesh5"
    mesh6.name="Mesh6"
    mesh7.name="Mesh7"
    mesh8.name="Mesh8"
    mesh.position.set(0,0,0)
    mesh2.position.set(0,separation,0)
    mesh3.position.set(separation,0,0)
    mesh4.position.set(separation,separation,0)
    mesh5.position.set(0,0,separation)
    mesh6.position.set(0,separation,separation)
    mesh7.position.set(separation,0,separation)
    mesh8.position.set(separation,separation,separation)

    mesh0.position.set(5,1,0)
    groupCubes.add(mesh0)
    groupCubes.add(mesh)
    groupCubes.add(mesh2)
    groupCubes.add(mesh3)
    groupCubes.add(mesh4)
    //move up
    groupCubes.add(mesh5)
    groupCubes.add(mesh6)
    groupCubes.add(mesh7)
    groupCubes.add(mesh8)
    
    //second cube
    mesh11 = new THREE.Mesh( geometry, material );
    mesh22 = new THREE.Mesh( geometry, material );
    mesh33 = new THREE.Mesh( geometry, material );
    mesh44 = new THREE.Mesh( geometry, material );
    //Four
    mesh55 = new THREE.Mesh( geometry, material );
    mesh66 = new THREE.Mesh( geometry, material );
    mesh77 = new THREE.Mesh( geometry, material );
    mesh88 = new THREE.Mesh( geometry, material );

    mesh22.position.set(0,1.1,0)
    mesh33.position.set(1.1,0,0)
    mesh44.position.set(1.1,1.1,0)

    mesh55.position.set(0,0,1.1)
    mesh66.position.set(0,1.1,1.1)
    mesh77.position.set(1.1,0,1.1)
    mesh88.position.set(1.1,1.1,1.1)

    groupCubes2.add(mesh11)
    groupCubes2.add(mesh22)
    groupCubes2.add(mesh33)
    groupCubes2.add(mesh44)
    groupCubes2.add(mesh55)
    groupCubes2.add(mesh66)
    groupCubes2.add(mesh77)
    groupCubes2.add(mesh88)
    groupCubes2.position.x=-2
    groupCubes2.position.z=-4
    groupCubes2.rotation.z=Math.PI/4;
    groupCubes2.position.y=8

    //One cube
    meshOne = new THREE.Mesh( geometry, material );
    groupCubesOne.add(meshOne)
    groupCubesOne.position.x=-6
    groupCubesOne.position.z=-4
    groupCubesOne.rotation.z=Math.PI/4;
    groupCubesOne.position.y=8

    //Third cube
    mesh111 = new THREE.Mesh( geometry, material );
    mesh222 = new THREE.Mesh( geometry, material );
    mesh333 = new THREE.Mesh( geometry, material );
    //three
    mesh444 = new THREE.Mesh( geometry, material );
    mesh555 = new THREE.Mesh( geometry, material );
    mesh666 = new THREE.Mesh( geometry, material );
    //three
    mesh777 = new THREE.Mesh( geometry, material );
    mesh888 = new THREE.Mesh( geometry, material );
    mesh999 = new THREE.Mesh( geometry, material );
    //SecondFloor
    mesh1111 = new THREE.Mesh( geometry, material );
    mesh2222 = new THREE.Mesh( geometry, material );
    mesh3333 = new THREE.Mesh( geometry, material );
    //three
    mesh4444 = new THREE.Mesh( geometry, material );
    mesh5555 = new THREE.Mesh( geometry, material );
    mesh6666 = new THREE.Mesh( geometry, material );
    //three
    mesh7777 = new THREE.Mesh( geometry, material );
    mesh8888 = new THREE.Mesh( geometry, material );
    mesh9999 = new THREE.Mesh( geometry, material );
    //ThirdFloor
    mesh11111 = new THREE.Mesh( geometry, material );
    mesh22222 = new THREE.Mesh( geometry, material );
    mesh33333 = new THREE.Mesh( geometry, material );
    //three
    mesh44444 = new THREE.Mesh( geometry, material );
    mesh55555 = new THREE.Mesh( geometry, material );
    mesh66666 = new THREE.Mesh( geometry, material );
    //three
    mesh77777 = new THREE.Mesh( geometry, material );
    mesh88888 = new THREE.Mesh( geometry, material );
    mesh99999 = new THREE.Mesh( geometry, material );


    let separationCubeThree=0.1
    let separationCubeThree2=0.2
    mesh111.position.set(0,0,0)
    mesh222.position.set(1+separationCubeThree,0,0)
    mesh333.position.set(2+separationCubeThree2,0,0)
    mesh444.position.set(0,1+separationCubeThree,0)
    mesh555.position.set(0,2+separationCubeThree2,0)
    mesh666.position.set(1+separationCubeThree,1+separationCubeThree,0)
    mesh777.position.set(1+separationCubeThree,2+separationCubeThree2,0)
    mesh888.position.set(2+separationCubeThree2,1+separationCubeThree,0)
    mesh999.position.set(2+separationCubeThree2,2+separationCubeThree2,0)

    mesh1111.position.set(0,0,1+separationCubeThree)
    mesh2222.position.set(1+separationCubeThree,0,1+separationCubeThree)
    mesh3333.position.set(2+separationCubeThree2,0,1+separationCubeThree)
    mesh4444.position.set(0,1+separationCubeThree,1+separationCubeThree)
    mesh5555.position.set(0,2+separationCubeThree2,1+separationCubeThree)
    mesh6666.position.set(1+separationCubeThree,1+separationCubeThree,1+separationCubeThree)
    mesh7777.position.set(1+separationCubeThree,2+separationCubeThree2,1+separationCubeThree)
    mesh8888.position.set(2+separationCubeThree2,1+separationCubeThree,1+separationCubeThree)
    mesh9999.position.set(2+separationCubeThree2,2+separationCubeThree2,1+separationCubeThree)

    mesh11111.position.set(0,0,2+separationCubeThree2)
    mesh22222.position.set(1+separationCubeThree,0,2+separationCubeThree2)
    mesh33333.position.set(2+separationCubeThree2,0,2+separationCubeThree2)
    mesh44444.position.set(0,1+separationCubeThree,2+separationCubeThree2)
    mesh55555.position.set(0,2+separationCubeThree2,2+separationCubeThree2)
    mesh66666.position.set(1+separationCubeThree,1+separationCubeThree,2+separationCubeThree2)
    mesh77777.position.set(1+separationCubeThree,2+separationCubeThree2,2+separationCubeThree2)
    mesh88888.position.set(2+separationCubeThree2,1+separationCubeThree,2+separationCubeThree2)
    mesh99999.position.set(2+separationCubeThree2,2+separationCubeThree2,2+separationCubeThree2)

    groupCubesThree.add(mesh111)
    groupCubesThree.add(mesh222)
    groupCubesThree.add(mesh333)
    groupCubesThree.add(mesh444)
    groupCubesThree.add(mesh555)
    groupCubesThree.add(mesh666)
    groupCubesThree.add(mesh777)
    groupCubesThree.add(mesh888)
    groupCubesThree.add(mesh999)
    groupCubesThree.add(mesh1111)
    groupCubesThree.add(mesh2222)
    groupCubesThree.add(mesh3333)
    groupCubesThree.add(mesh4444)
    groupCubesThree.add(mesh5555)
    groupCubesThree.add(mesh6666)
    groupCubesThree.add(mesh7777)
    groupCubesThree.add(mesh8888)
    groupCubesThree.add(mesh9999)
    groupCubesThree.add(mesh11111)
    groupCubesThree.add(mesh22222)
    groupCubesThree.add(mesh33333)
    groupCubesThree.add(mesh44444)
    groupCubesThree.add(mesh55555)
    groupCubesThree.add(mesh66666)
    groupCubesThree.add(mesh77777)
    groupCubesThree.add(mesh88888)
    groupCubesThree.add(mesh99999)
    groupCubesThree.position.x=4
    groupCubesThree.position.z=-4
    groupCubesThree.rotation.z=Math.PI/4;
    groupCubesThree.position.y=8
}
