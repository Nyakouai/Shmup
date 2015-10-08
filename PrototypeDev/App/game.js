/*
 * ENSICAEN
 * 6 Boulevard Marechal Juin 
 * F-14050 Caen Cedex 
 * 
 * This file is owned by ENSICAEN students.
 * No portion of this document may be reproduced, copied
 * or revised without written permission of the authors.
*/

window.onload = function() {

        var game = new Phaser.Game(640, 480, Phaser.AUTO, '', 
		{ preload: preload, create: create, update: update, render: render });
		
        function preload () {
			game.load.image('player', 'App/Assets/player.png');
            game.load.image('background', 'App/Assets/Background/test.png');
			
			game.load.image('interface', 'App/Assets/Interface/interface.png');
			game.load.image('face', 'App/Assets/face.png');

			game.load.spritesheet('ennemy1', 'App/Assets/Ennemies/ennemy1.png', 89, 82, 4);
			game.load.spritesheet('ennemy2', 'App/Assets/Ennemies/ennemy2.png', 59, 63, 2);
			game.load.spritesheet('ennemy3', 'App/Assets/Ennemies/ennemy3.png', 76, 75, 2);
			game.load.image('building1', 'App/Assets/Ennemies/building1.png');
			
			
			game.load.image('bullet', 'App/Assets/Effects/shot.png');
			game.load.image('ennemyBullet', 'App/Assets/Effects/ennemyShot.png');
			//game.load.spritesheet('explosion', 'App/Assets/Effects/explosion.png');
        }
		
		var player;
		//var ennemy = new Array();
		
		var gEnnemies;
		
		
		var interfaceg;
		var back;
		var face;
		
		var score = 0;
		var scoreText;
		
        function create () {
			game.world.setBounds(0, 0, 640, 1440);
			game.camera.y = 1440-480;
			game.physics.startSystem(Phaser.Physics.ARCADE);
			
			back = game.add.tileSprite(0, 0, 640, 1440, 'background');
			
			player = new Player(game);
			
			gEnnemies = game.add.group();
			gEnnemies.enableBody = true;
			
			new Ennemy(game, gEnnemies, 60, 0, 'ennemy1');
			new Ennemy(game, gEnnemies, 20, 50, 'ennemy1');
			new Ennemy(game, gEnnemies, 200, 100, 'ennemy2');
			new Ennemy(game, gEnnemies, 400, 100, 'ennemy2');
			new Ennemy(game, gEnnemies, 500, 50, 'ennemy3');
			new Ennemy(game, gEnnemies, 550, 120, 'ennemy3');
			
			new Structure(game, gEnnemies, 300, 200, 'building1');
			
			//interfaceg = game.add.sprite(0, 380, 'interface');
			//game.physics.arcade.enable(interfaceg);
			//interfaceg.fixedToCamera = true;

			//face = game.add.sprite(12, 380+12, 'face');
			//face.fixedToCamera = true;
			
			//scoreText = game.add.text(115, 380+10, 'score: 0', { fontSize: '32px', fill: '#000' });
			//scoreText.fixedToCamera = true;
		}
		
		function update () {
			//back.tilePosition.y+=1;
			game.camera.y -= 1;
			
			game.physics.arcade.collide(player.bullets, gEnnemies, collisionHandler, null, this)

			player.update();
			player.collide(game, game.camera);
		}
		
		//  Called if the bullet hits one of the veg sprites
		function collisionHandler (bullet, ennemy) {
			bullet.kill();
			ennemy.kill();
			
			score += 10;
			//scoreText.text = 'Score: ' + score;
		}
		
		function render() {

			game.debug.cameraInfo(game.camera, 32, 32);

		}


    };