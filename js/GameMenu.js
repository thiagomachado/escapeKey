var GameMenu = function(game)
{
    State.call(this, game);

    // All gamepad id currently connected
    this.gamepadIds = [];
};

GameState.prototype = Object.create(State.prototype);
GameState.prototype.constructor = GameMenu;
GameState.prototype =
{
    _initScene : function(){
    // the red component of rgb
        var hue = 0; 
        var direction = 1; 
        var transitioning = false;
        var wasButtonDown = false;
        var ctx = document.getElementById('canvas').getContext('2d');

        function centerText(ctx, text, y) {
            var measurement = ctx.measureText(text);
            var x = (ctx.canvas.width - measurement.width) / 2;
            ctx.fillText(text, x, y);
        }
        // draw the main menu to the canvas
        function draw(ctx) {
            var y = ctx.canvas.height / 2;
            var color = 'rgb(' + hue + ',0,0)';
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.fillStyle = 'white';
            ctx.font = '48px monospace';
            centerText(ctx, 'Escape Key', y);
            ctx.fillStyle = color;
            ctx.font = '24px monospace';
            centerText(ctx, 'click to begin', y + 30);
        }

        function update() {
            hue += 1 * direction;
            if (hue > 255) direction = -1;
            if (hue < 0) direction = 1;
            var isButtonDown = this.isButtonDown();
            var mouseJustClicked = !isButtonDown && wasButtonDown;
            if (mouseJustClicked && !transitioning) {
                transitioning = true;
                this.currentStateId = 1;
            }
            wasButtonDown = isButtonDown;
        }

    };

    run : function(){

        this.scene = this._initScene();
        // The loader
        var loader =  new BABYLON.AssetsManager(this.scene);

        //    var meshTask = this.loader.addMeshTask("skull task", "", "./assets/", "block02.babylon");
        //    meshTask.onSuccess = this._initMesh;

        var _this = this;
        loader.onFinish = function (tasks)
        {

            draw(ctx);
            update();
            // Init the game
            //_this._initGame();

            // The state is ready to be played
            //_this.isReady = true;

            _this.engine.runRenderLoop(function ()
            {
                _this.scene.render();
            });
        };
        loader.load();
    },
};






// `input` will be defined elsewhere, it's a means
// for us to capture the state of input from the player

var GameMenu = function(game) {

    // the red component of rgb
    var hue = 0; 
    var direction = 1; 
    var transitioning = false;
    var wasButtonDown = false;

    function centerText(ctx, text, y) {
        var measurement = ctx.measureText(text);
        var x = (ctx.canvas.width - measurement.width) / 2;
        ctx.fillText(text, x, y);
    }
    
    // draw the main menu to the canvas
    function draw(ctx, elapsed) {
        var y = ctx.canvas.height / 2;
        var color = 'rgb(' + hue + ',0,0)';
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = 'white';
        ctx.font = '48px monospace';
        centerText(ctx, 'Escape Key', y);
        ctx.fillStyle = color;
        ctx.font = '24px monospace';
        centerText(ctx, 'click to begin', y + 30);
    }

    function update() {
        hue += 1 * direction;
        if (hue > 255) direction = -1;
        if (hue < 0) direction = 1;
        var isButtonDown = input.isButtonDown();
        var mouseJustClicked = !isButtonDown && wasButtonDown;
        if (mouseJustClicked && !transitioning) {
            transitioning = true;
            // do something here to transition to the actual game
        }
        wasButtonDown = isButtonDown;
    }

    // this is the object that will be `startScreen`
    return {
        draw: draw,
        update: update
    };

}());

