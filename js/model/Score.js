var Score = function(game, scene, player, x, y, z, requiredKey)
{
    this.game   = game;
    this.scene  = scene;
	  this.player = player;
	  this.count  = 0;
    this.positionX = x;
    this.positionY = y;
    this.positionZ = z;
    this.requiredKey = requiredKey;

    /* MESH */
	  var mat              = new BABYLON.StandardMaterial("mat", this.scene);
    mat.diffuseColor     = BABYLON.Color3.FromInts(255,0,0);
    this.door            = BABYLON.Mesh.CreateBox("box", 1.0, this.scene);
    this.door.scaling    = new BABYLON.Vector3(2,10,20);
  	this.door.position.x = this.positionX;
  	this.door.position.y = this.positionY;
    this.door.position.z = this.positionZ;
    this.door.material   = mat;
	  this.door.isPickable = false;
    this.door.setPhysicsState(BABYLON.PhysicsEngine.BoxImpostor, {mass:0, restitution:0.5, friction:0.1});

	  var _this = this;
    this.scene.registerBeforeRender(function()
    {
        _this.verify();
    });
};


Score.prototype =
{
    destroy : function()
    {
        this.door.dispose();
    },

	verify : function ()
	{
		if (this.count == this.requiredKey)
    {
			this.openDoor();
		}
	},

	openDoor : function ()
	{
    var mat            = new BABYLON.StandardMaterial("mat", this.scene);
    mat.diffuseColor   = BABYLON.Color3.FromInts(0,255,0);
    this.door.material = mat;

    if (this.door.intersectsMesh(this.player.box, false))
    {
			//CALL NEXT STAGE
			this.destroy();
      this.game.runNextState();
		}
	}
};
