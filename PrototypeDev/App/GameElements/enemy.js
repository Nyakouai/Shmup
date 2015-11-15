/*
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
*/

Enemy = function(game, key) {
	this.game = game;

	Phaser.Sprite.call(this, game, 0, 0, key)
    this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;

    this.weapons = [];
    this.nextShot = 0;
    this.score = 0;

    this.anchor.set(0.5, 0.5);

    game.physics.arcade.enable(this);

    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
    this.exists = false;

    this.animation = false;
};

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.appear = function(x, y, width, height, speed, health){
	this.reset(x, y, health);
	this.body.setSize(width, height, 0, 0);
	this.body.velocity.y = speed;

    if (this.animation){
        this.animations.play('fly');
    }
}

Enemy.prototype.fire = function(player){
	var shotDelay = this.weapons[0].shotDelay;
	if(this.game.time.time > this.nextShot){
		this.weapons[0].fire(this, player);
		this.nextShot = this.game.time.time + shotDelay;
	}
}

Enemy.prototype.explode = function(){
	var explosion = this.game.add.sprite(this.x, this.y, 'explosion');
	this.game.physics.arcade.enable(explosion);

    explosion.anchor.setTo(0.5, 0.5);
    explosion.animations.add('boom');
    explosion.play('boom',15,false,true);

    explosion.body.velocity.x = this.body.velocity.x;
    explosion.body.velocity.y = this.body.velocity.y;
}

Enemy.prototype.update = function(){

}

var Enemies = {};

////////// Homing bullet enemy /////////////

Enemies.Enemy1 = function(game){
	this.game = game;

	Phaser.Group.call(this, game, game.world, 'Enemy1', false, true, Phaser.Physics.ARCADE);

	this.health = 5;
	this.score = 100;
	this.speed = 60;

	for (var i = 0; i < 10; i++){
		this.add(new Enemy(game, 'enemy1'), true);
	}

	this.callAll('weapons.push', 'weapons', new Weapon.BulletEnemy1(game));
	this.setAll('animation', true);
    this.setAll('score', this.score);
    this.callAll('animations.add','animations','fly',[0,1,2,3],4,true);
    this.callAll('animations.add','animations','hit',[0,1,2,3,0,1,2,3],20,false);
    this.forEach(function (enemy) {
    	enemy.events.onAnimationComplete.add( function (e) {
    		e.play('fly');
    	}, this);
    });

	return this;
};

Enemies.Enemy1.prototype = Object.create(Phaser.Group.prototype);
Enemies.Enemy1.prototype.constructor = Enemies.Enemy1;

Enemies.Enemy1.prototype.appear = function(){
	var x = this.game.rnd.integerInRange(20, 380);
	var y = -30;

	this.getFirstExists(false).appear(x,y,40,40,this.speed,this.health);
}