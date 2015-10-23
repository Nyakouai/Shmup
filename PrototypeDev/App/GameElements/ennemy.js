Ennemy = function(game, gEnnemies, x, y, ennemyType) {
	this.game = game;
	this.object;

	this.create(gEnnemies, x, y, ennemyType);
}

Ennemy.prototype = {

	create: function(gEnnemies, x, y, ennemyType) {

		object = gEnnemies.create(x, y, ennemyType);
		object.animations.add('walk');
		object.animations.play('walk', 4, true);
		object.anchor.setTo(0.5, 0.5);
		//this.game.physics.enable(object, Phaser.Physics.ARCADE);
		
		//object.x = this.game.world.bounds.right;
		//object.body.velocity.y = 20;
	},

	update: function() {

	}
};