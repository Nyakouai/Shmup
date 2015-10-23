
BasicGame.Preloader = function (game) {

};

BasicGame.Preloader.prototype = {

  preload: function () {

    //  Here we load the rest of the assets our game needs.
    this.load.image('player', 'App/Assets/player.png');
    this.load.image('background', 'App/Assets/Background/niveau1.png');

    this.load.spritesheet('ennemy1', 'App/Assets/Ennemies/ennemy1.png', 89, 82, 4);
    this.load.spritesheet('ennemy2', 'App/Assets/Ennemies/ennemy2.png', 59, 63, 2);
    this.load.spritesheet('ennemy3', 'App/Assets/Ennemies/ennemy3.png', 76, 75, 2);
    this.load.image('building1', 'App/Assets/Ennemies/building1.png');
      
      
    this.load.image('bullet', 'App/Assets/Effects/shot.png');
    this.load.image('ennemyBullet', 'App/Assets/Effects/ennemyShot.png');
    //this.load.spritesheet('explosion', 'App/Assets/Effects/explosion.png');
    //this.load.audio('titleMusic', ['audio/main_menu.mp3']);
    //  + lots of other required assets here

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
      this.state.start('Game');
    //}

  }

};
