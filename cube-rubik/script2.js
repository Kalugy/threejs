//TODO
//Refactor the code x
//understand the code x
//see if this is posible on click the cube render the cube who click x
//move screen to debug the movements x
//make the 1D cube movement x
//make the 2d cube movement
//put text to show instructions
//better UI


let camera, scene, renderer, mesh, mesh2, mesh3, mesh4;
let mesh00, mesh11, mesh22, mesh33, mesh44, mesh55, mesh66, mesh77;
let lmesh00, lmesh11, lmesh22, lmesh33, lmesh44, lmesh55, lmesh66, lmesh77;

var positionStates = []
const groupCubes = new THREE.Group()
const groupCubes2 = new THREE.Group()
const groupCubesOne = new THREE.Group()
const groupCubesThree = new THREE.Group()
const groupCubesRight = new THREE.Group()
const groupCubeRender = new THREE.Group()
const groupCubeRender2 = new THREE.Group()
const arrowR = new THREE.ArrowHelper(new THREE.Vector3(1, 0, 0), new THREE.Vector3(2, 0, 0), 2, 0xFF0000);
const arrowL = new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 2, 0), 2, 0xFF0000);
const arrowU = new THREE.ArrowHelper(new THREE.Vector3(0, -1, 0), new THREE.Vector3(0, -2, 0), 2, 0xFF0000);
const arrowD = new THREE.ArrowHelper(new THREE.Vector3(-1, 0, 0), new THREE.Vector3(-2, 0, 0), 2, 0xFF0000);
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const clock = new THREE.Clock()

var moveUp 
var separation 
var movementArray=""
var a=0;
var counterMovementUpper=0

const yellowMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });

const yellowPointGeometry = new THREE.SphereGeometry(0.1, 32, 32);
const yellowPoint = new THREE.Mesh(yellowPointGeometry, yellowMaterial);
const yellowPoint2 = new THREE.Mesh(yellowPointGeometry, yellowMaterial);

camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 100 );
camera.position.z = 10;
scene = new THREE.Scene();
moveUp = 1.1
separation = 2
Create1x1Cube()
Create2x2Cube()
RenderCubeClicked()
RenderCubeClicked2()
scene.add( groupCubesOne )
//scene.add( groupCubes );
scene.add( groupCubes2 );
scene.add( groupCubeRender );
scene.add( groupCubeRender2 );
scene.add(arrowR);
scene.add(arrowL);
scene.add(arrowU);
scene.add(arrowD);
groupCubeRender.visible = false
groupCubeRender2.visible = false



yellowPoint2.position.x = 1;
scene.add(yellowPoint);
scene.add(yellowPoint2);

camera.lookAt(yellowPoint.position)

camera.position.z=10
camera.position.x=3
camera.position.y=3

var canvas2 = document.querySelector('.webgl')

renderer = new THREE.WebGLRenderer({
    canvas: canvas2
})
//renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setSize( window.innerWidth, window.innerHeight );
//document.body.appendChild( renderer.domElement );

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

window.addEventListener('mousedown', onMouseDown, false);

function onMouseDown(event) {
    // Calculate mouse coordinates in normalized device space (-1 to 1)
    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Raycasting
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);
   
    // Check for intersections
    const intersects2 = raycaster.intersectObjects(groupCubesOne.children, true);
    const intersectsGroup2 = raycaster.intersectObjects(groupCubes2.children, true);

    // If there is an intersection, toggle the visibility of the group
    if (intersects2.length > 0) {
        toggleGroupVisibility(groupCubeRender, groupCubeRender2);
        setActiveCube(groupCubeRender);
        groupCubeRender.rotation.set(0, 0, 0);
    } else if (intersectsGroup2.length > 0) {
        toggleGroupVisibility(groupCubeRender2, groupCubeRender);
        setActiveCube(groupCubeRender2);
        groupCubeRender2.rotation.set(0, 0, 0);
    } 
}

function toggleGroupVisibility(group, group2) {
    group.visible = !group.visible;
    group2.visible = false;
    // Additional logic if needed
    if (group.visible) {
        console.log('Group is now visible');
    } else {
        console.log('Group is now hidden');
    }
}

