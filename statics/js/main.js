//Container to eliminate Globals
var adi = adi || {};
adi.mInstance = adi.mInstance || {};
//-----------------------------
var clock = new THREE.Clock();
var textureLoader = new THREE.TextureLoader();

init();
animate();

adi.mInstance.camera;
adi.mInstance.scene;
adi.mInstance.render;
adi.mInstance.sphere;
adi.mInstance.floor;
adi.mInstance.background;
adi.mInstance.frametime;

function init() //Start
{
    
    adi.mInstance.render = new THREE.WebGLRenderer({
        alpha: true
    });
    //adi.mInstance.render.setPixelRatio(window.devicePixelRatio);
    adi.mInstance.render.setSize(window.innerWidth, window.innerHeight);
    //adi.mInstance.render.setSize(400, 400);
    document.body.appendChild(adi.mInstance.render.domElement);
    adi.mInstance.render.domElement.id = "Webgl_CSS_canvas1";
    //
    adi.mInstance.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    adi.mInstance.camera.position.set(5, 5, 220);
    //
    adi.mInstance.scene = new THREE.Scene();
    // GROUND
    let groundGeometry = new THREE.BoxBufferGeometry(150, 0.01, 150);
    let groundMaterial = new THREE.MeshBasicMaterial({
        color: 'rgb(200,200,200)',
        wireframe: false
    });
    adi.mInstance.floor = new THREE.Mesh(groundGeometry, groundMaterial);
    adi.mInstance.floor.position.y = -50.0;
    adi.mInstance.scene.add(adi.mInstance.floor);
    // Background
    let material = new THREE.MeshPhongMaterial( );
	let object = new THREE.Mesh( new THREE.PlaneBufferGeometry( 100, 100, 4, 4 ), material );
                                object.position.set( - 300, 0, 0 );
                                adi.mInstance.scene.add( object );
    adi.mInstance.scene.add(adi.mInstance.sphere);
       //Scene Objects
       adi.mInstance.sphere = new THREE.Mesh(new THREE.CylinderGeometry(20, 20, 100, 20),
       new THREE.MeshBasicMaterial({color: 'rgb(0,0,0)',
                                    wireframe: true}));
    //
   adi.mInstance.scene.add(adi.mInstance.sphere);
}

function animate() //Update loop
{
    requestAnimationFrame(animate);
    frametime = clock.getDelta();
    let time = clock.getElapsedTime();

    adi.mInstance.sphere.rotation.x += (Math.sin(time) * 3) * frametime;
    adi.mInstance.sphere.rotation.y += (Math.sin(time) * 3) * frametime;
    adi.mInstance.sphere.position.y = Math.abs(Math.sin(time) * 30);

    adi.mInstance.floor.rotation.y += 1.0 * frametime;

    let elapsed = clock.getElapsedTime();
    adi.mInstance.render.render(adi.mInstance.scene, adi.mInstance.camera);
}