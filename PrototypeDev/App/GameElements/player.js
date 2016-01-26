Player = function(game) {
	this.game = game;
	// Sprite 
	Phaser.Sprite.call(this, game, game.world.width/2, 620, 'player');
	this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;

	// Physic
	this.speed = 300;
	this.life = 3;

	this.appearing = true;
	this.cooldown = false;
	this.timerAppearing = 0;
	this.timerCooldown = 0;

	game.physics.arcade.enable(this);
	this.anchor.setTo(0.45, 0.65);
	this.body.collideWorldBounds = true;
	this.body.setSize(12,16,0,0);
	
	// Inputs
	game.input.keyboard.addKeyCapture([ Phaser.Keyboard.A ]);
	var bombKey = game.input.keyboard.addKey(Phaser.Keyboard.Z);
	bombKey.onDown.add(this.launchBomb, this);

	// Weapons
	this.weapons = [];
	this.weaponLevel = 0;
	this.countBombs = 3;

	this.weapons.push(new Weapon.BulletLvl1(game));
	this.weapons.push(new Weapon.BulletLvl2(game));
	this.weapons.push(new Weapon.BulletLvl3(game));
	this.weapons.push(new Weapon.Fireball(game));

	game.add.existing(this);
};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {
	var game = this.game;
	var cursors = game.input.keyboard.createCursorKeys();
	
	this.timerHandler();

	if(this.appearing){
		game.physics.arcade.moveToXY(player,player.x,500,100,500);
	}
	else{
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
	
		if (game.input.activePointer.isDown)
		{
			this.weapons[this.weaponLevel].fire(this);	
			
			if(game.physics.arcade.distanceToPointer(this)>5) 
			{
				game.physics.arcade.moveToPointer(this, this.speed, game.input.activePointer, 500);
			}
		}

		if (game.input.keyboard.isDown(Phaser.Keyboard.A))
		{
			this.weapons[this.weaponLevel].fire(this);
		}
	}
};

Player.prototype.timerHandler = function(){
	if(this.appearing){
		if(this.timerAppearing < 50){
			this.timerAppearing++;
		}
		else{
			this.appearing = false;
			this.timerAppearing = 0;
			this.cooldown = true;
		}
	}

	if(this.cooldown){
		if(this.timerCooldown == 0){
    		this.game.time.events.repeat(50,32,this.bombCooldown,this);	
		}
		if(this.timerCooldown < 80){
			this.timerCooldown++;
		}
		else{
			this.cooldown = false;
			this.timerCooldown = 0;
		}
	}
};

Player.prototype.takeDamage = function() {
	this.life--;
	this.explode();
	this.game.time.events.add(500, function (){
		this.reset(this.game.world.width/2, 620);
		this.appearing = true;
		this.exists = true;
		this.weaponLevel = 0;
	}, this);
	//this.game.time.create(1000, this.respawn, this);
};

Player.prototype.explode = function(){
	var explosion = this.game.add.sprite(this.x, this.y, 'explosion');
	this.game.physics.arcade.enable(explosion);

    explosion.anchor.setTo(0.5, 0.5);
    explosion.animations.add('boom');
    explosion.play('boom',15,false,true);

    explosion.body.velocity.x = this.body.velocity.x;
    explosion.body.velocity.y = this.body.velocity.y;

    this.exists = false;
};

Player.prototype.respawn = function(){
	this.appearing = true;
	this.exists = true;
};
	
Player.prototype.launchBomb = function() {
	var fireball = this.weapons[3];
	if(this.countBombs>0 && this.game.time.time >= fireball.nextFire) 
	{
    	this.countBombs--;
    	fireball.fire(this);
    	this.cooldown = true;
    	bombText.text = 'Bombs: ' + this.countBombs;
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

Player.prototype.save = function() {
	store.set('x', this.body.x);
	store.set('y', this.body.y);
};

Player.prototype.load = function() {
	this.body.x = store.get('x');
	this.body.y = store.get('y');
};

//Player.prototype.destructor = function() {

//}