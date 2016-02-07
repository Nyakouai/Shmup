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
 * @fileOverview Game over menu
 * @author Bruyère Julien
 * @version 0.1
 */

/**
 * @class GameOverMenu
 * @param {Game} game accessor of the Phaser's game object
 */
BasicGame.GameOverMenu = function (game) {
};

BasicGame.GameOverMenu.prototype = {

  /**
   * Called before everything
   * @public
   */
  init: function (levelId) {
    this.levelId=levelId;
  },

  create: function () {

    this.add.sprite(0, 0, 'menuBackground');

    this.add.text(this.game.width / 2, 100, "Game Over", { font: "60px monospace", fill: "#000", align: "center"}).anchor.setTo(0.5, 0.5);

    this.add.text(this.game.width / 2, this.game.height / 2 - 40, "Your score : "+score, { font: "40px monospace", fill: "#fff" }).anchor.setTo(0.5, 0.5);

    this.add.text(this.game.width / 2, this.game.height / 2 + 100, "Press R to restart the level", { font: "30px monospace", fill: "#fff" }).anchor.setTo(0.5, 0.5);
    this.add.text(this.game.width / 2, this.game.height / 2 + 200, "Press A or tap/click game\nto return to main menu", { font: "30px monospace", fill: "#fff" }).anchor.setTo(0.5, 0.5);
  },

  update: function () {

    if (this.input.keyboard.isDown(Phaser.Keyboard.R)) {
      this.startGame();
    }
    else if (this.input.keyboard.isDown(Phaser.Keyboard.A) || this.input.activePointer.isDown) {
      this.startMainMenu();
    }

  },

  startGame: function (pointer) {
    this.state.start('Game', true, false, this.levelId, false);
  },

  startMainMenu: function (pointer) {
    this.state.start('MainMenu');
  }

};
