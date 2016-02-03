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

    var jsonObj;
};

BasicGame.Game.prototype = {

	/**
	 * Constructor of the game
	 * x@public
	 */
	create: function () {
  		this.game.renderer.renderSession.roundPixels = true;
		this.physics.startSystem(Phaser.Physics.ARCADE);

		var pause = this.game.input.keyboard.addKey(Phaser.Keyboard.P);
		pause.onDown.add(this.pauseGame, this);
		this.game.input.onDown.add(this.pauseMenu, this);
		
		level = new Level(this.game);

		player = new Player(this.game);
/*
		enemies = [];
		enemies.push(new Enemies.Enemy1(this.game));
		enemies.push(new Enemies.Enemy2(this.game));
		enemies.push(new Enemies.Enemy3(this.game));
		enemies.push(new Enemies.EnemyPowerup(this.game));
		enemies.push(new Enemies.EnemyBomb(this.game));
		enemies.push(new Enemies.EnemyTowerBoss(this.game));
		enemies.push(new Enemies.Boss1(this.game));
		level.enemies = enemies;
    */
    	loadJSON(function(response) {
	  		jsonObj = JSON.parse(response);
 		});
		enemies = [];
		for(var i=0; i<jsonObj.enemies.length; i++){
			enemies.push(new EnemyGroup(this.game, jsonObj.enemies[i]));
		}
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
		
    	this.physics.arcade.overlap(player, powerupItems, this.playerPowerup, null, this);
    	this.physics.arcade.overlap(player, bombItems, this.playerBomb, null, this);
	
		for(var i=0; i<enemies.length; i++){
			enemies[i].forEach(function (enemy){
				this.physics.arcade.overlap(player, enemy.weapons, this.bulletEnemyCollisionHandler, null, this)
			},this);
		}
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
			//enemy.play('hit');
			this.time.events.repeat(50,2,blink,this,enemy);
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

		//this.game.debug.cameraInfo(this.camera, 32, 32);
		//this.game.debug.text("Current time: " + this.game.time.time, 30, 120);
		//this.game.debug.text("Progress: " + level.progress, 30, 150);
		
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

	pauseGame: function () {
		if(!this.game.paused)
		{
			this.game.paused = true;
			level.autoScroll(0, 0);

			var grayfilter = this.game.add.filter('Gray');

			this.world.filters = [grayfilter];
			
			this.loadingText = this.add.text(this.game.width / 2, 100, "Press P or tap/click game to resume", { font: "20px monospace", fill: "#fff" });
	    	this.loadingText.anchor.setTo(0.5, 0.5);

	    	this.saveButton = this.game.add.sprite(this.game.width / 2, this.game.height / 2 - 50, 'button');
	    	this.saveButton.anchor.setTo(0.5, 0.5);
	    	this.saveText = this.add.text(this.game.width / 2, this.game.height / 2 - 50, "Sauver", { font: "25px monospace", fill: "#000" });
	    	this.saveText.anchor.setTo(0.5, 0.5);

	    	this.loadButton = this.game.add.sprite(this.game.width / 2, this.game.height / 2 + 50, 'button');
	    	this.loadButton.anchor.setTo(0.5, 0.5);
	    	this.loadText = this.add.text(this.game.width / 2, this.game.height / 2 + 50, "Charger", { font: "25px monospace", fill: "#000" });
	    	this.loadText.anchor.setTo(0.5, 0.5);	    	
    	}
    	else
    	{
			this.loadingText.destroy();
			this.saveButton.destroy();
			this.saveText.destroy();
			this.loadButton.destroy();
			this.loadText.destroy();

			this.world.filters = null;
			level.autoScroll(0, 50);
			this.game.paused = false;
		}
	},

	pauseMenu: function() {
		if(this.game.paused)
		{
			if(this.game.input.x > (this.saveButton.x - (this.saveButton.width/2)) && this.game.input.x < (this.saveButton.x + (this.saveButton.width/2)) 
			&& this.game.input.y > (this.saveButton.y - (this.saveButton.height/2)) && this.game.input.y < (this.saveButton.y + (this.saveButton.height/2)) ){	
				this.saveData();
			}
			else if(this.game.input.x > (this.loadButton.x - (this.loadButton.width/2)) && this.game.input.x < (this.loadButton.x + (this.loadButton.width/2)) 
			&& this.game.input.y > (this.loadButton.y - (this.loadButton.height/2)) && this.game.input.y < (this.loadButton.y + (this.loadButton.height/2)) ){	
				this.loadData();
			}
		}
	},

	saveData: function() {
		if(!store.enabled) {
    		alert('Sauvegarde non supportée sur votre navigateur. Desactivez le mode privé ou changez de navigateur');
    		return;
    	}

	    player.saveData();
	    level.saveData();

		for(var i=0; i<enemies.length; i++){
			enemies[i].forEach(function (enemy){
				enemy.saveData();
			},this);
		}
	},

	loadData: function() {
		if(!store.enabled) {
    		alert('Sauvegarde non supportée sur votre navigateur. Desactivez le mode privé ou changez de navigateur');
    		return;
    	}

	    player.loadData();
	    level.loadData();

		for(var i=0; i<enemies.length; i++){
			enemies[i].forEach(function (enemy){
				enemy.loadData();
			},this);
		}
	},

	quitGame: function (pointer) {

	    //  Here you should destroy anything you no longer need.
	    //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

	    //  Then let's go back to the main menu.
	    //this.state.start('MainMenu');

	}

};

