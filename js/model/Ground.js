var Ground = function (scene,x,y,z)
{
  this.scene                   = scene;
  this.positionX               = x;
  this.positionY               = y;
  this.positionZ               = z;

  // Ground creation
  var ground = BABYLON.Mesh.CreateGround("ground", this.positionX , this.positionY, this.positionZ , this.scene);

  var groundMaterial = new BABYLON.StandardMaterial("groundMaterial",this.scene);
  var groundTexture = new BABYLON.Texture('js/shaders/ground.jpg', this.scene);
  ground.receiveShadows = true;

  groundMaterial.diffuseTexture = groundTexture;
  ground.material = groundMaterial;

  ground.setPhysicsState(BABYLON.PhysicsEngine.BoxImpostor, {mass:0, restitution:0.5, friction:0.1});
}
