
Ennemy = function(game, gEnnemies, x, y, ennemyType) {
	this.game = game;

	this.create(gEnnemies, x, y, ennemyType);
}

Ennemy.prototype = {

	create: function(gEnnemies, x, y, ennemyType) {

		this.sprite = gEnnemies.create(x, y, ennemyType);
		this.sprite.animations.add('walk');
		this.sprite.animations.play('walk', 4, true);
		this.sprite.anchor.setTo(0.5, 0.5);
		//this.game.physics.enable(sprite, Phaser.Physics.ARCADE);
		
		//sprite.x = this.game.world.bounds.right;
		this.sprite.body.velocity.y = 60;
	},

	update: function() {

	}
};
/*

Enemy = function(game, key) {
	Phaser.Sprite.call(this, game, 0, 0, key)
    this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;

    this.weapons = [];

    this.anchor.set(0.5, 0.5);

    game.physics.arcade.enable(this);

    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
    this.exists = false;
};

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.appear = function(x, y, speed){

}

Enemy.prototype.fire = function(){

}

Enemy.prototype.update = function(){

}

var Enemies = {};

////////// Homing bullet enemy /////////////

Enemies.Enemy1 = function(game){
	Phaser.Group.call(this, game, game.world, 'Enemy1', false, true, Phaser.Physics.ARCADE);

	this.health = 2;
	this.score = 100;

	for (var i = 0; i < 10; i++){
		this.add(new Enemy(game, 'enemy1'), true);
	}

	this.callAll('weapons.push',)
};

Enemies.Enemy1.prototype = Object.create(Phaser.Group.prototype);
Enemies.Enemy1.prototype.constructor = Enemies.Enemy1;

Enemies.Enemy1.prototype.behaviour = function(){

}*/