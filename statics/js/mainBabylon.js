var adi = adi || {};
adi.babylon = adi.babylon || {};

adi.babylon.camera;
adi.babylon.engine;
adi.babylon.scene;
adi.babylon.sphere;
adi.babylon.floor;
adi.babylon.background;

adi.babylon.texture;
adi.babylon.material;

adi.babylon.mesh;

adi.babylon.isClicked = false;;


let canvas = document.getElementById("renderCanvas"); // Get the canvas element
adi.babylon.engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine


let createScene = function (){
    // scene space
    let scene = new BABYLON.Scene(adi.babylon.engine);

    // light, aiming 0,1,0 - to the sky (non-mesh)
    let light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 1.0;
    //-------
    var img  = adi.map.mapCanvas.getCanvas().toDataURL('image/png');
    adi.babylon.texture = new BABYLON.Texture(img, adi.babylon.scene)
    adi.babylon.material = new BABYLON.StandardMaterial("mat", scene);
    adi.babylon.material.diffuseColor = new BABYLON.Color3(1, 1, 1);
    adi.babylon.material.diffuseTexture = null;
    //-------
    var columns = 2;
    var rows = 2;
    var faceColors = new Array(6);

    var faceUV = new Array(6);

    for (var i = 0; i < 8; i++) {
        faceUV[i] = new BABYLON.Vector4(i / columns, 0, (i + 1) / columns, 1 / rows);
    }
    //
    var options = {
        type: 6,
        // width: 10,
        // height: 3,
        // depth: 5,
        faceUV: faceUV,
        // faceColors: faceColors
    };

    adi.babylon.mesh = BABYLON.MeshBuilder.CreatePolyhedron('ph',options,false);
    var u = adi.babylon.mesh.getVerticesData();
    adi.babylon.mesh.material = adi.babylon.material;
    //----------------------->
    // Add a camera to the scene and attach it to the canvas
    let camTarget = adi.babylon.mesh.position; /*BABYLON.Vector3.Zero().clone();*/
    camTarget.y = 5;
    let camera = new BABYLON.ArcRotateCamera("Camera", 0, Math.PI / 2, 8, camTarget, scene);
    camera.attachControl(canvas, true);
    //---------------------->
    return scene;
};

adi.babylon.scene = createScene(); //Call the createScene function
adi.babylon.scene.clearColor = new BABYLON.Color4(0.3, 0.3, 0.3,0.5);

adi.babylon.engine.runRenderLoop(function () {
    adi.babylon.scene.render();
});

window.addEventListener("resize", function () {
    adi.babylon.engine.resize();
});

$('button').click(function() {
    adi.babylon.isClicked = !adi.babylon.isClicked;
    if(adi.babylon.texture &&  adi.babylon.isClicked){

        var img  = adi.map.mapCanvas.getCanvas().toDataURL('image/png');
        // img.style.transform = 'rotate(180deg)';
        adi.babylon.texture = new BABYLON.Texture(img, adi.babylon.scene)


        adi.babylon.material.diffuseTexture = adi.babylon.texture;
        adi.babylon.mesh.material = adi.babylon.material;
    }
    else {
        adi.babylon.material.diffuseColor = new BABYLON.Color3(1, 1, 1);
        adi.babylon.mesh.material = null;
    }
});