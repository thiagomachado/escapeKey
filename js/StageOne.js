/**
 * The state used for player to select their colors
 * @param game
 * @constructor
 */
var StageOne = function(game)
{
    State.call(this, game);

    // All gamepad id currently connected
    this.gamepadIds = [];
};


StageOne.prototype = Object.create(State.prototype);
StageOne.prototype.constructor = StageOne;

StageOne.prototype =
{

    _initScene : function()
    {
        var scene = new BABYLON.Scene(this.engine);
        scene.enablePhysics(new BABYLON.Vector3(0, -500, 0), new BABYLON.OimoJSPlugin());

        // Camera attached to the canvas
        var camera= new BABYLON.FreeCamera("cam", new BABYLON.Vector3(0, 150, -340), scene);
        camera.setTarget(new BABYLON.Vector3(0,0,0));
        camera.applyGravity = true;
        //camera.attachControl(this.engine.getRenderingCanvas());

        // Hemispheric light to light the scene
        var h = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0,1,0), scene);
        h.groundColor = BABYLON.Color3.FromInts(255,255,255);
        h.intensity = 0.9;

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

        var groundTask = loader.addTextureTask("ground task", "js/shaders/ground.jpg");
        var groundMaterial = new BABYLON.StandardMaterial("groundMaterial",this.scene);;
        groundTask.onSuccess = function(task)
        {
            groundMaterial.diffuseTexture = task.texture;
        }
        var _this = this;

        loader.onFinish = function (tasks)
        {

            new StageOneMap(_this.scene,groundMaterial);
            // Init the game
            _this._initGame();

            // The state is ready to be played
            _this.isReady = true;

            _this.engine.runRenderLoop(function ()
            {
                _this.scene.render();
            });
        };

        window.addEventListener("resize", function ()
        {
            game.engine.resize();
        });

        loader.load();

    },

    _initGame : function()
    {
        //Load the sound and play it automatically once ready
        var music = new BABYLON.Sound
        (
          "Music", "sounds/justMove.mp3", this.scene,
          function ()
          {
          // Sound has been downloaded & decoded
          music.play();
          },
          { loop: true, autoplay: true }
        );

        this.music = music;

        this.player = new Player(this.game, this.scene, this.gamepad, -120, 90);
        this.score  = new Score (this.game, this.scene, this.player);

        new Enemy(this.game, this.scene, 0, -80, this.player, [0,1,0,0]);
        new Key (this.game, this.scene, this.player, this.score, 0, 100);
        new Key (this.game, this.scene, this.player, this.score, 0, -100);
        new Key (this.game, this.scene, this.player, this.score, 120, 50);
    }
};
