Player = function (game) {

	this.game = game;
	this.object;

	this.bullets;
	this.bulletTime

	this.create();
};


Player.prototype = {
	create: function () {
		var game = this.game;

		object = game.add.sprite(game.world.width/2, 600, 'player');
		game.physics.enable(object, Phaser.Physics.ARCADE);
		game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);


		object.anchor.setTo(0.5, 0.5);
		object.body.collideWorldBounds = true;
		object.speed = 200;


		bulletTime = 0;
		bullets = game.add.group();
		bullets.enableBody = true;
		for (var i = 0; i < 10; i++)
		{
			var b = bullets.create(0, 0, 'bullet');
			b.name = 'bullet' + i;
			b.exists = false;
			b.visible = false;
			b.checkWorldBounds = true;
			b.anchor.setTo(0.5, 0.5);
			b.events.onOutOfBounds.add(this.resetBullet, this);
		}


	},

	update: function() {
		var game = this.game;
		var cursors = game.input.keyboard.createCursorKeys();

		object.body.velocity.x = 0;
		object.body.velocity.y = 0;

		if (cursors.left.isDown)
		{
			object.body.velocity.x = -object.speed;
		}
		else if (cursors.right.isDown)
		{
			object.body.velocity.x = object.speed;
		}

		if (cursors.up.isDown)
		{
			object.body.velocity.y = -object.speed;
		}
		else if (cursors.down.isDown)
		{
			object.body.velocity.y = object.speed;
		}
		
		if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
		{
			this.fireBullet();
		}
	},
	
	fireBullet: function() {
		var game = this.game;
		if (game.time.now > bulletTime)
		{
			var bullet = bullets.getFirstExists(false);

			if (bullet)
			{
				bullet.reset(object.x, object.y - 20);
				bullet.body.velocity.y = -BasicGame.BULLET_VELOCITY;
				bulletTime = game.time.now + 150;
			}
		}

	},

	resetBullet: function(bullet) {
		bullet.kill();
	}
};







