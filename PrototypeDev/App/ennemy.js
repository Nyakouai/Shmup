var Ennemy = function(game, gEnnemies, x, y, ennemyType) {
	this.object = gEnnemies.create(x, y, ennemyType);
	this.object.animations.add('walk');
	this.object.animations.play('walk', 4, true);
	this.object.fixedToCamera = true;
	
	this.object.x = game.world.bounds.right;
}

Ennemy.prototype.update = function() {


}