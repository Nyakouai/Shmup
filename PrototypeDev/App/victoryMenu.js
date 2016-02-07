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
 * @fileOverview Victory menu
 * @author Bruyère Julien
 * @version 0.1
 */

/**
 * @class VictoryMenu
 * @param {Game} game accessor of the Phaser's game object
 */
BasicGame.VictoryMenu = function (game) {
};

BasicGame.VictoryMenu.prototype = {

  /**
   * Called before everything
   * @public
   */
  init: function (levelId) {
    this.levelId=levelId+1;
    this.endGame = (this.levelId > Object.keys(Level).length);
  },

  create: function () {

    this.add.sprite(0, 0, 'menuBackground');

    this.add.text(this.game.width / 2, this.game.height / 2 - 40, "Your score : "+score, { font: "40px monospace", fill: "#fff" }).anchor.setTo(0.5, 0.5);

    if(this.endGame){
      this.add.text(this.game.width / 2, 100, "Congratulations", { font: "60px monospace", fill: "#000", align: "center"}).anchor.setTo(0.5, 0.5);
      this.add.text(this.game.width / 2, 200, "You reached the end of the game", { font: "30px monospace", fill: "#000", align: "center"}).anchor.setTo(0.5, 0.5);
      this.add.text(this.game.width / 2, this.game.height / 2 + 100, "Press Z or tap the screen\nto return to main menu", { font: "30px monospace", fill: "#fff" }).anchor.setTo(0.5, 0.5);
    }
    else{
      this.add.text(this.game.width / 2, 100, "Victory", { font: "60px monospace", fill: "#000", align: "center"}).anchor.setTo(0.5, 0.5);
      this.add.text(this.game.width / 2, this.game.height / 2 + 100, "Press Z or tap the screen to continue", { font: "30px monospace", fill: "#fff" }).anchor.setTo(0.5, 0.5);
    }
  },

  update: function () {

    if (this.input.keyboard.isDown(Phaser.Keyboard.Z) || this.input.activePointer.isDown) {
      this.startGame();
    }

  },

  startGame: function (pointer) {
    this.state.start('Game', true, false, this.levelId, false);
  }
};
