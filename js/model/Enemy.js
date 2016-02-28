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
    // The enemy speed
    this.speed = 0.8;

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
		this.move();
    },
	
	move : function()
	{
		
	},

    chooseDirection : function()
    {
		this.dist = 50;
		//Looking Up
        if (this.mvtDirection[0] != 0) {
			//Front ray
			this.ray1 = new BABYLON.Ray(new BABYLON.Vector3(this.box.position.x, this.box.position.y, this.box.position.z), new BABYLON.Vector3(this.box.position.x, this.box.position.y, (150 - this.box.position.z)));
			this.newPick = this.scene.pickWithRay(this.ray1).pickedPoint;
			this.dist = this.scene.pickWithRay(this.ray1).distance;
			this.visionRange(this.box.position.x - this.dist, this.box.position.x + this.dist, this.box.position.y, this.box.position.z + this.dist, this.box.position.z + this.dist);
        }
		//Looking Down
        if (this.mvtDirection[1] != 0) {
			//Front ray
			this.ray1 = new BABYLON.Ray(new BABYLON.Vector3(this.box.position.x, this.box.position.y, this.box.position.z), new BABYLON.Vector3(this.box.position.x, this.box.position.y, (-150 - this.box.position.z)));
			this.newPick = this.scene.pickWithRay(this.ray1).pickedPoint;
			this.dist = this.scene.pickWithRay(this.ray1).distance;
			//this.h = sqrt(2)*this.dist;
			this.visionRange(this.newPick.x - this.dist, this.newPick.x + this.dist, this.newPick.y, this.newPick.z - this.dist, this.newPick.z - this.dist);
		}
		//Looking to the Right
        if (this.mvtDirection[2] != 0) {
			//Front ray
			this.ray1 = new BABYLON.Ray(new BABYLON.Vector3(this.box.position.x, this.box.position.y, this.box.position.z), new BABYLON.Vector3((150 - this.box.position.x), this.box.position.y, this.box.position.z));
			this.newPick = this.scene.pickWithRay(this.ray1).pickedPoint;
			this.dist = this.scene.pickWithRay(this.ray1).distance;
			this.visionRange(this.box.position.x + this.dist, this.box.position.x + this.dist, this.box.position.y, this.box.position.z + this.dist, this.box.position.z - this.dist);
        }
        if (this.mvtDirection[3] != 0) {
			//Front ray
			this.ray1 = new BABYLON.Ray(new BABYLON.Vector3(this.box.position.x, this.box.position.y, this.box.position.z), new BABYLON.Vector3((-150 - this.box.position.x), this.box.position.y, this.box.position.z));
			this.newPick = this.scene.pickWithRay(this.ray1).pickedPoint;
			this.dist = this.scene.pickWithRay(this.ray1).distance;
			this.visionRange(this.box.position.x - this.dist, this.box.position.x - this.dist, this.box.position.y, this.box.position.z + this.dist, this.box.position.z - this.dist);
        }  
    },

    destroy : function()
    {
        this.box.dispose();
    },
	
	visionRange : function(r2_x, r3_x, y, r2_z, r3_z)
	{
		//Angular rays - 45° from the front ray
		this.ray2 = new BABYLON.Ray(new BABYLON.Vector3(this.box.position.x, this.box.position.y, this.box.position.z), new BABYLON.Vector3(r2_x, y, r2_z));
		this.point2 = this.scene.pickWithRay(this.ray2).pickedPoint;
		this.ray3 = new BABYLON.Ray(new BABYLON.Vector3(this.box.position.x, this.box.position.y, this.box.position.z), new BABYLON.Vector3(r3_x, y, r3_z));
		this.point3 = this.scene.pickWithRay(this.ray3).pickedPoint;
		
		if (this.firstTime){
			this.firstTime = false;
			this.line1 = BABYLON.Mesh.CreateLines("line1", [new BABYLON.Vector3(this.box.position.x, this.box.position.y, this.box.position.z), this.newPick], this.scene);
		    this.line1.Color = new BABYLON.Color3(1, 0, 0);
			this.line2 = BABYLON.Mesh.CreateLines("line2", [new BABYLON.Vector3(this.box.position.x, this.box.position.y, this.box.position.z), this.point2], this.scene);
		    this.line2.Color = new BABYLON.Color3(1, 0, 0);
			this.line3 = BABYLON.Mesh.CreateLines("line3", [new BABYLON.Vector3(this.box.position.x, this.box.position.y, this.box.position.z), this.point3], this.scene);
		    this.line3.Color = new BABYLON.Color3(1, 0, 0);
		}
		if(this.oldPick != this.newPick){
			this.eraseOldLine();
			this.line1 = BABYLON.Mesh.CreateLines("line1", [new BABYLON.Vector3(this.box.position.x, this.box.position.y, this.box.position.z), this.newPick], this.scene);
			this.line1.Color = new BABYLON.Color3(1, 0, 0);
			this.line2 = BABYLON.Mesh.CreateLines("line2", [new BABYLON.Vector3(this.box.position.x, this.box.position.y, this.box.position.z), this.point2], this.scene);
		    this.line2.Color = new BABYLON.Color3(1, 0, 0);
			this.line3 = BABYLON.Mesh.CreateLines("line3", [new BABYLON.Vector3(this.box.position.x, this.box.position.y, this.box.position.z), this.point3], this.scene);
		    this.line3.Color = new BABYLON.Color3(1, 0, 0);
		}
		this.oldPick = this.newPick;
	},
	
	seenPlayer : function()
	{
		if ((this.line2.intersectsMesh(this.player.box, false)) || (this.line3.intersectsMesh(this.player.box, false))){
			// inimigo acompanha
		}
	},
	
	collidedWithPlayer : function ()
	{
		if ((this.box.intersectsMesh(this.player.box, false))){
			//the game ends when the player touchs the enemy
			this.player.destroy();
			var music = new BABYLON.Sound("Music", "sounds/game_over.wav", this.scene,
			function () {
			// Sound has been downloaded & decoded
			music.play();
			},{ loop: true, autoplay: true }
			);
			window.location = 'gameover.html';
		}
	},
	
	eraseOldLine: function ()
	{
		this.line1.dispose();
		this.line2.dispose();
		this.line3.dispose();
	}
};
