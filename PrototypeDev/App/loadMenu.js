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
 * @fileOverview Load menu
 * @author Zerathe Guilhem
 * @version 0.1
 */

/**
 * @class LoadMenu
 * @param {Game} game accessor of the Phaser's game object
 */
BasicGame.LoadMenu = function (game) {
};

BasicGame.LoadMenu.prototype = {

  /**
   * Called before everything
   * @public
   */
  init: function (levelId) {
    this.levelId=levelId;
  },

  create: function () {

    this.add.sprite(0, 0, 'menuBackground');

    this.add.text(this.game.width / 2, 100, "Loading", { font: "60px monospace", fill: "#000", align: "center"}).anchor.setTo(0.5, 0.5);
    this.add.text(this.game.width / 2, this.game.height / 2 + 100, "Press Z or tap the screen to continue", { font: "30px monospace", fill: "#fff" }).anchor.setTo(0.5, 0.5);
  },

  update: function () {

    if (this.input.keyboard.isDown(Phaser.Keyboard.Z) || this.input.activePointer.isDown) {
      this.startGame();
    }

  },

  startGame: function (pointer) {
    this.state.start('Game', true, false, this.levelId, true);
  }
};