// Handle key events for camera movement
const keyState = {
    W: false,
    A: false,
    S: false,
    D: false,
    Q: false,
    E: false,
    SPACE: false,
    Zero: false,
    One: false,
    Two: false,
    Three: false,
    Four: false,
    Five: false,
    Six: false,
    Seven: false,
    Eigth: false
};

window.addEventListener('keydown', (event) => {
    handleKey(event.code, true);
});

window.addEventListener('keyup', (event) => {
    handleKey(event.code, false);
});

function handleKey(keyCode, isPressed) {
    switch (keyCode) {
        case 'KeyW':
            keyState.W = isPressed;
            break;
        case 'KeyA':
            keyState.A = isPressed;
            break;
        case 'KeyS':
            keyState.S = isPressed;
            break;
        case 'KeyD':
            keyState.D = isPressed;
            break;
        case 'KeyQ':
            keyState.Q = isPressed;
            break;
        case 'KeyE':
            keyState.E = isPressed;
            break;
        case 'Digit0':
            keyState.Zero = isPressed;
            break;
        case 'Digit1':
            keyState.One = isPressed;
            break;
        case 'Digit2':
            keyState.Two = isPressed;
            break;
        case 'Digit3':
            keyState.Three = isPressed;
            break;
        case 'Digit4':
            keyState.Four = isPressed;
            break;
        case 'Digit5':
            keyState.Five = isPressed;
            break;
        case 'Digit6':
            keyState.Six = isPressed;
            break;
        case 'Digit7':
            keyState.Seven = isPressed;
            break;
        case 'Digit8':
            keyState.Eigth = isPressed;
            break;
    }
}


// Animation parameters
const speed = 1;
const rotationSpeed = 0.2;
const delta = 0.1;
const euler = new THREE.Euler(0, 0, 0, 'XYZ');
const radius = 10;
let phiSpeed = 0.2;
let thetaSpeed = 0.2;
const zoomSpeed = 1;


const tick = () => {
    const elapseTime = clock.getElapsedTime()
    groupCubes2.rotation.x = 0.35 * elapseTime
    groupCubesOne.rotation.x = 0.35 * elapseTime
    groupCubesThree.rotation.x = 0.35 * elapseTime
    
    if (keyState.W || keyState.S) {
        const phiDelta = phiSpeed * delta * (keyState.W ? -1 : 1);

        const spherical = new THREE.Spherical().setFromVector3(camera.position);
        spherical.phi = Math.max(0.1, Math.min(Math.PI - 0.1, spherical.phi + phiDelta));

        camera.position.setFromSpherical(spherical);
    }
    if (keyState.A || keyState.D) {
        let thetaDelta = thetaSpeed * delta;

        if (keyState.A) thetaDelta *= -1; // Reverse direction for A

        let spherical = new THREE.Spherical().setFromVector3(camera.position);
        spherical.theta += thetaDelta;

        camera.position.setFromSpherical(spherical);
        camera.lookAt(0, 0, 0);
    }

    if (keyState.Q || keyState.E) {
        const zoomDelta = zoomSpeed * delta * (keyState.Q ? -1 : 1);

        camera.position.z = Math.max(2, camera.position.z + zoomDelta);
        
    }

    if (keyState.Zero) {
        toggleMeshVisibility([0]);
    }
    if (keyState.One) {
        toggleMeshVisibility([1]);
    }
    if (keyState.Two) {
        toggleMeshVisibility([2]);
    }
    if (keyState.Three) {
        toggleMeshVisibility([3]);
    }
    if (keyState.Four) {
        toggleMeshVisibility([4]);
    }
    if (keyState.Five) {
        toggleMeshVisibility([5]);
    }
    if (keyState.Six) {
        toggleMeshVisibility([6]);
    }
    if (keyState.Seven) {
        toggleMeshVisibility([7]);
    }
    if (keyState.Eigth) {
        toggleMeshVisibility([0,1,2,3,4,5,6,7]);
    }
    
   
    camera.lookAt(0, 0, 0);


    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}
tick()

//Renders
function RenderCubeClicked(){
    const geometry = new THREE.BoxGeometry( 1, 1, 1 ).toNonIndexed();
    // vertexColors must be true so vertex colors can be used in the shader
    const material = new THREE.MeshBasicMaterial( { vertexColors: true } ); 
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

    
    meshOne = new THREE.Mesh( geometry, material );
    groupCubeRender.add(meshOne)
    groupCubeRender.position.x=0
    groupCubeRender.position.z=1
    groupCubeRender.rotation.z=0;
    groupCubeRender.position.y=1
}   


