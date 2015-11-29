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
    this.currentWeapon = 0;
    this.nextShot = 0;
    this.score = 0;
    this.powerup = false;
    this.bomb = false;

    this.anchor.set(0.5, 0.5);

    this.behaviour = Behaviour.Null(game);

    game.physics.arcade.enable(this);

    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
    this.exists = false;

    this.animation = false;
};

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.appear = function(x, y, width, height, speed, health){
	this.exists = true;
	this.reset(x, y, health);
	this.body.setSize(width, height, 0, 0);
	this.behaviour.behave(this, speed);

    if (this.animation){
        this.animations.play('fly');
    }
}

Enemy.prototype.fire = function(player){
	var shotDelay = this.weapons[this.currentWeapon].shotDelay;
	if(this.game.time.time > this.nextShot){
		this.weapons[this.currentWeapon].fire(this, player);
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

    this.exists = false;
}

Enemy.prototype.update = function(){
	if(this.exists){
		this.behaviour.update(this);
	}
}

Enemy.prototype.kill = function(){
	Phaser.Sprite.prototype.kill.call(this);
	this.behaviour.reset(this);
}

var Enemies = {};

////////// Homing bullet enemy /////////////

Enemies.Enemy1 = function(game){
	this.game = game;

	Phaser.Group.call(this, game, game.world, 'Enemy1', false, true, Phaser.Physics.ARCADE);

	this.health = 5;
	this.score = 100;
	//this.speed = 60;

	for (var i = 0; i < 10; i++){
		this.add(new Enemy(game, 'enemy1'), true);
	}

	this.callAll('weapons.push', 'weapons', new Weapon.BulletEnemy1(game));
	this.setAll('animation', true);
    this.setAll('score', this.score);
    //this.setAll('behaviour', new Behaviour.Enemy1(game));
    this.callAll('animations.add','animations','fly',[0,1,2,3],4,true);
    this.callAll('animations.add','animations','hit',[0,1,2,3,0,1,2,3],20,false);
    this.forEach(function (enemy) {
    	enemy.behaviour = new Behaviour.Enemy1(game);
    	enemy.events.onAnimationComplete.add( function (e) {
    		e.play('fly');
    	}, this);
    });

	return this;
};

Enemies.Enemy1.prototype = Object.create(Phaser.Group.prototype);
Enemies.Enemy1.prototype.constructor = Enemies.Enemy1;

Enemies.Enemy1.prototype.appear = function(x, y, speed){
	if(x=="random"){
		x = this.game.rnd.integerInRange(20, 620);
	}

	this.getFirstExists(false).appear(x,y,40,40,speed,this.health);
}

////////// Powerup enemy /////////////

Enemies.EnemyPowerup = function(game){
	this.game = game;

	Phaser.Group.call(this, game, game.world, 'EnemyPowerup', false, true, Phaser.Physics.ARCADE);

	this.health = 5;
	this.score = 50;
	//this.speed = 100;

	for (var i = 0; i < 10; i++){
		this.add(new Enemy(game, 'enemy3'), true);
	}

	//this.callAll('weapons.push', 'weapons', new Weapon.BulletEnemy1(game));
	this.setAll('animation', true);
    this.setAll('score', this.score);
    //this.setAll('behaviour', new Behaviour.EnemyPowerup(game));
    this.setAll('powerup', true);
    this.callAll('animations.add','animations','fly',[0,1],4,true);
    this.callAll('animations.add','animations','hit',[0,1,0,1,0,1,0,1],20,false);
    this.forEach(function (enemy) {
    	enemy.behaviour = new Behaviour.EnemyPowerup(game);
    	enemy.events.onAnimationComplete.add( function (e) {
    		e.play('fly');
    	}, this);
    });

	return this;
};

Enemies.EnemyPowerup.prototype = Object.create(Phaser.Group.prototype);
Enemies.EnemyPowerup.prototype.constructor = Enemies.EnemyPowerup;

Enemies.EnemyPowerup.prototype.appear = function(x, y, speed){
	if(x=="random"){
		x = this.game.rnd.integerInRange(20, 620);
	}

	this.getFirstExists(false).appear(x,y,26,40,speed,this.health);
}

////////// Tower enemy /////////////

Enemies.EnemyTower = function(game){
	this.game = game;

	Phaser.Group.call(this, game, game.world, 'EnemyTower', false, true, Phaser.Physics.ARCADE);

	this.health = 50;
	this.score = 500;
	//this.speed = 100;

	for (var i = 0; i < 10; i++){
		this.add(new Enemy(game, 'building1'), true);
	}

	this.callAll('weapons.push', 'weapons', new Weapon.BulletEnemyTower(game));
	this.setAll('animation', false);
    this.setAll('score', this.score);
    //this.setAll('behaviour', new Behaviour.EnemyPowerup(game));
    //this.setAll('powerup', true);
    //this.callAll('animations.add','animations','fly',[0,1],4,true);
    //this.callAll('animations.add','animations','hit',[0,1,0,1,0,1,0,1],20,false);
    this.forEach(function (enemy) {
    	enemy.behaviour = new Behaviour.EnemyTower(game);
    	//enemy.events.onAnimationComplete.add( function (e) {
    	//	e.play('fly');
    	//}, this);
    });

	return this;
};

Enemies.EnemyTower.prototype = Object.create(Phaser.Group.prototype);
Enemies.EnemyTower.prototype.constructor = Enemies.EnemyTower;

Enemies.EnemyTower.prototype.appear = function(x, y, speed){
	if(x=="random"){
		x = this.game.rnd.integerInRange(20, 620);
	}

	this.getFirstExists(false).appear(x,y,26,40,speed,this.health);
}

////////// Boss 1 /////////////

Enemies.Boss1 = function(game){
	this.game = game;

	Phaser.Group.call(this, game, game.world, 'Boss1', false, true, Phaser.Physics.ARCADE);

	this.health = 200;
	this.score = 2000;
	//this.speed = 100;

	for (var i = 0; i < 10; i++){
		this.add(new Enemy(game, 'enemy2'), true);
	}

	this.callAll('weapons.push', 'weapons', new Weapon.PatternBoss1(game));
	this.callAll('weapons.push', 'weapons', new Weapon.SpreadBoss1(game));
	this.setAll('animation', true);
	this.callAll('scale.setTo', 'scale', 2, 2);
    this.setAll('score', this.score);
    //this.setAll('behaviour', new Behaviour.EnemyPowerup(game));
    //this.setAll('powerup', true);
    this.callAll('animations.add','animations','fly',[0,1],4,true);
    this.callAll('animations.add','animations','hit',[0,1,0,1,0,1,0,1],20,false);
    this.forEach(function (enemy) {
    	enemy.behaviour = new Behaviour.Boss1(game);
    	enemy.events.onAnimationComplete.add( function (e) {
    		e.play('fly');
    	}, this);
    });

	return this;
};

Enemies.Boss1.prototype = Object.create(Phaser.Group.prototype);
Enemies.Boss1.prototype.constructor = Enemies.Boss1;

Enemies.Boss1.prototype.appear = function(x, y, speed){
	if(x=="random"){
		x = this.game.rnd.integerInRange(20, 620);
	}

	this.getFirstExists(false).appear(x,y,26,40,speed,this.health);
}

////////////////////////////////////////////////

var Behaviour = {};

Behaviour.Null = function(game){
	this.game = game;
};

Behaviour.Null.prototype.behave = function(enemy, speed){}

Behaviour.Null.prototype.update = function(enemy){}

Behaviour.Null.prototype.reset = function(enemy){}

/////////
Behaviour.Enemy1 = function(game){
	this.game = game;
	this.speed = 0;
	this.points = {
		//'x':[119,119,119.5,113.5,64.5,-42.5],
		//"y":[-30,54,143,259,384,453]
		//'x':[119,99.5,-76.5],
		//"y":[-29,289,468]
		"x":[119,99.5,-76.5],
		"y":[-40,455,535]
	};
};

Behaviour.Enemy1.prototype.behave = function(enemy, speed){
	//enemy.body.velocity.y = speed;
	this.speed = speed;

	this.path = [];
	this.pi = 0;

	var x = 1/this.game.width;

	for(var i=0; i<=1; i+=x){
		var px = this.game.math.catmullRomInterpolation(this.points.x, i);
		var py = this.game.math.catmullRomInterpolation(this.points.y, i);

		this.path.push( { x: px, y: py } );
	}
}

Behaviour.Enemy1.prototype.update = function(enemy){
	enemy.body.x = this.path[this.pi].x;
	enemy.body.y = this.path[this.pi].y;
	if(this.pi >= this.path.length){
		enemy.kill();
		//delete this;
		//this.pi = 0;
	}
	else{
		this.pi+=2;
		enemy.fire(player);
	}
}

Behaviour.Enemy1.prototype.reset = function(enemy){
	this.behave(enemy, this.speed);
}

/////////
Behaviour.EnemyPowerup = function(game){
	this.game = game;
	this.speed = 0;
	this.timeLimit = 500;
	this.timeOnScreen = 0;
};

Behaviour.EnemyPowerup.prototype.behave = function(enemy, speed){
	this.speed = speed;
}

Behaviour.EnemyPowerup.prototype.update = function(enemy){
	if(this.timeOnScreen < this.timeLimit){
		this.game.physics.arcade.moveToXY(enemy,enemy.x,250,this.speed,500);
	}
	else{
		enemy.body.velocity.x = this.speed;
	}
	this.timeOnScreen++;
}

Behaviour.EnemyPowerup.prototype.reset = function(enemy){
	this.behave(enemy, this.speed);
}

/////////
Behaviour.EnemyTower = function(game){
	this.game = game;
	this.speed = 0;
};

Behaviour.EnemyTower.prototype.behave = function(enemy, speed){
	this.speed = speed;
}

Behaviour.EnemyTower.prototype.update = function(enemy){
	enemy.body.velocity.y = this.speed;
	enemy.fire(player);
}

Behaviour.EnemyTower.prototype.reset = function(enemy){
	this.behave(enemy, this.speed);
}

/////////
Behaviour.Boss1 = function(game){
	this.game = game;
	this.speed = 0;
	this.healthMax = 200;
	this.timeOnScreen = 0;
};

Behaviour.Boss1.prototype.behave = function(enemy, speed){
	this.speed = speed;
}

Behaviour.Boss1.prototype.update = function(enemy){
	enemy.body.velocity.y = this.speed;
	tintDamage(enemy, this.healthMax);

	if(this.timeOnScreen%1000 < 500){
		enemy.currentWeapon = 1; //Spread
	}
	else{
		enemy.currentWeapon = 0; //Pattern
	}

	enemy.fire(player);

	this.timeOnScreen++;
}

Behaviour.Boss1.prototype.reset = function(enemy){
	this.behave(enemy, this.speed);
}