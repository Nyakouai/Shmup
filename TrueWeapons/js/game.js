var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

var background = null;
var foreground = null;

var player = null;

var powerupItems;
var bombItems;

var textBombs;

var textControls;
var debugText;


function preload() {
    game.load.image('background','assets/back.png');

    for (var i = 1; i <= 11; i++)
    {
        game.load.image('bullet' + i, 'assets/bullet' + i + '.png');
    }

    game.load.spritesheet('fireball','assets/fireballs.png',28,26);
    game.load.image('powerup','assets/powerup.png');
    game.load.image('bomb','assets/bomb.png');
    game.load.image('player','assets/shipV.png');
}

function create() {
    game.renderer.renderSession.roundPixels = true;
    game.physics.startSystem(Phaser.Physics.ARCADE);

    background = game.add.tileSprite(0, 0, game.width, game.height, 'background');
    background.autoScroll(0, 40);
    
    powerupItems = new Collectible.Powerup(game);
    powerupItems.enableBody = true;
    bombItems = new Collectible.Bomb(game);
    bombItems.enableBody = true;

    game.time.events.repeat(2000, 100, spawnItem, this);

    player = new Player(game);
    
    textBombs = game.add.text(10,10,'Bombs: '+player.countBombs,{font:'12px monospace',fill:'#fff'});
    textControls = game.add.text(650,10,'A: Shoot - Z: Bomb',{font:'12px monospace',fill:'#fff'});

    debugText = game.add.text(10,30,'',{font:'12px monospace',fill:'#fff'});

    game.time.advancedTiming = true;
}

function update() {
    //player.update();

    game.physics.arcade.overlap(player, powerupItems, playerPowerup, null, this);
    game.physics.arcade.overlap(player, bombItems, playerBomb, null, this);

    textBombs.text = 'Bombs: ' + player.countBombs;

    debugText.text = 'FPS : ' + game.time.fps;
}

function render() {
    game.debug.body(player);
    
    //game.debug.text(game.time.fps || '--', 200, 10, "#00ff00");

    player.weapons[player.weaponLevel].forEach(function (bullet) {
        game.debug.body(bullet);
    });
    
    player.weapons[3].forEach(function (bullet) {
        game.debug.body(bullet);
    });
    
}

function spawnItem() {
    var rand = game.rnd.integerInRange(0,1);

    if (rand) {
        powerupItems.appear();
    }
    else {
        bombItems.appear();
    }

}

function playerPowerup(player, powerup) {
    powerup.kill();
    if(player.weaponLevel < 2){
        player.weaponLevel++;
    }
}

function playerBomb(player, bomb) {
    bomb.kill();
    player.countBombs++;
}