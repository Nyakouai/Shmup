var Weapon = {};

/* Single Bullet */

Weapon.SingleBullet = function (game) {
    Phaser.Group.call(this, game, game.world, 'Single Bullet', false, true, Phaser.Physics.ARCADE);

    this.nextFire = 0;
    this.bulletSpeed = 1000;
    this.fireRate = 100;

    for (var i = 0; i < 64; i++)
    {
        this.add(new Bullet(game, 'bullet5'), true);
    }

    return this;
};

Weapon.SingleBullet.prototype = Object.create(Phaser.Group.prototype);
Weapon.SingleBullet.prototype.constructor = Weapon.SingleBullet;

Weapon.SingleBullet.prototype.fire = function (source) {
    if (this.game.time.time < this.nextFire) { return; }

    var x = source.x + 10;
    var y = source.y + 10;

    this.getFirstExists(false).fire(x, y, -90, this.bulletSpeed, 0, 0);
    this.getFirstExists(false).fire(x+20, y, -90, this.bulletSpeed, 0, 0);

    this.nextFire = this.game.time.time + this.fireRate;
};

/* 3-way front */

Weapon.ThreeWay = function (game) {
    Phaser.Group.call(this, game, game.world, 'Three Way', false, true, Phaser.Physics.ARCADE);

    this.nextFire = 0;
    this.bulletSpeed = 1000;
    this.fireRate = 50;

    for (var i = 0; i < 96; i++)
    {
        this.add(new Bullet(game, 'bullet8'), true);
    }

    this.setAll('scaleSpeed', 0.05);

    return this;
};

Weapon.ThreeWay.prototype = Object.create(Phaser.Group.prototype);
Weapon.ThreeWay.prototype.constructor = Weapon.ThreeWay;

Weapon.ThreeWay.prototype.fire = function (source) {
    if (this.game.time.time < this.nextFire) { return; }

    var x = source.x + 20;
    var y = source.y + 20;

    this.getFirstExists(false).fire(x, y, -95, this.bulletSpeed, 0, -500);
    this.getFirstExists(false).fire(x, y, -90, this.bulletSpeed, 0, 0);
    this.getFirstExists(false).fire(x, y, -85, this.bulletSpeed, 0, 500);

    this.nextFire = this.game.time.time + this.fireRate;
};

/* Missile */

Weapon.Missile = function (game) {
    Phaser.Group.call(this, game, game.world, 'Missile', false, true, Phaser.Physics.ARCADE);

    this.nextFire = 0;
    this.bulletSpeed = 500;
    this.fireRate = 100;
    this.numMissile = 0;

    for (var i = 0; i < 96; i++)
    {
        this.add(new Bullet(game, 'bullet10'), true);
    }

    return this;
};

Weapon.Missile.prototype = Object.create(Phaser.Group.prototype);
Weapon.Missile.prototype.constructor = Weapon.Missile;

Weapon.Missile.prototype.fire = function (source) {
    if (this.game.time.time < this.nextFire) { return; }

    var x = source.x + 20;
    var y = source.y + 20;

    this.getFirstExists(false).fire(x, y, this.numMissile*20 - 90, this.bulletSpeed, 0, 0);

    this.numMissile++;

    if (this.numMissile > 17){
        this.numMissile = 0;
    }

    this.nextFire = this.game.time.time + this.fireRate;
};

/* Beam */

Weapon.Beam = function (game) {
    Phaser.Group.call(this, game, game.world, 'Beam', false, true, Phaser.Physics.ARCADE);

    this.nextFire = 0;
    this.bulletSpeed = 1000;
    this.fireRate = 50;

    for (var i = 0; i < 64; i++)
    {
        this.add(new Bullet(game, 'bullet11'), true);
    }

    return this;
};

Weapon.Beam.prototype = Object.create(Phaser.Group.prototype);
Weapon.Beam.prototype.constructor = Weapon.Beam;

Weapon.Beam.prototype.fire = function (source) {
    if (this.game.time.time < this.nextFire) { return; }

    var x = source.x + 20;
    var y = source.y;

    this.getFirstExists(false).fire(x, y, -90, this.bulletSpeed, 0, 0);

    this.nextFire = this.game.time.time + this.fireRate;
};

/* Pattern */

Weapon.Pattern = function (game) {
    Phaser.Group.call(this, game, game.world, 'Pattern', false, true, Phaser.Physics.ARCADE);

    this.nextFire = 0;
    this.bulletSpeed = 500;
    this.fireRate = 50;

    this.pattern = Phaser.ArrayUtils.numberArrayStep(-1000, 1000, 100);
    this.pattern = this.pattern.concat(Phaser.ArrayUtils.numberArrayStep(1000, -1000, -100));

    this.patternIndex = 0;

    for (var i = 0; i < 64; i++)
    {
        this.add(new Bullet(game, 'bullet3'), true);
    }

    this.setAll('tracking', true);

    return this;
};

Weapon.Pattern.prototype = Object.create(Phaser.Group.prototype);
Weapon.Pattern.prototype.constructor = Weapon.Pattern;

Weapon.Pattern.prototype.fire = function (source) {
    if (this.game.time.time < this.nextFire) { return; }

    var x = source.x + 20;
    var y = source.y + 20;

    this.getFirstExists(false).fire(x, y, -90, this.bulletSpeed, 0, this.pattern[this.patternIndex]);

    this.patternIndex++;

    if (this.patternIndex == this.pattern.length)
    {
        this.patternIndex = 0;
    }

    this.nextFire = this.game.time.time + this.fireRate;
};

/* Fireball */

Weapon.Fireball = function (game) {
    Phaser.Group.call(this, game, game.world, 'Fireball', false, true, Phaser.Physics.ARCADE);

    this.nextFire = 0;
    this.bulletSpeed = 500;
    this.fireRate = 2000;

    /*this.pattern = Phaser.ArrayUtils.numberArrayStep(-1000, 1000, 100);
    this.pattern = this.pattern.concat(Phaser.ArrayUtils.numberArrayStep(1000, -1000, -100));

    this.patternIndex = 0;
*/
    for (var i = 0; i < 20; i++)
    {
        this.add(new Bullet(game, 'fireball'), true);
    }

    this.setAll('tracking', true);
    this.setAll('scaleSpeed', 0.1);
    this.setAll('animation', true);
    this.callAll('animations.add','animations','fire',[0,1,2,3],15,true);

    return this;
};

Weapon.Fireball.prototype = Object.create(Phaser.Group.prototype);
Weapon.Fireball.prototype.constructor = Weapon.Fireball;

Weapon.Fireball.prototype.fire = function (source) {
    if (this.game.time.time < this.nextFire) { return; }

    var x = source.x + 20;
    var y = source.y + 20;

    this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 500, -500);
    this.getFirstExists(false).fire(x, y, 45, this.bulletSpeed, 0, -707.1);
    this.getFirstExists(false).fire(x, y, 90, this.bulletSpeed, -500, -500);
    this.getFirstExists(false).fire(x, y, 135, this.bulletSpeed, -707.1, 0);
    this.getFirstExists(false).fire(x, y, 180, this.bulletSpeed, -500, 500);
    this.getFirstExists(false).fire(x, y, 225, this.bulletSpeed, 0, 707.1);
    this.getFirstExists(false).fire(x, y, 270, this.bulletSpeed, 500, 500);
    this.getFirstExists(false).fire(x, y, 315, this.bulletSpeed, 707.1, 0);
/*
    this.patternIndex++;

    if (this.patternIndex == this.pattern.length)
    {
        this.patternIndex = 0;
    }
*/
    this.nextFire = this.game.time.time + this.fireRate;
};