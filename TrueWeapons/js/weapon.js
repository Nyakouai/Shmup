var Weapon = {};

/* Bullet Level 1 */

Weapon.BulletLvl1 = function (game) {
    Phaser.Group.call(this, game, game.world, 'Bullet Level 1', false, true, Phaser.Physics.ARCADE);

    this.nextFire = 0;
    this.bulletSpeed = 1000;
    this.fireRate = 50;

    for (var i = 0; i < 64; i++)
    {
        this.add(new Bullet(game, 'bullet7'), true);
    }

    return this;
};

Weapon.BulletLvl1.prototype = Object.create(Phaser.Group.prototype);
Weapon.BulletLvl1.prototype.constructor = Weapon.BulletLvl1;

Weapon.BulletLvl1.prototype.fire = function (source) {
    if (this.game.time.time < this.nextFire) { return; }

    var x = source.x;
    var y = source.y;

    this.getFirstExists(false).fire(x, y, -90, this.bulletSpeed, 0, 0);

    this.nextFire = this.game.time.time + this.fireRate;
};

/* Bullet Level 2 */

Weapon.BulletLvl2 = function (game) {
    Phaser.Group.call(this, game, game.world, 'Bullet Level 2', false, true, Phaser.Physics.ARCADE);

    this.nextFire = 0;
    this.bulletSpeed = 1000;
    this.fireRate = 50;

    for (var i = 0; i < 96; i++)
    {
        this.add(new Bullet(game, 'bullet8'), true);
    }

    return this;
};

Weapon.BulletLvl2.prototype = Object.create(Phaser.Group.prototype);
Weapon.BulletLvl2.prototype.constructor = Weapon.BulletLvl2;

Weapon.BulletLvl2.prototype.fire = function (source) {
    if (this.game.time.time < this.nextFire) { return; }

    var x = source.x;
    var y = source.y;

    this.getFirstExists(false).fire(x, y, -95, this.bulletSpeed, 0, 0);
    this.getFirstExists(false).fire(x, y, -85, this.bulletSpeed, 0, 0);
    this.getFirstExists(false).fire(x, y, -90, this.bulletSpeed, 0, 0);

    this.nextFire = this.game.time.time + this.fireRate;
};

/* Bullet Level 3 */

Weapon.BulletLvl3 = function (game) {
    Phaser.Group.call(this, game, game.world, 'Bullet Level 3', false, true, Phaser.Physics.ARCADE);

    this.nextFire = 0;
    this.bulletSpeed = 1000;
    this.fireRate = 50;

    for (var i = 0; i < 96; i++)
    {
        this.add(new Bullet(game, 'bullet4'), true);
    }

    return this;
};

Weapon.BulletLvl3.prototype = Object.create(Phaser.Group.prototype);
Weapon.BulletLvl3.prototype.constructor = Weapon.BulletLvl3;

Weapon.BulletLvl3.prototype.fire = function (source) {
    if (this.game.time.time < this.nextFire) { return; }

    var x = source.x;
    var y = source.y;

    this.getFirstExists(false).fire(x, y, -95, this.bulletSpeed, 0, 0);
    this.getFirstExists(false).fire(x, y, -85, this.bulletSpeed, 0, 0);
    this.getFirstExists(false).fire(x, y, -90, this.bulletSpeed, 0, 0);

    this.nextFire = this.game.time.time + this.fireRate;
};

/* Fireball */

Weapon.Fireball = function (game) {
    Phaser.Group.call(this, game, game.world, 'Fireball', false, true, Phaser.Physics.ARCADE);

    this.nextFire = 0;
    this.bulletSpeed = 500;
    this.fireRate = 1;

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

    var x = source.x;
    var y = source.y;

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