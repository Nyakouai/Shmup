Level = function(game) {
	this.game = game;

	Phaser.TileSprite.call(this, game, 0, 0, 800, 5688, 'background');

	this.autoScroll(0, 50);
	game.add.existing(this);
}

Level.prototype = Object.create(Phaser.TileSprite.prototype);
Level.prototype.constructor = Level;

Level.prototype.update = function() {

};