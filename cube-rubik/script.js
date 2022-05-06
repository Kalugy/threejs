
/*
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
*/

let camera, scene, renderer, mesh,mesh2,mesh3,mesh4;
const groupCubes = new THREE.Group()
const groupCubes2 = new THREE.Group()

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


    scene = new THREE.Scene();


    CreateInialCubes()
		
	/*	
    scene.add( mesh );
    scene.add( mesh2 );
    scene.add( mesh3 );
    scene.add( mesh4 );
    scene.add( mesh5 );
    scene.add( mesh6 );
    scene.add( mesh7 );
    scene.add( mesh8 );*/
    scene.add( groupCubes );
    scene.add( groupCubes2 );
    camera.lookAt(groupCubes.position)
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

var positionStates = [mesh,mesh2,mesh3,mesh4,5,6,7,8,9]

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
    
    // Alert the key name and key code on keydown
    //alert("Key"+name+ code)
  }, false);

const tick = () => {

    //update objects materials
    const elapseTime = clock.getElapsedTime()
    groupCubes2.rotation.x = 0.35 * elapseTime

    /*
    if(elapseTime<2){
        //1342
        mesh.position.set(positionStart.x,positionStart.y,positionStart.z)
        mesh2.position.set(positionStart2.x,positionStart2.y,positionStart2.z)
        mesh3.position.set(positionStart3.x,positionStart3.y,positionStart3.z)
        mesh4.position.set(positionStart4.x,positionStart4.y,positionStart4.z)
    }
    else if(elapseTime>2 && elapseTime<4){
        mesh.position.set(positionStart3.x,positionStart3.y,positionStart3.z)
        mesh2.position.set(positionStart.x,positionStart.y,positionStart.z)
        mesh3.position.set(positionStart4.x,positionStart4.y,positionStart4.z)
        mesh4.position.set(positionStart2.x,positionStart2.y,positionStart2.z)
    }
    else if(elapseTime>6 && elapseTime<8){
        mesh.position.set(positionStart4.x,positionStart4.y,positionStart4.z)
        mesh2.position.set(positionStart3.x,positionStart3.y,positionStart3.z)
        mesh3.position.set(positionStart2.x,positionStart2.y,positionStart2.z)
        mesh4.position.set(positionStart.x,positionStart.y,positionStart.z)
    } 
    else if(elapseTime>10 && elapseTime<12){
        mesh.position.set(positionStart2.x,positionStart2.y,positionStart2.z)
        mesh2.position.set(positionStart4.x,positionStart4.y,positionStart4.z)
        mesh3.position.set(positionStart.x,positionStart.y,positionStart.z)
        mesh4.position.set(positionStart3.x,positionStart3.y,positionStart3.z)
    } 
    else if(elapseTime>12 && elapseTime<14){
        mesh.position.set(positionStart.x,positionStart.y,positionStart.z)
        mesh2.position.set(positionStart2.x,positionStart2.y,positionStart2.z)
        mesh3.position.set(positionStart3.x,positionStart3.y,positionStart3.z)
        mesh4.position.set(positionStart4.x,positionStart4.y,positionStart4.z)
    }*/

    if(arrowUp){
        //1342 Rotation
        //const index = positionStates.findIndex(fruit => fruit.name === "Mesh1");
        //RotationOneSide(positionStates[index])
        RotationBackSide()
        //RotationOneSide(positionStates[0])
        //RotationOneSide(positionStates[1])
        //RotationOneSide(positionStates[2])
        //RotationOneSide(positionStates[3])
        //mesh2.position.set(positionStart.x,positionStart.y,positionStart.z)
        //mesh3.position.set(positionStart4.x,positionStart4.y,positionStart4.z)
        //mesh4.position.set(positionStart2.x,positionStart2.y,positionStart2.z)
        arrowUp=false
    }
    if(arrowDown){
        
        RotationOtherSide(positionStates[0])
        RotationOtherSide(positionStates[1])
        RotationOtherSide(positionStates[2])
        RotationOtherSide(positionStates[3])
        arrowDown=false
    }
    if(arrowRight){
        RotationUpSide(mesh2)
        RotationUpSide(mesh4)
        RotationUpSide(mesh6)
        RotationUpSide(mesh8)
        arrowRight=false
    }
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}
tick()

function RotationBackSide(){
    var moveUp = 3
    var positionStart = new THREE.Vector3(0,0,0)
    var positionStart2 = new THREE.Vector3(0,moveUp,0)
    var positionStart3 = new THREE.Vector3(moveUp,0,0)
    var positionStart4 = new THREE.Vector3(moveUp,moveUp,0)
    //1342 Rotation
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
    /*
    if(meshRelative.position.x==positionStart.x && meshRelative.position.y==positionStart.y){
        meshRelative.position.set(positionStart3.x,positionStart3.y,positionStart3.z)
        //TakeOut the last element
        let moveMesh = positionStates[2];
        //insert new element and last element to new Position
        positionStates[0]=moveMesh
        positionStates[1]=moveMesh
        positionStates[2]=meshRelative
        positionStates[3]=moveMesh
    }
    
    else if(meshRelative.position.x==positionStart2.x && meshRelative.position.y==positionStart2.y){
        meshRelative.position.set(positionStart.x,positionStart.y,positionStart.z)
        
        let moveMesh = positionStates[0];
        positionStates[0]=meshRelative
        positionStates[1]=moveMesh
    }
    else if(meshRelative.position.x==positionStart3.x && meshRelative.position.y==positionStart3.y){
        meshRelative.position.set(positionStart4.x,positionStart4.y,positionStart4.z)
        let moveMesh = positionStates[3];
        positionStates[3]=meshRelative
        positionStates[2]=moveMesh
    }
    else if(meshRelative.position.x==positionStart4.x && meshRelative.position.y==positionStart4.y){
        meshRelative.position.set(positionStart2.x,positionStart2.y,positionStart2.z)
        let moveMesh = positionStates[1];
        positionStates[1]=meshRelative
        positionStates[3]=moveMesh
    }
    */
}

