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
 * @class Game
 * @param {Game} game accessor of the Phaser's game object
 */
BasicGame.Game = function (game) {
	var level;
	var player;
	var enemies;

	var powerupItems;
	var bombItems;
	
	var score;
	var scoreText;
	var playerLifeText;
	var bombText;

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

		var menu = this.game.input.keyboard.addKey(Phaser.Keyboard.P);
		menu.onDown.add(this.openMenu, this);
		
		level = new Level(this.game);

		player = new Player(this.game);

		enemies = [];
		enemies.push(new Enemies.Enemy1(this.game));
		enemies.push(new Enemies.Enemy2(this.game));
		enemies.push(new Enemies.Enemy3(this.game));
		enemies.push(new Enemies.EnemyPowerup(this.game));
		enemies.push(new Enemies.EnemyBomb(this.game));
		enemies.push(new Enemies.EnemyTowerBoss(this.game));
		enemies.push(new Enemies.Boss1(this.game));
		level.enemies = enemies;
    
    	powerupItems = new Collectible.Powerup(this.game);
    	powerupItems.enableBody = true;
    	bombItems = new Collectible.Bomb(this.game);
    	bombItems.enableBody = true;
		
		score=0;
		scoreText = this.add.text(10, 600-40, 'Score: 0', 
			{ fontSize: '32px', fill: '#000' });
		playerLifeText = this.add.text(800-100, 600-80, 'Life: 3', 
			{ fontSize: '32px', fill: '#000' });
		bombText = this.add.text(800-150, 600-40, 'Bombs: 3', 
			{ fontSize: '32px', fill: '#000' });
  	},

	/**
	 * Update the game; called every frame
	 * @public
	 */
	update: function () {
		this.physics.arcade.overlap(enemies, player.weapons, this.bulletcollisionHandler, null, this)
		this.physics.arcade.overlap(player, enemies, this.playerCollisionHandler, null, this)
		
		for(var i=0; i<enemies.length; i++){
			enemies[i].forEach(function (enemy){
				this.physics.arcade.overlap(player, enemy.weapons, this.bulletEnemyCollisionHandler, null, this)
			},this);
		}

    	this.physics.arcade.overlap(player, powerupItems, this.playerPowerup, null, this);
    	this.physics.arcade.overlap(player, bombItems, this.playerBomb, null, this);

		//player.update();
		level.update();
	},

	/**
   	 * Handle collisions between a bullet and an ennemy
   	 * @param  {Bullet} bullet The bullet to test 
   	 * @param  {Ennemy} ennemy The ennemy to test
   	 */
	bulletcollisionHandler: function (enemy, bullet) {
		if(!bullet.indestructible){
			bullet.kill();
		}
		
		enemy.damage(bullet.power);
	
		if(enemy.alive){
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
	
	playerCollisionHandler: function (player, enemy) {
		if(!player.cooldown && !player.appearing){
			player.takeDamage();
			//ennemy.kill();
			playerLifeText.text = 'Life: ' + player.life;
		}
	},

	bulletEnemyCollisionHandler: function(player, bullet){
		if(!player.cooldown && !player.appearing){
			player.takeDamage();
			bullet.kill();
			playerLifeText.text = 'Life: ' + player.life;
		}
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
		this.game.debug.text("Current time: " + this.game.time.time, 30, 120);
		this.game.debug.text("Progress: " + level.progress, 30, 150);
		
		//Debug Hitbox
		
		//this.game.debug.body(player);
		/*player.weapons[player.weaponLevel].forEach(function (bullet) {
        	bullet.game.debug.body(bullet);
    	});
    
    	player.weapons[3].forEach(function (bullet) {
        	bullet.game.debug.body(bullet);
    	});
		
    	enemies[3].forEach(function (enemy) {
        	enemy.game.debug.body(enemy);
        	for(var i=0; i<4; i++){
        		enemy.weapons[i].forEach(function (bullet){
        			bullet.game.debug.body(bullet);
        		});
        	}
    	});
  		*/
	},

	openMenu: function () {
		this.state.start('MainMenu');
	},

	quitGame: function (pointer) {

	    //  Here you should destroy anything you no longer need.
	    //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

	    //  Then let's go back to the main menu.
	    //this.state.start('MainMenu');

	}

};