function RenderCubeClicked2(){
    const geometry = new THREE.BoxGeometry( 1, 1, 1 ).toNonIndexed();
	// vertexColors must be true so vertex colors can be used in the shader
    const material = new THREE.MeshBasicMaterial( { vertexColors: true } ); 
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

    //second cube
    mesh00 = new THREE.Mesh( geometry, material );
    mesh11 = new THREE.Mesh( geometry, material );
    mesh22 = new THREE.Mesh( geometry, material );
    mesh33 = new THREE.Mesh( geometry, material );
    mesh44 = new THREE.Mesh( geometry, material );
    mesh55 = new THREE.Mesh( geometry, material );
    mesh66 = new THREE.Mesh( geometry, material );
    mesh77 = new THREE.Mesh( geometry, material );
    
    mesh00.position.set(0,0,0)
    mesh11.position.set(0,1.1,0)
    mesh22.position.set(1.1,0,0)
    mesh33.position.set(1.1,1.1,0)

    mesh44.position.set(0,0,1.1)
    mesh55.position.set(0,1.1,1.1)
    mesh66.position.set(1.1,0,1.1)
    mesh77.position.set(1.1,1.1,1.1)

    mesh00.name = 'mesh00'
    mesh11.name = 'mesh11'
    mesh22.name = 'mesh22'
    mesh33.name = 'mesh33'
    mesh44.name = 'mesh44'
    mesh55.name = 'mesh55'
    mesh66.name = 'mesh66'
    mesh77.name = 'mesh77'
    
    groupCubeRender2.add(mesh00)
    groupCubeRender2.add(mesh11)
    groupCubeRender2.add(mesh22)
    groupCubeRender2.add(mesh33)
    groupCubeRender2.add(mesh44)
    groupCubeRender2.add(mesh55)
    groupCubeRender2.add(mesh66)
    groupCubeRender2.add(mesh77)
    positionStates = [mesh00,mesh11,mesh22,mesh33,mesh44,mesh55,mesh66,mesh77]
}   


function toggleMeshVisibility(meshIndicesToShow) {
    const allMeshes = [
        mesh00,
        mesh11,
        mesh22,
        mesh33,
        mesh44,
        mesh55,
        mesh66,
        mesh77,
    ];

    // Hide all meshes
    allMeshes.forEach(mesh => {
        mesh.visible = false;
    });

    // Show selected meshes
    meshIndicesToShow.forEach(index => {
        if (allMeshes[index]) {
            allMeshes[index].visible = true;
        }
    });
}


function Create1x1Cube(){
    const geometry = new THREE.BoxGeometry( 1, 1, 1 ).toNonIndexed();
	// vertexColors must be true so vertex colors can be used in the shader
    const material = new THREE.MeshBasicMaterial( { vertexColors: true } ); 
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

    
    meshOne = new THREE.Mesh( geometry, material );
    groupCubesOne.add(meshOne)
    groupCubesOne.position.x=-6
    groupCubesOne.position.z=-4
    groupCubesOne.rotation.z=Math.PI/4;
    groupCubesOne.position.y=8

}

function Create2x2Cube(){
    const geometry = new THREE.BoxGeometry( 1, 1, 1 ).toNonIndexed();
	// vertexColors must be true so vertex colors can be used in the shader
    const material = new THREE.MeshBasicMaterial( { vertexColors: true } ); 
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

    lmesh00 = new THREE.Mesh( geometry, material );
    lmesh11 = new THREE.Mesh( geometry, material );
    lmesh22 = new THREE.Mesh( geometry, material );
    lmesh33 = new THREE.Mesh( geometry, material );
    lmesh44 = new THREE.Mesh( geometry, material );
    lmesh55 = new THREE.Mesh( geometry, material );
    lmesh66 = new THREE.Mesh( geometry, material );
    lmesh77 = new THREE.Mesh( geometry, material );

    lmesh00.position.set(0,0,0)
    lmesh11.position.set(0,1.1,0)
    lmesh22.position.set(1.1,0,0)
    lmesh33.position.set(1.1,1.1,0)

    lmesh44.position.set(0,0,1.1)
    lmesh55.position.set(0,1.1,1.1)
    lmesh66.position.set(1.1,0,1.1)
    lmesh77.position.set(1.1,1.1,1.1)

    
    groupCubes2.add(lmesh00)
    groupCubes2.add(lmesh11)
    groupCubes2.add(lmesh22)
    groupCubes2.add(lmesh33)
    groupCubes2.add(lmesh44)
    groupCubes2.add(lmesh55)
    groupCubes2.add(lmesh66)
    groupCubes2.add(lmesh77)
    groupCubes2.position.x=-2
    groupCubes2.position.z=-4
    groupCubes2.rotation.z=Math.PI/4;
    groupCubes2.position.y=8

}

