// The function onload is loaded when the DOM has been loaded
document.addEventListener("DOMContentLoaded", function ()
{
    new Game('renderCanvas');
}, false);

window.addEventListener("resize", function ()
{
  canvas = document.getElementById("renderCanvas");
  engine = new BABYLON.Engine(canvas, true);
  engine.resize();
});

Game = function(canvasId)
{

    var canvas          = document.getElementById(canvasId);
    this.engine         = new BABYLON.Engine(canvas, true);

    this.currentStateId = 0;
    this.currentState   = null;

    // Contains all players. Each object is a player object
    this.players        = [];

    this.runNextState();

};

/**
 * The games states.
 */
Game.STATES =
[
    { // The starting state
        title:"Player select",
        create:function(game)
        {
            return new GameState(game);
        }
    }
];


Game.prototype =
{

    runNextState : function()
    {

        // The starting state of the game
        this.currentState = Game.STATES[this.currentStateId].create(this);

        // Create the starting scene
        this.currentState.run();

    },

    /**
     * Add a player into the game
     * @param gamepad The gamepad used by the player
     */
    addPlayer : function(gamepad)
    {
        var player = new Player(this, this.currentState.scene, gamepad);
        this.players[gamepad.id] = player;
    },

    /**
     * Removes a player from the game
     * @param gamepad The disconnected gamepad
     */
    removePlayer : function(scene, gamepad)
    {
        this.players[gamepad.id].destroy();
    },

    addEnemy : function(gamepad)
    {
        var enemy = new enemy(this, this.currentState.scene);
    },

    removeEnemy : function(scene)
    {
        this.enemy.destroy();
    },

	addKey : function()
    {
        var key = new Key(this, this.currentState.scene);
    },

    removeKey : function(scene)
    {
        this.key.destroy();
    }

};
