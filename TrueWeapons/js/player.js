Player = function (game) {
	Phaser.Sprite.call(this, game, 400, 500, 'player')
    this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;

	this.weapons = [];

	this.speed = 300;

	this.weaponLevel = 0;
	this.countBombs = 3;

	this.weapons.push(new Weapon.BulletLvl1(game));
	this.weapons.push(new Weapon.BulletLvl2(game));
	this.weapons.push(new Weapon.BulletLvl3(game));
	this.weapons.push(new Weapon.Fireball(game));

	game.physics.arcade.enable(this);

	this.anchor.set(0.5, 0.5);
	this.body.collideWorldBounds = true;
	this.body.setSize(12,10,0,0);

	game.input.keyboard.addKeyCapture([Phaser.Keyboard.A]);
	var bombKey = game.input.keyboard.addKey(Phaser.Keyboard.Z);
	bombKey.onDown.add(this.launchBomb, this);

	game.add.existing(this);
};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {
	var cursors = game.input.keyboard.createCursorKeys();

	this.body.velocity.set(0);

	if (cursors.left.isDown)
	{
		this.body.velocity.x = -this.speed;
	}
	else if (cursors.right.isDown)
	{
		this.body.velocity.x = this.speed;
	}

	if (cursors.up.isDown)
	{
		this.body.velocity.y = -this.speed;
	}
	else if (cursors.down.isDown)
	{
		this.body.velocity.y = this.speed;
	}

	if (game.input.activePointer.isDown &&
    	game.physics.arcade.distanceToPointer(this)>15) {
    	game.physics.arcade.moveToPointer(this, this.speed);
	}
	
	if (game.input.keyboard.isDown(Phaser.Keyboard.A))
	{
		this.weapons[this.weaponLevel].fire(this);
	}
};

Player.prototype.launchBomb = function() {
	var fireball = this.weapons[3];
	if(this.countBombs>0 && game.time.time >= fireball.nextFire) {
    	this.countBombs--;
    	fireball.fire(this);
    	game.time.events.repeat(50,32,this.bombCooldown,this);
	}
};

Player.prototype.bombCooldown = function() {
    if (this.tint == 0xFFFFFF) {
        this.tint = 0xFF0000;
    }
    else {
        this.tint = 0xFFFFFF;
    }
};