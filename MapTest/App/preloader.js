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
 * @fileOverview Preloader sequence
 * @author Bruyère Julien
 * @version 0.2
 */

/**
 * @class Preloader
 * @param {Game} game accessor of the Phaser's game object
 */
BasicGame.Preloader = function (game) {

};

BasicGame.Preloader.prototype = {

  preload: function () {
    var dir = 'App/Assets/';

    // Menu
    this.load.image('menuBackground', dir+'mainMenuBackground.png');
    this.load.image('background', dir+'Background/niveau1.png');
    this.load.image('button', dir+'button.png');

    // Player
    this.load.image('player', dir+'player.png');

    // Enemies
    this.load.spritesheet('enemy1', dir+'Enemies/enemy1.png', 89, 82, 4);
    this.load.spritesheet('enemy2', dir+'Enemies/enemy2.png', 59, 63, 2);
    this.load.spritesheet('enemy3', dir+'Enemies/enemy3.png', 76, 75, 2);
    this.load.image('building1', dir+'Enemies/building1.png');
    

	// Effects
    for (var i = 1; i <= 11; i++)
    {
        this.load.image('bullet' + i, dir+'Effects/bullet' + i + '.png');
    }
    this.load.spritesheet('fireball',dir+'Effects/fireballs.png',28,26);
    this.load.spritesheet('explosion', dir+'Effects/explosion.png', 54, 56);
    
    // Items
    this.load.image('powerup',dir+'Items/powerup.png');
    this.load.image('bomb',dir+'Items/bomb.png');
   
    // Script
    this.load.script('gray', 'App/Utils/gray.js');
  },

  create: function () {
  },

  update: function () {

    //  You don't actually need to do this, but I find it gives a much smoother game experience.
    //  Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
    //  You can jump right into the menu if you want and still play the music, but you'll have a few
    //  seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
    //  it's best to wait for it to decode here first, then carry on.
    
    //  If you don't have any music in your game then put the game.state.start line into the create function and delete
    //  the update function completely.
    
    //if (this.cache.isSoundDecoded('titleMusic') && this.ready == false)
    //{
    //  this.ready = true;
      this.state.start('MainMenu');
    //}

  }

};
