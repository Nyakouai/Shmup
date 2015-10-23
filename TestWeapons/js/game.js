var background = null;
var foreground = null;

var player = null;
var cursors = null;
var speed = 300;

var weapons = [];
var currentWeapon = 0;

var textBombs;
var countBombs = 3;

var textControls;


function preload() {
    game.load.image('background','assets/back.png');
    game.load.image('player','assets/shipV.png');

    for (var i = 1; i <= 11; i++)
    {
        this.load.image('bullet' + i, 'assets/bullet' + i + '.png');
    }

    game.load.spritesheet('fireball','assets/fireballs.png',28,26);
}

function create() {
    game.renderer.renderSession.roundPixels = true;
    game.physics.startSystem(Phaser.Physics.ARCADE);

    background = game.add.tileSprite(0, 0, game.width, game.height, 'background');
    background.autoScroll(0, 40);

    weapons.push(new Weapon.SingleBullet(game));
    weapons.push(new Weapon.ThreeWay(game));
    weapons.push(new Weapon.Missile(game));
    weapons.push(new Weapon.Beam(game));
    weapons.push(new Weapon.Pattern(game));
    weapons.push(new Weapon.Fireball(game));

    currentWeapon = 0;

    for (var i = 1; i < weapons.length; i++)
    {
        weapons[i].visible = false;
    }

    player = game.add.sprite(400, 500, 'player');
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
    player.body.setSize(6,5,17,16);

    cursors = game.input.keyboard.createCursorKeys();
    game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
    game.input.keyboard.addKeyCapture([Phaser.Keyboard.B]);

    var changeKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    changeKey.onDown.add(nextWeapon, this);

    textControls = game.add.text(500,10,'SPACEBAR: Shoot - ENTER: Change weapon',{font:'12px monospace',fill:'#fff'});
    textBombs = game.add.text(10,10,'Bombs : '+countBombs,{font:'12px monospace',fill:'#fff'});
}

function update() {
    player.body.velocity.set(0);

    if (currentWeapon == 3){
        weapons[currentWeapon].setAll('body.velocity.x', 0);
    }

    if (cursors.left.isDown)
    {
        player.body.velocity.x = -speed;
        if (currentWeapon == 3){
            weapons[currentWeapon].setAll('body.velocity.x', -speed);
        }
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = speed;
        if (currentWeapon == 3){
            weapons[currentWeapon].setAll('body.velocity.x', speed);
        }
    }

    if (cursors.up.isDown)
    {
        player.body.velocity.y = -speed;
    }
    else if (cursors.down.isDown)
    {
        player.body.velocity.y = speed;
    }

    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
    {
        weapons[currentWeapon].fire(player);
    }
/*
    if (game.input.keyboard.isDown(Phaser.Keyboard.B))
    {
        countBombs--;
        textBombs.text = 'Bombs: ' + countBombs;
        weapons[5].visible = true;
        weapons[currentWeapon].visible = false;
        weapons[currentWeapon].callAll('reset', null, 0, 0);
        weapons[currentWeapon].setAll('exists', false);
        weapons[5].fire(player);
        weapons[5].visible = false;
    }*/
}

function render() {
    game.debug.body(player);
    /*
    weapons[currentWeapon].forEach(function (bullet) {
        game.debug.body(bullet);
    });
    */
}

function nextWeapon() {
    //  Tidy-up the current weapon
    /*if (currentWeapon > weapons.length)
    {
        weapons[currentWeapon].reset();
    }
    else
    {*/
        weapons[currentWeapon].visible = false;
        weapons[currentWeapon].callAll('reset', null, 0, 0);
        weapons[currentWeapon].setAll('exists', false);
    //}

    //  Activate the new one
    currentWeapon++;

    if (currentWeapon == weapons.length)
    {
        currentWeapon = 0;
    }

    weapons[currentWeapon].visible = true;
}