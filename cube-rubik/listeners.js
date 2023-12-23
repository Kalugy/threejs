
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


window.addEventListener('mousedown', onDocumentMouseDown, false);

function onDocumentMouseDown(event) {
    // Calculate mouse position in normalized device coordinates
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Update the picking ray with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);

    // Check for intersections
    const intersects = raycaster.intersectObjects(groupCubesOne.children, true);

    // If there is an intersection, handle the click
    // If there is an intersection, toggle the visibility of the group
    if (intersects.length > 0) {
        toggleGroupVisibility();
    }
}

function toggleGroupVisibility() {
    // Toggle the visibility of the group
    groupCubes.visible = !groupCubes.visible;
    
    // You can add additional logic here if needed
    if (groupCubes.visible) {
        console.log('Group is now visible');
    } else {
        console.log('Group is now hidden');
    }
}

function onGroupClick(event) {
    // Your click event handling code here
    console.log('Group Clicked!');
    
}


// window.addEventListener('dblclick',()=>{
//     //Safari
//     const fullscreenElement = document.fullscreenElement|| document.webkitFullscreenElement;
//     if(!fullscreenElement){
//         if(canvas2.requestFullscreen){
//             canvas2.requestFullscreen()
//         }
//         else{
//             canvas2.webkitFullscreenElement()
//         }
        
//     }else{
//         if(document.exitFullscreen()){
//             document.exitFullscreen()
//         }
//         else{
//             document.webkitExitFullscreen()
//         }
        
//     }
// })

