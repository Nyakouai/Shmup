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
	var gEnnemies;
	
	var score;
	var scoreText;
	var playerLifeText;

	var nextRandomEnnemySpawn;
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

		
		//new Structure(game, gEnnemies, 300, 200, 'building1');
		
		score=0;
		scoreText = this.add.text(10, 600-40, 'score : 0', 
			{ fontSize: '32px', fill: '#000' });
		playerLifeText = this.add.text(800-100, 600-40, 'life : 3', 
			{ fontSize: '32px', fill: '#000' });
  	},

	/**
	 * Update the game; called every frame
	 * @public
	 */
	update: function () {
		this.physics.arcade.overlap(player.weapons, gEnnemies, this.bulletCollisionHandler, null, this)
		this.physics.arcade.overlap(player, gEnnemies, this.playerCollisionHandler, null, this)

		//player.update();
		
		if(this.game.time.time > nextRandomEnnemySpawn)
		{
			new Ennemy(this, gEnnemies, 60, 200, 'enemy1');
			nextRandomEnnemySpawn = this.game.time.time + 5000;
		}


	},

	/**
   	 * Handle collisions between a bullet and an ennemy
   	 * @param  {Bullet} bullet The bullet to test 
   	 * @param  {Ennemy} ennemy The ennemy to test
   	 */
	bulletCollisionHandler: function (bullet, ennemy) {
		bullet.kill();
		ennemy.kill();
		
		score += 10;
		scoreText.text = 'Score : ' + score;
	},

	/**
   	 * Handle collisions between a bullet and an ennemy
   	 * @param  {Bullet} bullet The bullet to test 
   	 * @param  {Ennemy} ennemy The ennemy to test
   	 */
	playerCollisionHandler: function (player, ennemy) {
		player.takeDamage();
		ennemy.kill();
		
		playerLifeText.text = 'life : ' + player.life;
	},

	/**
	 * Render debug infos on the screen
	 * @public
	 */
	render: function () {
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

