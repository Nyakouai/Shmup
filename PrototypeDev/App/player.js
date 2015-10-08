var Player = function(game) {
	this.object = game.add.sprite(game.world.width/2, 1440-190, 'player');
	game.physics.arcade.enable(this.object);
	this.object.body.collideWorldBounds = true;
	
	var cursors = game.input.keyboard.createCursorKeys();
	game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);
	
	var bullet;
	var bulletTime = 0;
	
	this.bullets = game.add.group();
	this.bullets.enableBody = true;
	for (var i = 0; i < 10; i++)
	{
		var b = this.bullets.create(0, 0, 'bullet');
		b.name = 'bullet' + i;
		b.exists = false;
		b.visible = false;
		b.checkWorldBounds = true;
		b.events.onOutOfBounds.add(resetBullet, this);
	}
	
	this.update = function() {
		this.object.body.velocity.x = 0;
		this.object.body.velocity.y = 0;

		if (cursors.left.isDown)
		{
			this.object.body.velocity.x = -200;
		}
		else if (cursors.right.isDown)
		{
			this.object.body.velocity.x = 200;
		}
		
		if (cursors.up.isDown)
		{
			this.object.body.velocity.y = -200;
		}
		else if (cursors.down.isDown)
		{
			this.object.body.velocity.y = 200;
		}
		
		if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
		{
			this.fireBullet();
		}
	}
	
	this.fireBullet = function() {
		if (game.time.now > bulletTime)
		{
			bullet = this.bullets.getFirstExists(false);

			if (bullet)
			{
				bullet.reset(this.object.x + 6, this.object.y - 8);
				bullet.body.velocity.y = -300;
				bulletTime = game.time.now + 150;
			}
		}

	}
}

Player.prototype.collide = function(game, objectToTest) {
	game.physics.arcade.collide(this.object, objectToTest);
}



function resetBullet(bullet) {
	bullet.kill();
}
