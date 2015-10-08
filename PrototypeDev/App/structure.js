var Structure = function(game, gEnnemies, x, y, ennemyType) {
	Ennemy.call(this, game, gEnnemies, x, y, ennemyType);
	this.object.fixedToCamera = false;
}
//Structure.prototype = new Ennemy();
//Structure.prototype.constructor = Structure;

Structure.prototype.update = function() {

}

