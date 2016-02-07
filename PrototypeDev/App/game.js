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
	 * Called before everything
	 * @public
	 */
	init: function (levelId, loaded) {
		this.game.levelId = levelId;
		this.loaded = loaded;
	},

	/**
	 * Constructor of the game
	 * @public
	 */
	create: function () {
  		this.game.renderer.renderSession.roundPixels = true;
		this.physics.startSystem(Phaser.Physics.ARCADE);

		var pause = this.game.input.keyboard.addKey(Phaser.Keyboard.P);
		pause.onDown.add(this.pauseGame, this);
		this.game.input.onDown.add(this.pauseInput, this);
		this.game.input.onDown.add(this.pauseMenu, this);
		
		level = new Level["Level"+this.game.levelId](this.game);

		player = new Player(this.game);

    	var fileJSON = 'App/GameElements/enemy'+this.game.levelId+'.json';
    	loadJSON(fileJSON, function(response) {
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
		levelIdText = this.add.text(10, 600-80, 'Level: 1', 
			{ fontSize: '32px', fill: '#000' });
		levelIdText.text = 'Level: ' + this.game.levelId;
		playerLifeText = this.add.text(800-100, 600-80, 'Life: 3', 
			{ fontSize: '32px', fill: '#000' });
		bombText = this.add.text(800-150, 600-40, 'Bombs: 3', 
			{ fontSize: '32px', fill: '#000' });

		this.pauseButton = this.game.add.sprite(25, 25, 'pause');
	    this.pauseButton.anchor.setTo(0.5, 0.5);
	    this.pauseButton.scale.setTo(0.18, 0.18);

		if(this.loaded){
			this.loadData();
			this.pauseGame();
		}
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

		playerLifeText.text = 'Life: ' + player.life;
		scoreText.text = 'Score: ' + score;
    	bombText.text = 'Bombs: ' + player.countBombs;
    	levelIdText.text = 'Level: ' + this.game.levelId;
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
	},
	

	playerCollisionHandler: function (player, enemy) {
		if(!player.cooldown && !player.appearing){
			player.takeDamage();
			//ennemy.kill();
		}
	},

	bulletEnemyCollisionHandler: function(player, bullet){
		if(!player.cooldown && !player.appearing){
			player.takeDamage();
			bullet.kill();
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

	pauseInput: function(){
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
				this.preLoad();
			}
			else{
				this.pauseGame();
			}
		}
		else
		{	
			if(this.game.input.x > (this.pauseButton.x - (this.pauseButton.width/2)) && this.game.input.x < (this.pauseButton.x + (this.pauseButton.width/2)) 
				&& this.game.input.y > (this.pauseButton.y - (this.pauseButton.height/2)) && this.game.input.y < (this.pauseButton.y + (this.pauseButton.height/2)) ){	
					this.pauseGame();
			}
		}
	},

	saveData: function() {
		if(!store.enabled) {
    		alert('Sauvegarde non supportée sur votre navigateur. Desactivez le mode privé ou changez de navigateur');
    		return;
    	}

	    store.set('levelId', this.game.levelId);
	    store.set('score', score);
	    level.saveData();

	    player.saveData();

		for(var i=0; i<enemies.length; i++){
			enemies[i].forEach(function (enemy){
				enemy.saveData();
			},this);
		}
	},

	preLoad: function() {
		if(!store.enabled) {
    		alert('Sauvegarde non supportée sur votre navigateur. Desactivez le mode privé ou changez de navigateur');
    		return;
    	}

    	this.game.levelId = store.get('levelId');

    	this.pauseGame();

		this.game.state.start('LoadMenu', true, false, this.game.levelId);
	},

	loadData: function() {
		if(!store.enabled) {
    		alert('Sauvegarde non supportée sur votre navigateur. Desactivez le mode privé ou changez de navigateur');
    		return;
    	}
    	
		score = store.get('score');

	    level.loadData();

	    player.loadData();

		for(var i=0; i<enemies.length; i++){
			enemies[i].forEach(function (enemy){
				enemy.loadData();
			},this);
		}

		this.loaded = false;
	},

	quitGame: function (pointer) {

	    //  Here you should destroy anything you no longer need.
	    //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

	    //  Then let's go back to the main menu.
	    //this.state.start('MainMenu');

	}

};

