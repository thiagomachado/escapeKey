// The function onload is loaded when the DOM has been loaded
document.addEventListener("DOMContentLoaded", function ()
{
    game = new Game('renderCanvas');
}, false);

Game = function(canvasId)
{

    this.canvas          = document.getElementById(canvasId);
    this.engine         = new BABYLON.Engine(this.canvas, true);

    this.currentStateId = 0;
    this.currentState   = null;
    this.previousState  = null;
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
        title:"Menu",
        create:function(game)
        {
            return new GameMenu(game);
        }
    },
    { // The stage one state
        title:"Stage One",
        create:function(game)
        {
            return new StageOne(game);
        }
    },
    { // The stage one state
        title:"Stage Two",
        create:function(game)
        {
            return new StageTwo(game);
        }
    },
    { // you win state
        title:"You Win",
        create:function(game)
        {
            return new YouWin(game);
        }
    },
    { // The final state
        title:"Game Over",
        create:function(game)
        {
            return new GameOver(game);
        }
    }
];


Game.prototype =
{

    runNextState : function()
    {
        this.previousState = this.currentState;
        //stop music of state
        if (this.previousState != null)
        {
          this.previousState.music.stop();
        }
        // The starting state of the game        
        this.currentState = Game.STATES[this.currentStateId].create(this);

        // Create the starting scene
        this.currentState.run();
        this.currentStateId ++;
    },

    runLastState : function()
    {
      this.currentStateId = 4;
      this.runNextState();
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