function CreateCube1(){
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
}

let activeCube;

// Function to switch the active cube
function setActiveCube(cube) {
    activeCube = cube;
    attachKeydownEventListener(); // Attach or detach listeners based on the active cube
}

function attachKeydownEventListener() {
    // Remove existing keydown event listener
    document.removeEventListener('keydown', handleKeydown);

    // Attach keydown event listener based on the active cube
    if (activeCube === groupCubeRender) {
        document.addEventListener('keydown', handleKeydown);
    }
    if (activeCube === groupCubeRender2) {
        document.addEventListener('keydown', handleKeydown2);
    }
    // Add more cases for other cubes if needed
}

function handleKeydown(event) {
    // Determine which key was pressed and set the rotation accordingly
    let axis;

    switch (event.key.toUpperCase()) {
        case 'U':
            // Rotate 90 degrees clockwise around the world Y-axis for 'U'
            axis = new THREE.Vector3(0, 1, 0);
            groupCubeRender.rotateOnWorldAxis(axis, Math.PI / 2);
            break;
        case 'Y':
            // Rotate 90 degrees anticlockwise around the world Y-axis for 'T'
            axis = new THREE.Vector3(0, 1, 0);
            groupCubeRender.rotateOnWorldAxis(axis, -Math.PI / 2);
            break;
        case 'R':
            // Rotate 90 degrees clockwise around the world X-axis for 'R'
            axis = new THREE.Vector3(1, 0, 0);
            groupCubeRender.rotateOnWorldAxis(axis, Math.PI / 2);
            break;
        case 'T':
            // Rotate 90 degrees anticlockwise around the world X-axis for 'L'
            axis = new THREE.Vector3(1, 0, 0);
            groupCubeRender.rotateOnWorldAxis(axis, -Math.PI / 2);
            break;
    }

    // Render the scene
    renderer.render(scene, camera);
}


var positionStart0 = new THREE.Vector3(0,0,0)
var positionStart1 = new THREE.Vector3(0,moveUp,0)
var positionStart2 = new THREE.Vector3(moveUp,0,0)
var positionStart3 = new THREE.Vector3(moveUp,moveUp,0)
var positionStart4 = new THREE.Vector3(0,0,moveUp)
var positionStart5 = new THREE.Vector3(0,moveUp,moveUp)
var positionStart6 = new THREE.Vector3(moveUp,0,moveUp)
var positionStart7 = new THREE.Vector3(moveUp,moveUp,moveUp)


function rotateAndMove(mesh, newPosition, rotationAngle, clockwise = true, axis = 'Y', index) {
    mesh.position.set(newPosition.x, newPosition.y, newPosition.z);

    const rotationAxis = new THREE.Vector3();
    
    // Set rotation axis based on the 'axis' parameter
    switch(axis.toUpperCase()) {
        case 'X':
            rotationAxis.set(1, 0, 0);
            break;
        case 'Y':
            rotationAxis.set(0, 1, 0);
            break;
        case 'Z':
            rotationAxis.set(0, 0, 1);
            break;
        // Add more cases as needed
        default:
            // Default to Y-axis if axis is not recognized
            rotationAxis.set(0, 1, 0);
            break;
    }

    const rotationDirection = clockwise ? 1 : -1;
    mesh.rotateOnWorldAxis(rotationAxis, rotationAngle * rotationDirection);

    console.log('mesh Star', mesh.name)
    console.log('mesn',mesh)
    console.log('mesn',index)
    console.log('mesn',positionStates)
    positionStates[index] = mesh
    console.log('mesn end',positionStates)
}

