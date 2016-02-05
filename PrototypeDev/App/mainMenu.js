/*
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
 * @fileOverview Main menu
 * @author Bruyère Julien
 * @version 0.1
 */

/**
 * @class MainMenu
 * @param {Game} game accessor of the Phaser's game object
 */
BasicGame.MainMenu = function (game) {
};

BasicGame.MainMenu.prototype = {

  create: function () {

    this.add.sprite(0, 0, 'menuBackground');

    this.add.text(this.game.width / 2, 100, "Shmup Malkyrs", { font: "60px monospace", fill: "#000", align: "center"}).anchor.setTo(0.5, 0.5);

    this.add.text(this.game.width / 2, this.game.height / 2 + 80, "Press A or tap/click game to start", { font: "30px monospace", fill: "#fff" }).anchor.setTo(0.5, 0.5);
    this.add.text(this.game.width / 2, this.game.height - 90, "developped by Bruyère Julien - Zerathe Guilhem (ENSICAEN students)", { font: "15px monospace", fill: "#fff", align: "center"}).anchor.setTo(0.5, 0.5);
    this.add.text(this.game.width / 2, this.game.height - 75, "for Malkyrs Studio", { font: "15px monospace", fill: "#fff", align: "center"}).anchor.setTo(0.5, 0.5);

  },

  update: function () {

    if (this.input.keyboard.isDown(Phaser.Keyboard.A) || this.input.activePointer.isDown) {
      this.startGame();
    }

  },

  startGame: function (pointer) {
    this.state.start('Game', true, false, 1);
  }

};
