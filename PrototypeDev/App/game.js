/*
 * ENSICAEN
 * 6 Boulevard Marechal Juin 
 * F-14050 Caen Cedex 
 * 
 * This file is owned by ENSICAEN students.
 * No portion of this document may be reproduced, copied
 * or revised without written permission of the authors.
*/

BasicGame.Game = function (game) {

	var player;
	//var ennemy = new Array();
	
	var gEnnemies;
	

	var back;
	
	var score;
	var scoreText;
};

BasicGame.Game.prototype = {

  create: function () {
	this.physics.startSystem(Phaser.Physics.ARCADE);
	
	back = this.add.tileSprite(0, 0, 640, 1440, 'background');
	back.autoScroll(0, 50);
	
	player = new Player(this.game);
	
	gEnnemies = this.add.group();
	gEnnemies.enableBody = true;
	
	new Ennemy(this, gEnnemies, 60, 50, 'ennemy1');
	new Ennemy(this, gEnnemies, 20, 100, 'ennemy1');
	new Ennemy(this, gEnnemies, 170, 150, 'ennemy2');
	new Ennemy(this, gEnnemies, 230, 150, 'ennemy2');
	new Ennemy(this, gEnnemies, 280, 50, 'ennemy3');
	new Ennemy(this, gEnnemies, 330, 100, 'ennemy3');

	new Ennemy(this, gEnnemies, 100, 350, 'ennemy2');
	new Ennemy(this, gEnnemies, 300, 350, 'ennemy2');

	
	//new Structure(game, gEnnemies, 300, 200, 'building1');
	
	score=0;
	scoreText = this.add.text(0, 720-40, 'score: 0', { fontSize: '32px', fill: '#000' });
	
  },

  update: function () {
	
	this.physics.arcade.overlap(player.bullets, gEnnemies, this.collisionHandler, null, this)

	player.update();

  },

  collisionHandler: function (bullet, ennemy) {
	bullet.kill();
	ennemy.kill();
	
	score += 10;
	scoreText.text = 'Score: ' + score;
	},

  render: function () {

		this.game.debug.cameraInfo(this.camera, 32, 32);
		//this.game.debug.body(player.object);
	},

  quitGame: function (pointer) {

    //  Here you should destroy anything you no longer need.
    //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

    //  Then let's go back to the main menu.
    //this.state.start('MainMenu');

  }

};

