var Wall = function (scene,x,y,z,width) //acho que largura e altura são fixas, o que muda são só as posições
{	
		var wall = BABYLON.Mesh.CreateBox("box", 20, scene);
		//wall.scaling = new BABYLON.Vector3(width,20,10);
        wall.position.z = z;
		
		var wallMaterial = new BABYLON.StandardMaterial("wallMaterial", scene);
		wallMaterial.emissiveColor = new BABYLON.Color3(0.1, 0.1, 0.15);

		var wallMaterial = new BABYLON.StandardMaterial("wall", scene);
		wallMaterial.diffuseTexture = new BABYLON.Texture("js/shaders/wall.jpg", scene);
		wallMaterial.bumpTexture = new BABYLON.Texture("js/shaders/wallBump.jpg", scene);
		wallMaterial.specularTexture = new BABYLON.Texture("js/shaders/wallNormalMap.jpg", scene);
		wall.material = wallMaterial;
		
        wall.setPhysicsState(BABYLON.PhysicsEngine.BoxImpostor, {mass:0, restitution:0.5, friction:0.1});
}
