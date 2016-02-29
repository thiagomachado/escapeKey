var Player = function(game, scene, gamepad, x, z)
{
	this.x       = x;
	this.z       = z;
	this.game    = game;
  this.scene   = scene;
  this.gamepad = gamepad;
	this.score   = 0;


  /* MESH */
  this.box            = BABYLON.Mesh.CreateBox("player", 10, this.scene);
	this.box.position.x = x;
	this.box.position.y = 2;
	this.box.position.z = z;
  this.body           = this.box.setPhysicsState(BABYLON.PhysicsEngine.BoxImpostor, {mass:1, friction:0.1, restitution:0.1});
  var matos           = new BABYLON.StandardMaterial("matos", this.scene);
  matos.diffuseColor  = BABYLON.Color3.Blue();
  this.box.material   = matos;
	this.box.isPickable = true;

  // Movement directions : top, bot, left, right
  this.mvtDirection = [0,0,0,0];

  // The player speed
  this.speed = 0.8;

  /* GAMEPAD*/
  var _this = this;
  this.scene.registerBeforeRender(function()
  {
      _this.update();
  });

  /* KEYBOARD */
  window.addEventListener("keyup", function(evt)
  {
      _this.handleKeyUp(evt.keyCode);
  });

  window.addEventListener("keydown", function(evt)
  {
      _this.handleKeyDown(evt.keyCode);
  });
};

Player.DIRECTIONS =
{
    ARROW :
    {
        TOP     : 38,
        BOT     : 40,
        LEFT    : 37,
        RIGHT   : 39
    },
    WASD :
    {
        TOP     : 87,
        BOT     : 83,
        LEFT    : 65,
        RIGHT   : 68
    }
};

Player.prototype =
{

    update : function()
    {
        this.move();
    },

    /**
     * Store the player direction.
     * Two directions are available : the movement direction
     * and the firing direction.
     * @private
     */
    _chooseDirection : function(direction, value)
    {
        this.mvtDirection[direction] = value;
    },

    move : function()
    {

        var s = 10;

        if (this.mvtDirection[0] != 0)
				{
            this.box.applyImpulse(new BABYLON.Vector3(0,0,s), this.box.position);
        }
        if (this.mvtDirection[1] != 0)
				{
            this.box.applyImpulse(new BABYLON.Vector3(0,0,-s), this.box.position);
        }
        if (this.mvtDirection[2] != 0)
				{
            this.box.applyImpulse(new BABYLON.Vector3(-s,0,0), this.box.position);
        }
        if (this.mvtDirection[3] != 0)
				{
            this.box.applyImpulse(new BABYLON.Vector3(s,0,0), this.box.position);
        }
        this.body.body.linearVelocity.scaleEqual(0.92);
        this.body.body.angularVelocity.scaleEqual(0);
    },

    handleKeyDown : function(keycode)
    {
        switch (keycode)
        {
            case Player.DIRECTIONS.ARROW.TOP :
            case Player.DIRECTIONS.WASD.TOP :
                this._chooseDirection(0, 1);
                break;
            case Player.DIRECTIONS.ARROW.BOT :
            case Player.DIRECTIONS.WASD.BOT :
                this._chooseDirection(1, 1);
                break;
            case Player.DIRECTIONS.ARROW.LEFT:
            case Player.DIRECTIONS.WASD.LEFT :
                this._chooseDirection(2, 1);
                break;
            case Player.DIRECTIONS.ARROW.RIGHT:
            case Player.DIRECTIONS.WASD.RIGHT :
                this._chooseDirection(3, 1);
                break;
        }
    },

    handleKeyUp : function(keycode)
    {

        switch (keycode)
        {
            case Player.DIRECTIONS.ARROW.TOP :
            case Player.DIRECTIONS.WASD.TOP :
                this._chooseDirection(0,0);
                break;
            case Player.DIRECTIONS.ARROW.BOT :
            case Player.DIRECTIONS.WASD.BOT :
                this._chooseDirection(1, 0);
                break;
            case Player.DIRECTIONS.ARROW.LEFT:
            case Player.DIRECTIONS.WASD.LEFT :
                this._chooseDirection(2, 0);
                break;
            case Player.DIRECTIONS.ARROW.RIGHT:
            case Player.DIRECTIONS.WASD.RIGHT :
                this._chooseDirection(3, 0);
                break;
        }
    },

    destroy : function()
    {
        this.box.dispose();
    }
};