//move 1,3,5,7 mesh position and rotation clock or anticlock
function RotationU(clockwise = true) {
    const index = [1, 3, 5, 7];
    let meshRelative1=positionStates[index[0]]
    let meshRelative3=positionStates[index[1]]
    let meshRelative5=positionStates[index[2]]
    let meshRelative7=positionStates[index[3]]
    const rotationAxis = new THREE.Vector3(0, 1, 0);
    let rotationAngle = Math.PI / 2
    const rotationDirection = clockwise ? 1 : -1;
    

    const targetPosition = clockwise
            ? [positionStart3, positionStart7, positionStart1, positionStart5]
            : [positionStart5, positionStart1, positionStart7, positionStart3];


    positionStates[index[0]].position.set(targetPosition[0].x, targetPosition[0].y, targetPosition[0].z);
    positionStates[index[1]].position.set(targetPosition[1].x, targetPosition[1].y, targetPosition[1].z);
    positionStates[index[2]].position.set(targetPosition[2].x, targetPosition[2].y, targetPosition[2].z);
    positionStates[index[3]].position.set(targetPosition[3].x, targetPosition[3].y, targetPosition[3].z);   

    positionStates[index[0]].rotateOnWorldAxis(rotationAxis, rotationAngle * rotationDirection);
    positionStates[index[1]].rotateOnWorldAxis(rotationAxis, rotationAngle * rotationDirection);
    positionStates[index[2]].rotateOnWorldAxis(rotationAxis, rotationAngle * rotationDirection);
    positionStates[index[3]].rotateOnWorldAxis(rotationAxis, rotationAngle * rotationDirection);

    positionStates[index[0]] = clockwise ? meshRelative5 : meshRelative3;
    positionStates[index[1]] = clockwise ? meshRelative1 : meshRelative7;
    positionStates[index[2]] = clockwise ? meshRelative7 : meshRelative1;
    positionStates[index[3]] = clockwise ? meshRelative3 : meshRelative5;
}

//fix L rotation
function RotationL(clockwise = true) {
    const index = [0, 1, 4, 5];
    let meshRelative1=positionStates[index[0]]
    let meshRelative3=positionStates[index[1]]
    let meshRelative5=positionStates[index[2]]
    let meshRelative7=positionStates[index[3]]
    const rotationAxis = new THREE.Vector3(1, 0, 0);
    let rotationAngle = Math.PI / 2
    const rotationDirection = clockwise ? 1 : -1;
    const targetPosition = clockwise
            ? [positionStart4, positionStart0, positionStart5, positionStart1]
            : [positionStart1, positionStart5, positionStart4, positionStart0];


    positionStates[index[0]].position.set(targetPosition[0].x, targetPosition[0].y, targetPosition[0].z);
    positionStates[index[1]].position.set(targetPosition[1].x, targetPosition[1].y, targetPosition[1].z);
    positionStates[index[2]].position.set(targetPosition[2].x, targetPosition[2].y, targetPosition[2].z);
    positionStates[index[3]].position.set(targetPosition[3].x, targetPosition[3].y, targetPosition[3].z);   

    positionStates[index[0]].rotateOnWorldAxis(rotationAxis, rotationAngle * rotationDirection);
    positionStates[index[1]].rotateOnWorldAxis(rotationAxis, rotationAngle * rotationDirection);
    positionStates[index[2]].rotateOnWorldAxis(rotationAxis, rotationAngle * rotationDirection);
    positionStates[index[3]].rotateOnWorldAxis(rotationAxis, rotationAngle * rotationDirection);

    positionStates[index[0]] = clockwise ? meshRelative5 : meshRelative3;
    positionStates[index[1]] = clockwise ? meshRelative1 : meshRelative7;
    positionStates[index[2]] = clockwise ? meshRelative7 : meshRelative1;
    positionStates[index[3]] = clockwise ? meshRelative3 : meshRelative5;
}

function handleKeydown2(event) {
    
    console.log(positionStates,'StartState')
    switch (event.key.toUpperCase()) {
        case 'U':
            console.log('Rotating clockwise');
            RotationU(true);
            break;
        case 'Y':
            console.log('Rotating anti-clockwise');
            RotationU(false);
            break;
        case 'K':
            console.log('Rotating clockwise');
            RotationL(true);
            break;
        case 'L':
            console.log('Rotating anti-clockwise');
            RotationL(false);
            break;
    
        }
    
    console.log(positionStates,'endState')
}

