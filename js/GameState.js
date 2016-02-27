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
        var camera= new BABYLON.FreeCamera("cam", new BABYLON.Vector3(0, 150, -340), scene);
        camera.setTarget(new BABYLON.Vector3(0,0,0));
        camera.applyGravity = true;
        camera.attachControl(this.engine.getRenderingCanvas());

        // Hemispheric light to light the scene
        var h = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0,1,0), scene);
        h.groundColor = BABYLON.Color3.FromInts(255,255,255);
        h.intensity = 0.9;

        var map1 = new StageOneMap(scene);

        return scene;
    },

    /**
     * Run the current state
     */
    run : function()
    {

        this.scene = this._initScene();

		// var assetsManager = new BABYLON.AssetsManager(this.scene);

	  // Watch for browser/canvas resize events
	  window.addEventListener("resize", function () {
		this.engine.resize();
	  });

        // The loader
        var loader =  new BABYLON.AssetsManager(this.scene);

		// var position = 2;
		// var pos = function(t){
			// t.loadedMeshes.forEach(function(m){
				// m.position.y = position;
			// });
			// position += 0;
		// };

		// var key = loader.addMeshTask("key", "", "js/assets/", "Milenium_Key_274.obj");
		// key.onSuccess = pos;

           // var meshTask = this.loader.addMeshTask("skull task", "", "./assets/", "block02.babylon");
           // meshTask.onSuccess = this._initMesh;

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
        this.player = new Player(this.game, this.scene, this.gamepad, -120, 90);
        new Enemy(this.game, this.scene, 0, -80, this.player, [0,1,0,0]);
    		this.score = new Score (this.game, this.scene, this.player);
    		new Key (this.game, this.scene, this.player, this.score, 0, 100);
    		new Key (this.game, this.scene, this.player, this.score, 0, -100);
    		new Key (this.game, this.scene, this.player, this.score, 0, 50);
    }
};
