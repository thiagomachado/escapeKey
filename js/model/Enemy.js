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

		//Indo para cima
        if (this.targetPos.z > this.box.position.z)
		{
			//this.animateRotation();
			this.box.rotate(BABYLON.Axis.Y, 5.0, BABYLON.Space.WORLD);
            this.box.applyImpulse(new BABYLON.Vector3(0,0,s), this.box.position);
        }
        //Indo para baixo
        if (this.targetPos.z < this.box.position.z)
		{
            //this.animateRotation();
			this.box.rotate(BABYLON.Axis.Y, 5.0, BABYLON.Space.WORLD);
            this.box.applyImpulse(new BABYLON.Vector3(0,0,-s), this.box.position);
        }
        //Indo para esquerda
        if (this.targetPos.x < this.box.position.x)
		{
            //this.animateRotation();
			this.box.rotate(BABYLON.Axis.Y, 5.0, BABYLON.Space.WORLD);
            this.box.applyImpulse(new BABYLON.Vector3(-s,0,0), this.box.position);
        }
        //Indo para direita
        if (this.targetPos.x > this.box.position.x)
		{
            //this.animateRotation();
			this.box.rotate(BABYLON.Axis.Y, 5.0, BABYLON.Space.WORLD);
            this.box.applyImpulse(new BABYLON.Vector3(s,0,0), this.box.position);
        }
        this.body.body.linearVelocity.scaleEqual(0.92);
        this.body.body.angularVelocity.scaleEqual(0);
	},

    chooseDirection : function()
    {
    	if (this.haventSeen)
    	{
			//Looking Up
	        if (this.mvtDirection[0] != 0) {
				//Front ray
				this.ray1 = new BABYLON.Ray(new BABYLON.Vector3(this.box.position.x, this.box.position.y, this.box.position.z), new BABYLON.Vector3(this.box.position.x, this.box.position.y, (150 - this.box.position.z)));
				this.newPick = this.scene.pickWithRay(this.ray1).pickedPoint;
				this.visionLight = new BABYLON.SpotLight("visionLight", new BABYLON.Vector3(this.box.position.x, this.box.position.y, this.box.position.z),
					this.newPick, Math.PI/2, 0, this.scene);
				this.visionLight.diffuse = new BABYLON.Color3(1, 0, 0);
				this.visionLight.specular = new BABYLON.Color3(1, 0, 0);
				this.visionLight.intensity = 50;
				
	        }
			//Looking Down
	        if (this.mvtDirection[1] != 0) {
				//Front ray
				this.ray1 = new BABYLON.Ray(new BABYLON.Vector3(this.box.position.x, this.box.position.y, this.box.position.z), new BABYLON.Vector3(this.box.position.x, this.box.position.y, (-150 - this.box.position.z)));
				this.newPick = this.scene.pickWithRay(this.ray1).pickedPoint;
				this.visionLight = new BABYLON.SpotLight("visionLight", new BABYLON.Vector3(this.box.position.x, this.box.position.y, this.box.position.z),
					this.newPick, Math.PI/2, 0, this.scene);
				this.visionLight.diffuse = new BABYLON.Color3(1, 0, 0);
				this.visionLight.specular = new BABYLON.Color3(1, 0, 0);
				this.visionLight.intensity = 50;
				
			}
			//Looking to the Right
	        if (this.mvtDirection[2] != 0) {
				//Front ray
				this.ray1 = new BABYLON.Ray(new BABYLON.Vector3(this.box.position.x, this.box.position.y, this.box.position.z), new BABYLON.Vector3((150 - this.box.position.x), this.box.position.y, this.box.position.z));
				this.newPick = this.scene.pickWithRay(this.ray1).pickedPoint;
				this.visionLight = new BABYLON.SpotLight("visionLight", new BABYLON.Vector3(this.box.position.x, this.box.position.y, this.box.position.z),
					this.newPick, Math.PI/2, 0, this.scene);
				this.visionLight.diffuse = new BABYLON.Color3(1, 0, 0);
				this.visionLight.specular = new BABYLON.Color3(1, 0, 0);
				this.visionLight.intensity = 50;
				
	        }
	        if (this.mvtDirection[3] != 0) {
				//Front ray
				this.ray1 = new BABYLON.Ray(new BABYLON.Vector3(this.box.position.x, this.box.position.y, this.box.position.z), new BABYLON.Vector3((-150 - this.box.position.x), this.box.position.y, this.box.position.z));
				this.newPick = this.scene.pickWithRay(this.ray1).pickedPoint;
				this.visionLight = new BABYLON.SpotLight("visionLight", new BABYLON.Vector3(this.box.position.x, this.box.position.y, this.box.position.z),
					this.newPick, Math.PI/2, 0, this.scene);
				this.visionLight.diffuse = new BABYLON.Color3(1, 0, 0);
				this.visionLight.specular = new BABYLON.Color3(1, 0, 0);
				this.visionLight.intensity = 50;
				
	        }  
	    }
	     
	    else
	    {
	      	this.ray1 = new BABYLON.Ray(new BABYLON.Vector3(this.box.position.x, this.box.position.y, this.box.position.z), this.targetPos);
			this.line1 = BABYLON.Mesh.CreateLines("line1", [new BABYLON.Vector3(this.box.position.x, this.box.position.y, this.box.position.z), this.targetPos], this.scene);
		    this.line1.Color = new BABYLON.Color3(1, 0, 0);
			//this.newPick = this.scene.pickWithRay(this.ray1).pickedPoint;
			this.newPick = this.targetPos;
			this.visionLight = new BABYLON.SpotLight("visionLight", new BABYLON.Vector3(this.box.position.x, this.box.position.y, this.box.position.z),
					this.targetPos, Math.PI/2, 0, this.scene);
			this.visionLight.diffuse = new BABYLON.Color3(1, 0, 0);
			this.visionLight.specular = new BABYLON.Color3(1, 0, 0);
			this.visionLight.intensity = 50;
			
	    }

	    this.matrix1 = new BABYLON.Matrix.RotationY(Math.PI / 5,7);
		this.P1 = new BABYLON.Vector3.TransformCoordinates(this.newPick, this.matrix1);
		this.matrix2 = new BABYLON.Matrix.RotationY(-Math.PI / 5,7);
		this.P2 = new BABYLON.Vector3.TransformCoordinates(this.newPick, this.matrix2);

		this.visionRange(this.P1.x, this.P2.x, 0, this.P1.z, this.P2.z);
    },

    animateRotation : function () 
    {
        var rotationQuaternion = BABYLON.Quaternion.RotationAxis(BABYLON.Axis.Y, Math.PI/5);
        var end = this.box.rotationQuaternion.multiply(rotationQuaternion);

        var start = this.box.rotationQuaternion;

        // Create the Animation object
        var animateEnding = new BABYLON.Animation(
            "moveY",
            "rotationQuaternion",
            50,
            BABYLON.Animation.ANIMATIONTYPE_QUATERNION,
            BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE);

        // Animations keys
        var keys = [];
        keys.push({
            frame: 0,
            value: start
        },{
            frame: 50,
            value: end
        });

        // Add these keys to the animation
        animateEnding.setKeys(keys);

        // Link the animation to the mesh
        this.box.animations.push(animateEnding);

        // Run the animation !
        this.scene.beginAnimation(this.box, 0, 100, false, 1);

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
		this.oldPick = this.newPick;
	},
	
	seenPlayer : function()
	{
		if (this.lines.intersectsMesh(this.player.box, false)){
			// inimigo acompanha
			this.haventSeen = false;
			console.log("viu");
			this.targetPos = new BABYLON.Vector3(this.player.box.position.x, this.player.box.position.y, this.player.box.position.z);
			this.move();
			//this.eraseVisionRange();
		}
		else{
			console.log("nao viu");
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
	
	eraseVisionRange: function ()
	{
		this.lines.dispose();
		this.visionLight.dispose();
	}
};
