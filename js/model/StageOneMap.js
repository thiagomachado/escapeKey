var StageOneMap = function (scene,groundMaterial,wallMaterial)
{
  this.scene = scene;

  //create ground
  var ground = new Ground(this.scene, 302,300,1,groundMaterial);

  //create walls
  var wall  = new Wall(this.scene,0,5,-150,4,1,new BABYLON.Vector3(30,1,0.2));
  var wall2 = new Wall(this.scene,0,5,150,4,1,new BABYLON.Vector3(30,1,0.2));
  //door on wall3
  var wall3 = new Wall(this.scene,150,5,-10,1,4,new BABYLON.Vector3(0.2,1,28));
  var wall4 = new Wall(this.scene,-150,5,0,1,4,new BABYLON.Vector3(0.2,1,30));

  var wall5 = new Wall(this.scene,-75,5,75,1,4,new BABYLON.Vector3(0.2,1,15));
  var wall6 = new Wall(this.scene,75,5,75,1,4,new BABYLON.Vector3(0.2,1,15));
  var wall7 = new Wall(this.scene,0,5,-70,4,1,new BABYLON.Vector3(15,1,0.2));
}
