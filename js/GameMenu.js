var GameMenu = function(game)
{
    State.call(this, game);
    // All gamepad id currently connected
    this.gamepadIds = [];
};

GameMenu.prototype = Object.create(State.prototype);
GameMenu.prototype.constructor = GameMenu;
GameMenu.prototype =
{

    _initScene : function()
    {
      var scene = new BABYLON.Scene(this.engine);

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

    run : function()
    {
      BABYLON.Engine.ShadersRepository = "/js/shaders/";
      this.scene = this._initScene();
	    // var assetsManager = new BABYLON.AssetsManager(this.scene);

      // The loader
      var loader =  new BABYLON.AssetsManager(this.scene);
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

      window.addEventListener("resize", function ()
      {
          game.engine.resize();
      });

      loader.load();
    },

    _initGame : function()
    {
      music = new BABYLON.Sound
      (
        "Music", "sounds/golucky.mp3", this.scene,
        function ()
        {
        // Sound has been downloaded & decoded
        music.play();

        },
        { loop: true}
      );

      this.music = music;

      var gui = new bGUI.GUISystem(this.scene, this.engine.getRenderWidth(), this.engine.getRenderHeight());
      gui.enableClick();
      var textGroup = new bGUI.GUIGroup("text", gui);
      // Baseline
      var baseline = new bGUI.GUIText("helpText", 1024, 128, {font:"30px Segoe UI", text:"PLAY", color:"#ffffff"}, gui);
      baseline.guiposition(new BABYLON.Vector3(170, 90, 0));
      baseline.onClick= function()
      {
        game.runNextState();
      };
      textGroup.add(baseline);
    }
};
