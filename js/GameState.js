/**
 * The state used for player to select their colors
 * @param game
 * @constructor
 */
var GameState = function(game)
{
    State.call(this, game);

    // All gamepad id currently connected
    this.gamepadIds = [];
};


GameState.prototype = Object.create(State.prototype);
GameState.prototype.constructor = GameState;

GameState.prototype =
{
    _initScene : function()
    {

        var scene = new BABYLON.Scene(this.engine);
        scene.enablePhysics(new BABYLON.Vector3(0, -500, 0), new BABYLON.OimoJSPlugin());
        //scene.enablePhysics(new BABYLON.Vector3(0, -9.8, 0), new BABYLON.CannonJSPlugin());

        // Camera attached to the canvas
        var camera= new BABYLON.FreeCamera("cam", new BABYLON.Vector3(10, 400, -200), scene);
        camera.setTarget(new BABYLON.Vector3(0,0,0));
        //camera.attachControl(this.engine.getRenderingCanvas());

        // Hemispheric light to light the scene
        var h = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0,1,0), scene);
        //h.groundColor = BABYLON.Color3.FromInts(255,83,13);
        h.intensity = 0.9;

        // Ground creation
        // var ground = BABYLON.Mesh.CreateGround("ground", 300, 300, 1, scene);
        //
        // ground.receiveShadows = true;
        // ground.setPhysicsState(BABYLON.PhysicsEngine.BoxImpostor, {mass:0, restitution:0.5, friction:0.1});

        // Skybox
        var skybox = BABYLON.Mesh.CreateBox("skyBox", 1000.0, scene);
        var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("Assets/skybox/skybox", scene);
        skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
        skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        skybox.material = skyboxMaterial;


        // Grounds
        var sun = new BABYLON.PointLight("Omni", new BABYLON.Vector3(100, 100, 0), scene);
        var ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "Assets/heightMap.png", 400, 400, 50, 0, 7, scene, true);
        ground.setPhysicsState(BABYLON.PhysicsEngine.BoxImpostor, {mass: 0});
        var groundMaterial = new WORLDMONGER.GroundMaterial("ground", scene, sun);
        ground.material = groundMaterial;
        ground.position.y = -2.0;

        var extraGround = BABYLON.Mesh.CreateGround("extraGround", 1000, 1000, 1, scene, false);
        extraGround.setPhysicsState(BABYLON.PhysicsEngine.BoxImpostor,{mass: 0, restitution: 0.001, friction: 0.001});
        var extraGroundMaterial = new BABYLON.StandardMaterial("extraGround", scene);
        extraGroundMaterial.diffuseTexture = new BABYLON.Texture("js/Shaders/Ground/sand.jpg", scene);
        extraGroundMaterial.diffuseTexture.uScale = 60;
        extraGroundMaterial.diffuseTexture.vScale = 60;
        extraGround.position.y = -2.5;
        extraGround.material = extraGroundMaterial;

        // Water
        var water = BABYLON.Mesh.CreateGround("water", 1000, 1000, 1, scene, false);
        var waterMaterial = new WORLDMONGER.WaterMaterial("water", scene, sun);
        waterMaterial.refractionTexture.renderList.push(ground);
        waterMaterial.refractionTexture.renderList.push(extraGround);

        waterMaterial.reflectionTexture.renderList.push(ground);
        waterMaterial.reflectionTexture.renderList.push(skybox);

        water.isPickable = false;
        water.material = waterMaterial;


        var mat = new BABYLON.StandardMaterial("mat", scene);
        mat.diffuseColor = BABYLON.Color3.FromInts(121,189,224);

        //create wall
        var mur = BABYLON.Mesh.CreateBox("box", 1.0, scene);
        mur.scaling = new BABYLON.Vector3(300,10,1);
        mur.position.z = -150;
        mur.material = mat;
        mur.setPhysicsState(BABYLON.PhysicsEngine.BoxImpostor, {mass:0, restitution:0.5, friction:0.1});

        return scene;
    },

    /**
     * Run the current state
     */
    run : function()
    {

        this.scene = this._initScene();


        // The loader
        var loader =  new BABYLON.AssetsManager(this.scene);

        //    var meshTask = this.loader.addMeshTask("skull task", "", "./assets/", "block02.babylon");
        //    meshTask.onSuccess = this._initMesh;

        var _this = this;
        loader.onFinish = function (tasks)
        {

            // Init the game
            _this._initGame();

            // The state is ready to be played
            _this.isReady = true;

            _this.engine.runRenderLoop(function ()
            {
                _this.scene.render();
            });
        };

        loader.load();
    },

    _initGame : function()
    {
        new Player(this.game, this.scene);
    }
};
