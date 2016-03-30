var YouWin = function(game)
{
    State.call(this, game);
    // All gamepad id currently connected
    this.gamepadIds = [];
};

YouWin.prototype = Object.create(State.prototype);
YouWin.prototype.constructor = YouWin;
YouWin.prototype =
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
      this.scene.clearColor = new BABYLON.Color3(0, 0, 0);
	    // var assetsManager = new BABYLON.AssetsManager(this.scene);

      // The loader
      var loader =  new BABYLON.AssetsManager(this.scene);

      var assets = [];
      var toLoad =
      [
          {name : "youwin",    src : "js/img/youwin.png" }
      ];

      toLoad.forEach(function(obj)
      {
          var img = loader.addTextureTask(obj.name, obj.src);
          img.onSuccess = function(t)
          {
              assets[t.name] = t.texture;
          };
      });


      var musicTask = loader.addBinaryFileTask("music menu task", "sounds/golucky.mp3");
      var musicData;
      musicTask.onSuccess = function (task)
      {
	        musicData = task.data;
	    }

      var _this = this;
      loader.onFinish = function (tasks)
      {
          music = new BABYLON.Sound("Music", musicData, _this.scene,1,{ loop: true, autoplay: true});

          _this.music = music;

          // Init the game
          _this._initGame();

          // The state is ready to be played
          _this.isReady = true;

          _this.engine.runRenderLoop(function ()
          {
              _this.scene.render();
          });

          _this.createGUI();
      };

      window.addEventListener("resize", function ()
      {
          game.engine.resize();
      });

      loader.load();
    },

    _initGame : function()
    {

    },

    createGUI : function()
    {
      var css = "button{cursor:pointer;}";
      guisystem = new CASTORGUI.GUIManager(game.canvas, css, {themeRoot: ""});
      //logo
      var logoOptions =
      {
        w: 820,
        h: 118,
        x: (game.canvas.width/2)-410,
        y: 50
      };
      var logo = new CASTORGUI.GUITexture("youwin", "js/img/youwin.png", logoOptions,guisystem, null);

      //menu button
      var reloadFunction = function()
      {
        location.reload();
      };
      var playOptions =
      {
        x:(guisystem.getCanvasWidth().width / 2 - 100), y: 250, w:200, h:35, value:"MENU"
      };
      var menuButton = new CASTORGUI.GUIButton("menuButtonGUI",playOptions, guisystem, reloadFunction);
    }
}
