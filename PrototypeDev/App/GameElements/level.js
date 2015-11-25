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
	this.progress += 1;

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
	if(this.progress == 200){
		this.game.time.events.repeat(1000, 10, this.enemies[0].appear, 
			this.enemies[0], 100, -30, 80);
	}
	if(this.progress == 500){
		this.enemies[1].appear(540, -30, 100);
	}
};