Level = function(game) {
	this.game = game;

	Phaser.TileSprite.call(this, game, 0, 0, 800, 5688, 'background');
	this.autoScroll(0, 50);

	this.progress = 0;
	this.enemies = [];

	game.add.existing(this);
}

Level.prototype = Object.create(Phaser.TileSprite.prototype);
Level.prototype.constructor = Level;

Level.prototype.update = function() {
	/****** Vague 1 ******
	 *Enemy1:
	 	-number		: 10
	 	-spawn(x,y)	: (100, -30)
	 	-speed		: 80
	 *EnemyPowerup:
	 	-number		: 1
	 	-spawn(x,y) : (540, -30)
	 	-speed		: 100
	*********************/
	/*if(this.progress == 200){
		this.game.time.events.repeat(500, 10, this.enemies[0].appear, 
			this.enemies[0], 100, -30, 80);
	}
	if(this.progress == 500){
		this.enemies[1].appear(540, -30, 100);
		//this.game.time.events.repeat(3000, 100, this.enemies[1].appear,
		//	this.enemies[1], "random", -30, 80);
	}
*/
	if(this.progress == 0){
		this.enemies[2].appear(700, 100, 0);
		this.enemies[2].appear(100, 100, 0);
		this.enemies[3].appear(400, 100, 140);
	}

	this.progress++;
};