/*
 * ENSICAEN
 * 6 Boulevard Marechal Juin 
 * F-14050 Caen Cedex 
 * 
 * This file is owned by ENSICAEN students.
 * No portion of this document may be reproduced, copied
 * or revised without written permission of the authors.
*/

/**
 * @fileOverview Controller of the game
 * @author Bruyère Julien
 * @version 0.5
 */

/**
 * @class Controller of the game
 * @param {Game} game Accessor of the Phaser's game object
 */
BasicGame.Game = function (game) {
	var level;
	var player;
	var enemies;

	var powerupItems;
	var bombItems;
	
	var score;
	var scoreText;

	//var nextRandomEnnemySpawn;
};

BasicGame.Game.prototype = {

	/**
	 * Constructor of the game
	 * @public
	 */
	create: function () {
  		this.game.renderer.renderSession.roundPixels = true;
		this.physics.startSystem(Phaser.Physics.ARCADE);
	
		level = new Level(this.game);
		
		player = new Player(this.game);
		/*
		gEnnemies = this.add.group();
		gEnnemies.enableBody = true;
		
		new Ennemy(this, gEnnemies, 60, 50, 'enemy1');
		new Ennemy(this, gEnnemies, 20, 100, 'enemy1');
		new Ennemy(this, gEnnemies, 170, 150, 'enemy2');
		new Ennemy(this, gEnnemies, 230, 150, 'enemy2');
		new Ennemy(this, gEnnemies, 280, 50, 'enemy3');
		new Ennemy(this, gEnnemies, 330, 100, 'enemy3');

		new Ennemy(this, gEnnemies, 100, 350, 'enemy2');
		new Ennemy(this, gEnnemies, 300, 350, 'enemy2');

		nextRandomEnnemySpawn = this.game.time.time + 5000;
*/
		enemies = [];
		enemies.push(new Enemies.Enemy1(this.game));
		enemies.push(new Enemies.EnemyPowerup(this.game));

    	this.game.time.events.repeat(2000, 100, this.spawnEnemy1, this);
    	this.game.time.events.repeat(5000, 100, this.spawnEnemy2, this);

    
    	powerupItems = new Collectible.Powerup(this.game);
    	powerupItems.enableBody = true;
    	bombItems = new Collectible.Bomb(this.game);
    	bombItems.enableBody = true;
		
		//new Structure(game, gEnnemies, 300, 200, 'building1');
		
		score=0;
		scoreText = this.add.text(10, 720-40, 'score: 0', 
			{ fontSize: '32px', fill: '#000' });
	
  	},

	/**
	 * Update the game; called every frame
	 * @public
	 */
	update: function () {
		this.physics.arcade.overlap(enemies, player.weapons, this.collisionHandler, null, this)

    	this.physics.arcade.overlap(player, powerupItems, this.playerPowerup, null, this);
    	this.physics.arcade.overlap(player, bombItems, this.playerBomb, null, this);

		//player.update();
		/*
		if(this.game.time.time > nextRandomEnnemySpawn)
		{
			new Ennemy(this, gEnnemies, 60, 200, 'enemy1');

			nextRandomEnnemySpawn = this.game.time.time + 5000;
		}*/
		enemies[0].forEachExists(function (enemy) {
			enemy.fire(player);
		},this);
	},

	spawnEnemy1: function () {
		enemies[0].appear();
	},

	spawnEnemy2: function () {
		enemies[1].appear();
	},

	/**
   	 * Handle collisions between a bullet and an ennemy
   	 * @param  {Bullet} bullet The bullet to test 
   	 * @param  {Ennemy} ennemy The ennemy to test
   	 */
	collisionHandler: function (enemy, bullet) {
		if(!bullet.indestructible){
			bullet.kill();
		}
		
		enemy.damage(bullet.power);
	
		if(enemy.health > 0){
			enemy.play('hit');
		}
		else{
			if(enemy.powerup){
				powerupItems.appear(enemy);
			}
			if(enemy.bomb){
				bombItems.appear(enemy);
			}
			enemy.explode();
			enemy.kill();
			score += enemy.score;
		}
		
		scoreText.text = 'Score: ' + score;
	},

	playerPowerup: function(player, powerup) {
    	powerup.kill();
    	if(player.weaponLevel < 2){
        	player.weaponLevel++;
    	}
    	else{
    		score += 50;
    	}
	},

	playerBomb: function(player, bomb) {
    	bomb.kill();
    	player.countBombs++;
	},

	/**
	 * Render debug infos on the screen
	 * @public
	 */
	render: function () {
		this.game.debug.cameraInfo(this.camera, 32, 32);
		this.game.debug.text("Current time" + this.game.time.time, 30, 120)
		
		//Debug Hitbox
		/*
		this.game.debug.body(player);
		player.weapons[player.weaponLevel].forEach(function (bullet) {
        	bullet.game.debug.body(bullet);
    	});
    
    	player.weapons[3].forEach(function (bullet) {
        	bullet.game.debug.body(bullet);
    	});

    	enemies[0].forEach(function (enemy) {
        	enemy.game.debug.body(enemy);
    	});
  		*/
	},

	quitGame: function (pointer) {

	    //  Here you should destroy anything you no longer need.
	    //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

	    //  Then let's go back to the main menu.
	    //this.state.start('MainMenu');

	}

};

