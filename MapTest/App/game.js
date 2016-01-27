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
	var map;
};

function loadJSON(callback) {   

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', 'App/Assets/tileset.json', false); 
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
}

BasicGame.Game.prototype = {

	/**
	 * Constructor of the game
	 * @public
	 */
	create: function () {
  		this.game.renderer.renderSession.roundPixels = true;
		this.physics.startSystem(Phaser.Physics.ARCADE);

		var tileSize = 32;
		var width = 25, height = 60;

		map = this.game.add.tilemap(null, tileSize, tileSize, width, height);
		map.addTilesetImage('tileset', null, tileSize, tileSize, 0, 1);

		layer = map.create('layer1', width, height, tileSize, tileSize);

		var jsonObj;
		loadJSON(function(response) {
	  		jsonObj = JSON.parse(response);
 		});

 		console.log(jsonObj);


		for(var j=0; j<height; j++)
			for(var i=0; i<width; i++)
				map.putTile(8, i, j, layer);

			map.putTile(6, 1, 2, layer);

  	},

	/**
	 * Update the game; called every frame
	 * @public
	 */
	update: function () {

	},

	/**
	 * Render debug infos on the screen
	 * @public
	 */
	render: function () {

		this.game.debug.cameraInfo(this.camera, 32, 32);
	},

	quitGame: function (pointer) {

	    //  Here you should destroy anything you no longer need.
	    //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

	    //  Then let's go back to the main menu.
	    //this.state.start('MainMenu');

	}

};