function RotationUpSide(mesh){
    var moveUp = 3
    var positionStart2 = new THREE.Vector3(0,moveUp,0)
    var positionStart4 = new THREE.Vector3(moveUp,moveUp,0)
    var positionStart6 = new THREE.Vector3(0,moveUp,moveUp)
    var positionStart8 = new THREE.Vector3(moveUp,moveUp,moveUp)
    
    //2486
    if(mesh.position.x==positionStart2.x && mesh.position.y==positionStart2.y && mesh.position.z==positionStart2.z){
        mesh.position.set(positionStart4.x,positionStart4.y,positionStart4.z)
    }
    else if(mesh.position.x==positionStart4.x && mesh.position.y==positionStart4.y && mesh.position.z==positionStart4.z){
        mesh.position.set(positionStart8.x,positionStart8.y,positionStart8.z)
    }
    else if(mesh.position.x==positionStart8.x && mesh.position.y==positionStart8.y && mesh.position.z==positionStart8.z){
        mesh.position.set(positionStart6.x,positionStart6.y,positionStart6.z)
    }
    else if(mesh.position.x==positionStart6.x && mesh.position.y==positionStart6.y && mesh.position.z==positionStart6.z){
        mesh.position.set(positionStart2.x,positionStart2.y,positionStart2.z)
    }
    
}


function RotationOtherSide(mesh){
    var moveUp = 3
    var positionStart = new THREE.Vector3(0,0,0)
    var positionStart2 = new THREE.Vector3(0,moveUp,0)
    var positionStart3 = new THREE.Vector3(moveUp,0,0)
    var positionStart4 = new THREE.Vector3(moveUp,moveUp,0)
    //1342 Rotation
    if(mesh.position.x==positionStart.x && mesh.position.y==positionStart.y){
        mesh.position.set(positionStart2.x,positionStart2.y,positionStart2.z)
    }
    else if(mesh.position.x==positionStart2.x && mesh.position.y==positionStart2.y){
        mesh.position.set(positionStart4.x,positionStart4.y,positionStart4.z)
    }
    else if(mesh.position.x==positionStart3.x && mesh.position.y==positionStart3.y){
        mesh.position.set(positionStart.x,positionStart.y,positionStart.z)
    }
    else if(mesh.position.x==positionStart4.x && mesh.position.y==positionStart4.y){
        mesh.position.set(positionStart3.x,positionStart3.y,positionStart3.z)
    }
}

function CreateInialCubes(){
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
            case (counter<2):color.set( 0xff0000 );break;
            case (counter<4):color.set( 0x00ff00 );break;
            case (counter<6):color.set( 0x0000ff );break;
            case (counter<8):color.set( 0xffff00 );break;
            case (counter<10):color.set( 0xFF9900 );break;
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
    //Four
    const material1 = new THREE.MeshBasicMaterial( {color: 0xff0000} );
    const material2 = new THREE.MeshBasicMaterial( {color: 0xffffff} );
    const material3 = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
    const material4 = new THREE.MeshBasicMaterial( {color: 0x0000ff} );

    const material5 = new THREE.MeshBasicMaterial( {color: 0x00ffff} );
    const material6 = new THREE.MeshBasicMaterial( {color: 0xffff00} );


    mesh = new THREE.Mesh( geometry, material1 );
    mesh2 = new THREE.Mesh( geometry, material2 );
    mesh3 = new THREE.Mesh( geometry, material3 );
    mesh4 = new THREE.Mesh( geometry, material4 );
    mesh.name="Mesh1"
    mesh2.name="Mesh2"
    mesh3.name="Mesh3"
    mesh4.name="Mesh4"
    //Four
    mesh5 = new THREE.Mesh( geometry, material );
    mesh6 = new THREE.Mesh( geometry, material6 );
    mesh7 = new THREE.Mesh( geometry, material );
    mesh8 = new THREE.Mesh( geometry, material5 );
    mesh5.name="Mesh5"
    mesh6.name="Mesh6"
    mesh7.name="Mesh7"
    mesh8.name="Mesh8"
    const separation = 3
    mesh.position.set(0,0,0)
    mesh2.position.set(0,separation,0)
    mesh3.position.set(separation,0,0)
    mesh4.position.set(separation,separation,0)


    mesh5.position.set(0,0,separation)
    mesh6.position.set(0,separation,separation)
    mesh7.position.set(separation,0,separation)
    mesh8.position.set(separation,separation,separation)

    
    groupCubes.add(mesh)
    groupCubes.add(mesh2)
    groupCubes.add(mesh3)
    groupCubes.add(mesh4)
    //move up
    //groupCubes.add(mesh5)
    groupCubes.add(mesh6)
    //groupCubes.add(mesh7)
    groupCubes.add(mesh8)

    //groupCubesRight()

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
    groupCubes2.position.x=-7
    groupCubes2.position.y=2
}
