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

        // Camera attached to the canvas
        var camera= new BABYLON.FreeCamera("cam", new BABYLON.Vector3(0, 200, -340), scene);
        camera.setTarget(new BABYLON.Vector3(0,0,0));
        camera.applyGravity = true;
        camera.attachControl(this.engine.getRenderingCanvas());

        // Hemispheric light to light the scene
        var h = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0,1,0), scene);
        h.groundColor = BABYLON.Color3.FromInts(255,83,13);
        h.intensity = 0.9;

        // Ground creation
        var ground = BABYLON.Mesh.CreateGround("ground", 300, 300, 1, scene);

        var groundMaterial = new BABYLON.StandardMaterial("groundMaterial",scene);
        var groundTexture = new BABYLON.Texture('js/shaders/ground.jpg', scene);
        ground.receiveShadows = true;

        groundMaterial.diffuseTexture = groundTexture;
        ground.material = groundMaterial;

        ground.setPhysicsState(BABYLON.PhysicsEngine.BoxImpostor, {mass:0, restitution:0.5, friction:0.1});



        //create wall
        var wallMaterial            = new BABYLON.StandardMaterial("wallMaterial", scene);
        //wallMaterial.emissiveColor  = new BABYLON.Color3(0.1, 0.1, 0.15);
        wallMaterial.diffuseTexture = new BABYLON.Texture("js/shaders/wall.jpg", scene);
        wallMaterial.bumpTexture = new BABYLON.Texture("js/shaders/wallBump.jpg", scene);
        wallMaterial.specularTexture = new BABYLON.Texture("js/shaders/wallBump.jpg", scene);
        // var wallTexture             = new BABYLON.Texture('js/shaders/paredecinza.jpg', scene);
        // wallTexture.uScale          = 10;
        // wallTexture.vScale          = 2;
        var wall                    = BABYLON.Mesh.CreateBox("box", 1.0, scene);
        wall.scaling                = new BABYLON.Vector3(300,20,10);
        wall.position.z             = -150;
        //wallMaterial.diffuseTexture = wallTexture;
        wall.material = wallMaterial;
        wall.setPhysicsState(BABYLON.PhysicsEngine.BoxImpostor, {mass:0, restitution:0.5, friction:0.1});


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
