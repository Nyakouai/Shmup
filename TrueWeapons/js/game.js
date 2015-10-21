/* 
/// TODO ///
 #Cooldown pour bombes
 #Hitbox des bullets
////////////
*/

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

var background = null;
var foreground = null;

var player = null;
var cursors = null;
var speed = 300;

var weapons = [];
var weaponLevel = 0;

var powerupItems;
var bombItems;

var textBombs;
var countBombs = 3;

var textControls;
var debugText;


function preload() {
    game.load.image('background','assets/back.png');
    game.load.image('player','assets/shipV.png');

    for (var i = 1; i <= 11; i++)
    {
        game.load.image('bullet' + i, 'assets/bullet' + i + '.png');
    }

    game.load.spritesheet('fireball','assets/fireballs.png',28,26);
    game.load.image('powerup','assets/powerup.png');
    game.load.image('bomb','assets/bomb.png');
}

function create() {
    game.renderer.renderSession.roundPixels = true;
    game.physics.startSystem(Phaser.Physics.ARCADE);

    background = game.add.tileSprite(0, 0, game.width, game.height, 'background');
    background.autoScroll(0, 40);

    weapons.push(new Weapon.BulletLvl1(game));
    weapons.push(new Weapon.BulletLvl2(game));
    weapons.push(new Weapon.BulletLvl3(game));
    weapons.push(new Weapon.Fireball(game));

    weaponLevel = 0;

    for (var i = 1; i < weapons.length; i++)
    {
        weapons[i].visible = false;
    }

    powerupItems = new Collectible.Powerup(game);
    powerupItems.enableBody = true;
    bombItems = new Collectible.Bomb(game);
    bombItems.enableBody = true;

    game.time.events.repeat(2000, 100, spawnItem, this);

    player = game.add.sprite(400, 500, 'player');
    player.anchor.set(0.5,0.5);
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
    player.body.setSize(12,10,0,0);

    cursors = game.input.keyboard.createCursorKeys();
    game.input.keyboard.addKeyCapture([Phaser.Keyboard.A]);

    var bombKey = game.input.keyboard.addKey(Phaser.Keyboard.Z);
    bombKey.onDown.add(launchBomb, this);

    textBombs = game.add.text(10,10,'Bombs: '+countBombs,{font:'12px monospace',fill:'#fff'});
    textControls = game.add.text(650,10,'A: Shoot - Z: Bomb',{font:'12px monospace',fill:'#fff'});

    debugText = game.add.text(10,30,game.time.time,{font:'12px monospace',fill:'#fff'});
}

function update() {
    player.body.velocity.set(0);

    if (cursors.left.isDown)
    {
        player.body.velocity.x = -speed;
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = speed;
    }

    if (cursors.up.isDown)
    {
        player.body.velocity.y = -speed;
    }
    else if (cursors.down.isDown)
    {
        player.body.velocity.y = speed;
    }

    if (game.input.activePointer.isDown &&
        game.physics.arcade.distanceToPointer(player)>15) {
        game.physics.arcade.moveToPointer(player, speed);
    }

    if (game.input.keyboard.isDown(Phaser.Keyboard.A))
    {
        weapons[weaponLevel].fire(player);
    }

    game.physics.arcade.overlap(player, powerupItems, playerPowerup, null, this);
    game.physics.arcade.overlap(player, bombItems, playerBomb, null, this);

    
}

function render() {
    game.debug.body(player);
    /*
    weapons[currentWeapon].forEach(function (bullet)) {
        game.debug.body(bullet);
    }
    */
}

function launchBomb() {
    if(countBombs>0){
        countBombs--;
        textBombs.text = 'Bombs: ' + countBombs;
        weapons[3].visible = true;
        weapons[3].fire(player);
    }
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

    if(weaponLevel < 2){
        weaponLevel++;
    }

    weapons[weaponLevel].visible = true;
}

function playerBomb(player, bomb) {
    bomb.kill();
    countBombs++;
    textBombs.text = 'Bombs: ' + countBombs;
}