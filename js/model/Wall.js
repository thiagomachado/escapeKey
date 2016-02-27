var Wall = function (scene,x,y,z,scaleU,scaleV,scaling)
{
  this.scene                   = scene;
  this.positionX               = x;
  this.positionY               = y;
  this.positionZ               = z;
  this.scaleU                  = scaleU;
  this.scaleV                  = scaleV;
  this.scaling                 = scaling; //Scaling gets a BABYLON.Vector3

  var wallMaterial             = new BABYLON.StandardMaterial("wallMaterial", scene);
  var wallDiffuseTexture       = new BABYLON.Texture("js/shaders/wall.jpg", scene);
  var wallBumpTexture          = new BABYLON.Texture("js/shaders/wallBump.jpg", scene);
  var wallSpecularTexture      = new BABYLON.Texture("js/shaders/wallBump.jpg", scene);
  var wall                     = BABYLON.Mesh.CreateBox("box", 10, scene);

  wallMaterial.diffuseTexture  = wallDiffuseTexture;
  wallMaterial.bumpTexture     = wallBumpTexture;
  wallMaterial.specularTexture = wallSpecularTexture;
  wallDiffuseTexture.uScale    = this.scaleU;
  wallDiffuseTexture.vScale    = this.scaleV;

  wall.scaling                 = scaling;
  wall.position.z              = this.positionZ;
  wall.position.y              = this.positionY;
  wall.position.x              = this.positionX;
  wall.material                = wallMaterial;

  wall.setPhysicsState(BABYLON.PhysicsEngine.BoxImpostor, {mass:0, restitution:0.5, friction:0.1});
}
