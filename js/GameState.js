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
        new Enemy(this.game, this.scene);
		new Wall(this.scene, 0, 10, -150, 300);
    }
};

