var Item = function (game, key) {
	Phaser.Sprite.call(this, game, 0, 0, key);

	this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;

    this.anchor.set(0.5,0.5);

    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
    this.exists = false;
};

Item.prototype = Object.create(Phaser.Sprite.prototype);
Item.prototype.constructor = Item;

Item.prototype.appear = function(x, y, speed){
	this.reset(x, y);

	this.body.velocity.y = speed;
}

var Collectible = {};

/* Powerup */

Collectible.Powerup = function (game) {
	Phaser.Group.call(this, game, game.world, 'Powerup', false, true, Phaser.Physics.ARCADE);

	this.nextItem = 0;
	this.itemRate = 1000;
	this.itemSpeed = 100;

	for (var i = 0; i < 20; i++)
	{
		this.add(new Item(game, 'powerup'), true);
	}

	return this;
};

Collectible.Powerup.prototype = Object.create(Phaser.Group.prototype);
Collectible.Powerup.prototype.constructor = Collectible.Powerup;

Collectible.Powerup.prototype.appear = function () {
	//if (this.game.time.time < this.nextItem) { return; }

	var x = game.rnd.integerInRange(20, 780);
	var y = 0;

	this.getFirstExists(false).appear(x,y,this.itemSpeed);

    //this.nextItem = this.game.time.time + this.itemRate;
}

/* Bomb */

Collectible.Bomb = function (game) {
	Phaser.Group.call(this, game, game.world, 'Bomb', false, true, Phaser.Physics.ARCADE);

	this.nextItem = 0;
	this.itemRate = 1000;
	this.itemSpeed = 100;

	for (var i = 0; i < 20; i++)
	{
		this.add(new Item(game, 'bomb'), true);
	}

	return this;
};

Collectible.Bomb.prototype = Object.create(Phaser.Group.prototype);
Collectible.Bomb.prototype.constructor = Collectible.Bomb;

Collectible.Bomb.prototype.appear = function () {
	//if (this.game.time.time < this.nextItem) { return; }

	var x = game.rnd.integerInRange(20, 780);
	var y = 0;

	this.getFirstExists(false).appear(x,y,this.itemSpeed);

    //this.nextItem = this.game.time.time + this.itemRate;
}