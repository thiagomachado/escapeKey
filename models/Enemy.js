var Enemy = function(scene, gamepad)
{

    //this.game = game;
    this.scene = scene;
    this.gamepad = gamepad;

    /* MESH */
    this.box = BABYLON.Mesh.CreateBox("enemy", 10, this.scene);
    this.box.position.y = 2;
    this.body = this.box.setPhysicsState(BABYLON.PhysicsEngine.BoxImpostor, {mass:1, friction:0.1, restitution:0.1});
    var matos = new BABYLON.StandardMaterial("matos", this.scene);
    matos.diffuseColor = BABYLON.Color3.Red();
    this.box.material = matos;

    // The player speed
    this.speed = 0.8;

    // The player vision range
    this.visionRange = BABYLON.Mesh.CreateSphere("vision", 10, this.scene);
    this.visionRange.position.y = this.position;

    /* GAMEPAD*/
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
        this.move();
    },


    _chooseDirection : function(direction, value)
    {
        this.mvtDirection[direction] = value;
    },

    /*vision : function(){
        p_pos = game.Player.mvtDirection;

        if ()

    },*/

    move : function()
    {

        var s = 5;
/*
        if (this.mvtDirection[0] != 0) {
            this.box.applyImpulse(new BABYLON.Vector3(0,0,s), this.box.position);
        }
        if (this.mvtDirection[1] != 0) {
            this.box.applyImpulse(new BABYLON.Vector3(0,0,-s), this.box.position);
        }
        if (this.mvtDirection[2] != 0) {
            this.box.applyImpulse(new BABYLON.Vector3(-s,0,0), this.box.position);
        }
        if (this.mvtDirection[3] != 0) {
            this.box.applyImpulse(new BABYLON.Vector3(s,0,0), this.box.position);
        }
        this.body.body.linearVelocity.scaleEqual(0.92);
        this.body.body.angularVelocity.scaleEqual(0);
        */
    },



    destroy : function()
    {
        this.box.dispose();
    }
};
