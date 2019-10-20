       
var adi = adi || {};
adi.babylon = adi.babylon || {};
       
adi.babylon.camera;
adi.babylon.engine;
adi.babylon.scene;
adi.babylon.sphere;
adi.babylon.floor;
adi.babylon.background;
adi.babylon.frametime;

       let canvas = document.getElementById("renderCanvas"); // Get the canvas element 
       adi.babylon.engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

        /******* Add the create scene function ******/
        let createScene = function () {
            // Create the scene space
            let scene = new BABYLON.Scene(adi.babylon.engine);

            // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
            let light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    
            // Default intensity is 1. Let's dim the light a small amount
            light.intensity = 0.7;
    
            // Our built-in 'sphere' shape.
            let sphere = BABYLON.MeshBuilder.CreatePolyhedron('ph',{type: 6,size: 1},false)

            // Add a camera to the scene and attach it to the canvas
            let camTarget = sphere.position ; /*BABYLON.Vector3.Zero().clone();*/
            camTarget.y = 5;
            let camera = new BABYLON.ArcRotateCamera("Camera", 0, Math.PI /2 , 30, camTarget, scene);
            camera.attachControl(canvas, true);
    
        //     // Move the sphere upward 1/2 its height
        //     sphere.position.y = 1;
    
            // Our built-in 'ground' shape.
        //     let ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 6, height: 6}, scene);

            return scene;
        };
        /******* End of the create scene function ******/    

        adi.babylon.scene = createScene(); //Call the createScene function

        // Register a render loop to repeatedly render the scene
        adi.babylon.engine.runRenderLoop(function () { 
                adi.babylon.scene.render();
        });

        // Watch for browser/canvas resize events
        window.addEventListener("resize", function () { 
                adi.babylon.engine.resize();
        });