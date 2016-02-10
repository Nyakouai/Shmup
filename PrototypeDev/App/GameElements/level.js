var Level = {}

Level.Level1 = function(game) {
	this.game = game;

	Phaser.TileSprite.call(this, game, 0, 0, 800, 5688, 'background');
	this.autoScroll(0, 50);

	this.progress = 0;
	this.enemies = [];
	//this.test = true;

	game.add.existing(this);
}

Level.Level1.prototype = Object.create(Phaser.TileSprite.prototype);
Level.Level1.prototype.constructor = Level.Level1;

Level.Level1.prototype.update = function() {
	/****** Vague 1 ******
	 *Enemy1:
	 	-number		: 5
	 	-spawn(x,y)	: (300, -30)
	 	-speed		: 3
	 *Enemy1Bis:
	 	-number		: 5
	 	-spawn(x,y)	: (500, -30)
	 	-speed		: 3
	 *EnemyPowerup:
	 	-number		: 1
	 	-spawn(x,y) : (400, -30)
	 	-speed		: 100
	*********************/
	if(this.progress == 200){
		this.enemies[4].appear(400, -30, 100);
	}
	if(this.progress == 400){
		this.game.time.events.repeat(1000, 5, this.enemies[0].appear, 
			this.enemies[0], 300, -30, 3);
		this.game.time.events.repeat(1000, 5, this.enemies[1].appear, 
			this.enemies[1], 500, -30, 3);
	}

	/****** Vague 2 ******
	 *Enemy2:
	 	-number		: 20
	 	-spawn(x,y)	: (rand, -30)
	 	-speed		: 100
	 *EnemyPowerup:
	 	-number		: 1
	 	-spawn(x,y) : (540, -30)
	 	-speed		: 100
	*********************/
	if(this.progress == 1000){
		this.game.time.events.repeat(1000, 20, this.enemies[2].appear, 
			this.enemies[2], "random", -30, 100);
	}
	if(this.progress == 1500){
		this.enemies[4].appear(540, -30, 100);
	}
		
	/****** Vague 3 ******
	 *Enemy3:
	 	-number		: 30
	 	-spawn(x,y)	: (rand, -30)
	 	-speed		: 400
	 *EnemyBomb:
	 	-number		: 1
	 	-spawn(x,y) : (540, -30)
	 	-speed		: 100
	*********************/
	if(this.progress == 2500){
		this.game.time.events.repeat(300, 30, this.enemies[3].appear, 
			this.enemies[3], "random", -30, 400);
	}
	if(this.progress == 3000){
		this.enemies[5].appear(540, -30, 100);
	}

	/****** BOSS ******
	 *EnemyTowerBoss:
	 	-number		: 2
	 	-spawn(x,y)	: (100, -20) & (700, -20)
	 	-speed		: 50
	 *Boss1:
	 	-number		: 1
	 	-spawn(x,y) : (400, 100)
	 	-speed		: 140
	*******************/
	if(this.progress == 3500){		
		this.enemies[6].appear(700, -20, 50);
		this.enemies[6].appear(100, -20, 50);
	}
	if(this.progress == 3750){
		this.autoScroll(0, 0);
		this.enemies[7].appear(400, -60, 140);
	}

	this.progress++;
};

Level.Level1.prototype.saveData = function() {
	store.set('level.progress', this.progress);
	store.set('level.tilePosition', this.tilePosition);
};

Level.Level1.prototype.loadData = function() {
	this.progress = store.get('level.progress');
	this.tilePosition = store.get('level.tilePosition');
};



Level.Level2 = function(game) {
	this.game = game;

	Phaser.TileSprite.call(this, game, 0, 0, 800, 5688, 'background');
	this.autoScroll(0, 50);

	this.progress = 0;
	this.enemies = [];
	//this.test = true;

	game.add.existing(this);
}

Level.Level2.prototype = Object.create(Phaser.TileSprite.prototype);
Level.Level2.prototype.constructor = Level.Level1;

Level.Level2.prototype.update = function() {
	if(this.progress == 200){
		this.game.time.events.repeat(500, 10, this.enemies[0].appear, 
			this.enemies[0], 300, -30, 2);
	}
	if(this.progress == 500){
		this.enemies[1].appear(340, -30, 100);
	}

	this.progress++;
};

Level.Level2.prototype.saveData = function() {
	store.set('level.progress', this.progress);
};

Level.Level2.prototype.loadData = function() {
	this.progress = store.get('level.progress');
};