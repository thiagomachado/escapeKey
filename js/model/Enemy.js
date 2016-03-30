var Enemy = function(game, scene, x, z, player, direction)
{
	this.x = x;
	this.z = z;
    this.game = game;
    this.scene = scene;
	this.player = player;

	//[top, bottom, right, left]
	this.mvtDirection = direction;

    /* MESH */
    this.box = BABYLON.Mesh.CreateBox("enemy", 10, this.scene);
	this.box.position.x = x;
    this.box.position.y = 2;
	this.box.position.z = z;
    this.body = this.box.setPhysicsState(BABYLON.PhysicsEngine.BoxImpostor, {mass:1, friction:0.1, restitution:0.1});
    var matos = new BABYLON.StandardMaterial("matos", this.scene);
    matos.diffuseColor = BABYLON.Color3.Red();
    this.box.material = matos;
	this.box.isPickable = false;
	this.firstTime = true;
	this.haventSeen = true;

    var _this = this;
    this.scene.registerBeforeRender(function()
    {
        _this.update();
    });

};

Enemy.prototype =
{
    update : function()
    {
        this.chooseDirection();
		this.seenPlayer();
		this.collidedWithPlayer();
    },

	move : function()
	{
		var s = 3;
		var distance = 1;
		this.box.rotation = new BABYLON.Vector3(0, Math.PI/3, 0);
		this.box.translate(new BABYLON.Vector3(3, 3, 3), distance, BABYLON.Space.LOCAL);
		this.box.translate(new BABYLON.Vector3(2, 4, 1), distance, BABYLON.Space.LOCAL);

		//Indo para cima
        if (this.targetPos.z > this.box.position.z)
		{
            this.box.applyImpulse(new BABYLON.Vector3(0,0,s), this.box.position);

        }
        //Indo para baixo
        if (this.targetPos.z < this.box.position.z)
		{
            this.box.applyImpulse(new BABYLON.Vector3(0,0,-s), this.box.position);
        }
        //Indo para esquerda
        if (this.targetPos.x < this.box.position.x)
		{
            this.box.applyImpulse(new BABYLON.Vector3(-s,0,0), this.box.position);
        }
        //Indo para direita
        if (this.targetPos.x > this.box.position.x)
		{
            this.box.applyImpulse(new BABYLON.Vector3(s,0,0), this.box.position);
        }
        this.body.body.linearVelocity.scaleEqual(0.98);
        this.body.body.angularVelocity.scaleEqual(0.8);
	},

    chooseDirection : function()
    {
    	if (this.haventSeen)
    	{
			//Looking Up
	        if (this.mvtDirection[0] != 0) {
				this.ray1 = new BABYLON.Ray(new BABYLON.Vector3(this.box.position.x, this.box.position.y, this.box.position.z), new BABYLON.Vector3(this.box.position.x, this.box.position.y, (150 - this.box.position.z)));
				this.newPick = this.scene.pickWithRay(this.ray1).pickedPoint;
	        }
			//Looking Down
	        if (this.mvtDirection[1] != 0) {
				this.ray1 = new BABYLON.Ray(new BABYLON.Vector3(this.box.position.x, this.box.position.y, this.box.position.z), new BABYLON.Vector3(this.box.position.x, this.box.position.y, (-150 - this.box.position.z)));
				this.newPick = this.scene.pickWithRay(this.ray1).pickedPoint;
			}
			//Looking to the Right
	        if (this.mvtDirection[2] != 0) {
				this.ray1 = new BABYLON.Ray(new BABYLON.Vector3(this.box.position.x, this.box.position.y, this.box.position.z), new BABYLON.Vector3((150 - this.box.position.x), this.box.position.y, this.box.position.z));
				this.newPick = this.scene.pickWithRay(this.ray1).pickedPoint;
	        }
	        if (this.mvtDirection[3] != 0) {
				this.ray1 = new BABYLON.Ray(new BABYLON.Vector3(this.box.position.x, this.box.position.y, this.box.position.z), new BABYLON.Vector3((-150 - this.box.position.x), this.box.position.y, this.box.position.z));
				this.newPick = this.scene.pickWithRay(this.ray1).pickedPoint;
	        }
	    }

	    else
	    {
	      	this.ray1 = new BABYLON.Ray(new BABYLON.Vector3(this.box.position.x, this.box.position.y, this.box.position.z), this.targetPos);
			this.newPick = this.targetPos;
	    }

	    this.matrix1 = new BABYLON.Matrix.RotationY(Math.PI / 4);
		this.P1 = new BABYLON.Vector3.TransformCoordinates(this.newPick, this.matrix1);
		this.matrix2 = new BABYLON.Matrix.RotationY(-Math.PI / 4);
		this.P2 = new BABYLON.Vector3.TransformCoordinates(this.newPick, this.matrix2);

		this.visionRange(this.P1.x, this.P2.x, 0, this.P1.z, this.P2.z);
    },

    destroy : function()
    {
        this.box.dispose();
    },

	visionRange : function(r2_x, r3_x, y, r2_z, r3_z)
	{
		//Angular rays
		this.ray2 = new BABYLON.Ray(new BABYLON.Vector3(this.box.position.x, this.box.position.y, this.box.position.z), new BABYLON.Vector3(r2_x, y, r2_z));
		this.point2 = this.scene.pickWithRay(this.ray2).pickedPoint;
		this.ray3 = new BABYLON.Ray(new BABYLON.Vector3(this.box.position.x, this.box.position.y, this.box.position.z), new BABYLON.Vector3(r3_x, y, r3_z));
		this.point3 = this.scene.pickWithRay(this.ray3).pickedPoint;

		if (this.firstTime){
			this.firstTime = false;
			this.lines = BABYLON.Mesh.CreateLines("lines", [new BABYLON.Vector3(this.box.position.x, this.box.position.y, this.box.position.z), this.point2,
			new BABYLON.Vector3(this.box.position.x, this.box.position.y, this.box.position.z), this.point3], this.scene);
		    this.lines.Color = new BABYLON.Color3(1, 0, 0);
		}
		else{
			this.eraseVisionRange();
			this.lines = BABYLON.Mesh.CreateLines("lines", [new BABYLON.Vector3(this.box.position.x, this.box.position.y, this.box.position.z), this.point2,
			new BABYLON.Vector3(this.box.position.x, this.box.position.y, this.box.position.z), this.point3], this.scene);
		    this.lines.Color = new BABYLON.Color3(1, 0, 0);
		}
	},

	//Check if the player was seen by the enemy
	seenPlayer : function()
	{
		if (this.lines.intersectsMesh(this.player.box, false)){
			//Set target point to the latest player position "seen" by the enemy
			this.haventSeen = false;
			this.targetPos = new BABYLON.Vector3(this.player.box.position.x, this.player.box.position.y, this.player.box.position.z);
			this.move();
		}
	},

	collidedWithPlayer : function ()
	{
		if ((this.box.intersectsMesh(this.player.box, false))){
			//The game ends when the player touchs the enemy
			this.player.destroy();
			this.game.runLastState();
		}
	},

	eraseVisionRange: function ()
	{
		this.lines.dispose();
	}
};
