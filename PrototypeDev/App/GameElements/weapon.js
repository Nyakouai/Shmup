var Weapon = {};

///////////////////////////////////
/* Bullet Level 1 (12x32) */

Weapon.BulletLvl1 = function (game) {
    Phaser.Group.call(this, game, game.world, 'Bullet Level 1', false, true, Phaser.Physics.ARCADE);

    this.nextFire = 0;
    this.bulletSpeed = 500;
    this.fireRate = 100;
    this.power = 1;

    for (var i = 0; i < 64; i++)
    {
        this.add(new Bullet(game, 'bullet6'), true);
    }

    this.setAll('power', this.power);

    return this;
};

Weapon.BulletLvl1.prototype = Object.create(Phaser.Group.prototype);
Weapon.BulletLvl1.prototype.constructor = Weapon.BulletLvl1;

Weapon.BulletLvl1.prototype.fire = function (source) {
    if (this.game.time.time < this.nextFire) { return; }

    var x = source.x;
    var y = source.y;

    this.getFirstExists(false).fire(x, y, -90, this.bulletSpeed, 12, 32, 0, 0);

    this.nextFire = this.game.time.time + this.fireRate;
};

///////////////////////////////////
/* Bullet Level 2 (11x20) */

Weapon.BulletLvl2 = function (game) {
    Phaser.Group.call(this, game, game.world, 'Bullet Level 2', false, true, Phaser.Physics.ARCADE);

    this.nextFire = 0;
    this.bulletSpeed = 1000;
    this.fireRate = 50;
    this.power = 1;

    for (var i = 0; i < 96; i++)
    {
        this.add(new Bullet(game, 'bullet8'), true);
    }

    this.setAll('power', this.power);

    return this;
};

Weapon.BulletLvl2.prototype = Object.create(Phaser.Group.prototype);
Weapon.BulletLvl2.prototype.constructor = Weapon.BulletLvl2;

Weapon.BulletLvl2.prototype.fire = function (source) {
    if (this.game.time.time < this.nextFire) { return; }

    var x = source.x;
    var y = source.y;

    this.getFirstExists(false).fire(x, y, -95, this.bulletSpeed, 11, 20, 0, 0);
    this.getFirstExists(false).fire(x, y, -85, this.bulletSpeed, 11, 20, 0, 0);
    this.getFirstExists(false).fire(x, y, -90, this.bulletSpeed, 11, 20, 0, 0);

    this.nextFire = this.game.time.time + this.fireRate;
};

///////////////////////////////////
/* Bullet Level 3 (26x60) */

Weapon.BulletLvl3 = function (game) {
    Phaser.Group.call(this, game, game.world, 'Bullet Level 3', false, true, Phaser.Physics.ARCADE);

    this.nextFire = 0;
    this.bulletSpeed = 1000;
    this.fireRate = 75;
    this.power = 2;

    for (var i = 0; i < 96; i++)
    {
        this.add(new Bullet(game, 'bullet4'), true);
    }

    this.setAll('power', this.power);

    return this;
};

Weapon.BulletLvl3.prototype = Object.create(Phaser.Group.prototype);
Weapon.BulletLvl3.prototype.constructor = Weapon.BulletLvl3;

Weapon.BulletLvl3.prototype.fire = function (source) {
    if (this.game.time.time < this.nextFire) { return; }

    var x = source.x;
    var y = source.y;

    this.getFirstExists(false).fire(x, y, -98, this.bulletSpeed, 26, 60, 0, 0);
    this.getFirstExists(false).fire(x, y, -82, this.bulletSpeed, 26, 60, 0, 0);
    this.getFirstExists(false).fire(x, y, -90, this.bulletSpeed, 26, 60, 0, 0);

    this.nextFire = this.game.time.time + this.fireRate;
};

///////////////////////////////////
/* Fireball (28x26) */

Weapon.Fireball = function (game) {
    Phaser.Group.call(this, game, game.world, 'Fireball', false, true, Phaser.Physics.ARCADE);

    this.nextFire = 0;
    this.bulletSpeed = 500;
    this.fireRate = 1600;
    this.power = 4;

    for (var i = 0; i < 20; i++)
    {
        this.add(new Bullet(game, 'fireball'), true);
    }

    this.setAll('tracking', true);
    this.setAll('scaleSpeed', 0.1);
    this.setAll('animation', true);
    this.setAll('indestructible', true);
    this.setAll('power', this.power);
    this.callAll('animations.add','animations','fire',[0,1,2,3],15,true);

    return this;
};

Weapon.Fireball.prototype = Object.create(Phaser.Group.prototype);
Weapon.Fireball.prototype.constructor = Weapon.Fireball;

Weapon.Fireball.prototype.fire = function (source) {
    if (this.game.time.time < this.nextFire) { return; }

    var x = source.x;
    var y = source.y;

    this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 20, 20, 500, -500);
    this.getFirstExists(false).fire(x, y, 45, this.bulletSpeed, 20, 20, 0, -707.1);
    this.getFirstExists(false).fire(x, y, 90, this.bulletSpeed, 20, 20, -500, -500);
    this.getFirstExists(false).fire(x, y, 135, this.bulletSpeed, 20, 20, -707.1, 0);
    this.getFirstExists(false).fire(x, y, 180, this.bulletSpeed, 20, 20, -500, 500);
    this.getFirstExists(false).fire(x, y, 225, this.bulletSpeed, 20, 20, 0, 707.1);
    this.getFirstExists(false).fire(x, y, 270, this.bulletSpeed, 20, 20, 500, 500);
    this.getFirstExists(false).fire(x, y, 315, this.bulletSpeed, 20, 20, 707.1, 0);

    this.nextFire = this.game.time.time + this.fireRate;
};



//////////////// Enemy's weapons //////////////////////

/* Bullet Enemy1 (11x11) */

Weapon.BulletEnemy1 = function (game) {
    Phaser.Group.call(this, game, game.world, 'Bullet Enemy1', false, true, Phaser.Physics.ARCADE);

    this.bulletSpeed = 200;
    this.shotDelay = 3000;

    for (var i = 0; i < 64; i++)
    {
        this.add(new Bullet(game, 'bullet7'), true);
    }

    return this;
};

Weapon.BulletEnemy1.prototype = Object.create(Phaser.Group.prototype);
Weapon.BulletEnemy1.prototype.constructor = Weapon.BulletEnemy1;

Weapon.BulletEnemy1.prototype.fire = function (source, target) {
    var x = source.x;
    var y = source.y+20;
    var tx = target.x;
    var ty = target.y;
    var angle = angleEnemyPlayer(x,y,tx,ty);

    this.getFirstExists(false).fire(x, y, angle, this.bulletSpeed, 7, 7, 0, 0);
};

/* Bullet EnemyTower (11x11) */

Weapon.BulletEnemyTower = function (game) {
    Phaser.Group.call(this, game, game.world, 'Bullet EnemyTower', false, true, Phaser.Physics.ARCADE);

    this.bulletSpeed = 200;
    this.shotDelay = 2000;

    for (var i = 0; i < 64; i++)
    {
        this.add(new Bullet(game, 'bullet7'), true);
    }

    return this;
};

Weapon.BulletEnemyTower.prototype = Object.create(Phaser.Group.prototype);
Weapon.BulletEnemyTower.prototype.constructor = Weapon.BulletEnemyTower;

Weapon.BulletEnemyTower.prototype.fire = function (source, target) {
    var x = source.x;
    var y = source.y;
    var tx = target.x;
    var ty = target.y;
    var angle = angleEnemyPlayer(x,y,tx,ty);

    this.getFirstExists(false).fire(x, y, angle, this.bulletSpeed, 7, 7, 0, 0);
};

/* Pattern Boss1 */

Weapon.PatternBoss1 = function (game) {
    Phaser.Group.call(this, game, game.world, 'PatternBoss1', false, true, Phaser.Physics.ARCADE);

    this.bulletSpeed = 200;
    this.shotDelay = 25;

    this.pattern = Phaser.ArrayUtils.numberArrayStep(-800, 800, 105);
    this.pattern = this.pattern.concat(Phaser.ArrayUtils.numberArrayStep(800, -800, -105));

    this.patternIndex = 0;

    for (var i = 0; i < 64; i++)
    {
        this.add(new Bullet(game, 'bullet7'), true);
    }

    return this;
};

Weapon.PatternBoss1.prototype = Object.create(Phaser.Group.prototype);
Weapon.PatternBoss1.prototype.constructor = Weapon.PatternBoss1;

Weapon.PatternBoss1.prototype.fire = function (source, target) {
    var x = source.x;
    var y = source.y-40;

    this.getFirstExists(false).fire(x, y, 90, this.bulletSpeed, 7, 7, 
        0, this.pattern[this.patternIndex]);

    this.patternIndex++;

    if (this.patternIndex == this.pattern.length)
    {
        this.patternIndex = 0;
    }
};

/* Spread Boss1 */

Weapon.SpreadBoss1 = function (game) {
    Phaser.Group.call(this, game, game.world, 'SpreadBoss1', false, true, Phaser.Physics.ARCADE);

    this.bulletSpeed = 200;
    this.shotDelay = 1000;

    for (var i = 0; i < 90; i++)
    {
        this.add(new Bullet(game, 'bullet7'), true);
    }

    return this;
};

Weapon.SpreadBoss1.prototype = Object.create(Phaser.Group.prototype);
Weapon.SpreadBoss1.prototype.constructor = Weapon.SpreadBoss1;

Weapon.SpreadBoss1.prototype.fire = function (source, target) {
    var x = source.x;
    var y = source.y-40;
    var tx = target.x;
    var ty = target.y;
    var angle = angleEnemyPlayer(x,y,tx,ty);
    var rand = this.game.rnd.integerInRange(-5,5);

    //this.getFirstExists(false).fire(x, y, angle, this.bulletSpeed, 7, 7, 0, 0);

    this.getFirstExists(false).fire(x, y, 50+rand, this.bulletSpeed, 7, 7, 0, 0);
    //this.getFirstExists(false).fire(x, y, 60+rand, this.bulletSpeed, 7, 7, 0, 0);
    this.getFirstExists(false).fire(x, y, 70+rand, this.bulletSpeed, 7, 7, 0, 0);
    //this.getFirstExists(false).fire(x, y, 80+rand, this.bulletSpeed, 7, 7, 0, 0);
    this.getFirstExists(false).fire(x, y, 90+rand, this.bulletSpeed, 7, 7, 0, 0);
    //this.getFirstExists(false).fire(x, y, 100+rand, this.bulletSpeed, 7, 7, 0, 0);
    this.getFirstExists(false).fire(x, y, 110+rand, this.bulletSpeed, 7, 7, 0, 0);
    //this.getFirstExists(false).fire(x, y, 120+rand, this.bulletSpeed, 7, 7, 0, 0);
    this.getFirstExists(false).fire(x, y, 130+rand, this.bulletSpeed, 7, 7, 0, 0);
};

/* Homing Boss1 */

Weapon.HomingBoss1 = function (game) {
    Phaser.Group.call(this, game, game.world, 'HomingBoss1', false, true, Phaser.Physics.ARCADE);

    this.bulletSpeed = 100;
    this.shotDelay = 1000;

    for (var i = 0; i < 90; i++)
    {
        this.add(new Bullet(game, 'bullet7'), true);
    }

    return this;
};

Weapon.HomingBoss1.prototype = Object.create(Phaser.Group.prototype);
Weapon.HomingBoss1.prototype.constructor = Weapon.HomingBoss1;

Weapon.HomingBoss1.prototype.fire = function (source, target) {
    var x = source.x;
    var y = source.y-40;
    var tx = target.x;
    var ty = target.y;
    var angle = angleEnemyPlayer(x,y,tx,ty);
    //var rand = this.game.rnd.integerInRange(-30,30);

    this.getFirstExists(false).fire(x+5, y, angle, this.bulletSpeed, 7, 7, 0, 0);
    this.getFirstExists(false).fire(x-5, y, angle, this.bulletSpeed, 7, 7, 0, 0);
    this.getFirstExists(false).fire(x, y+5, angle, this.bulletSpeed, 7, 7, 0, 0);
    this.getFirstExists(false).fire(x, y-5, angle, this.bulletSpeed, 7, 7, 0, 0);
    this.getFirstExists(false).fire(x+5, y+5, angle, this.bulletSpeed, 7, 7, 0, 0);
    this.getFirstExists(false).fire(x-5, y-5, angle, this.bulletSpeed, 7, 7, 0, 0);
    this.getFirstExists(false).fire(x-5, y+5, angle, this.bulletSpeed, 7, 7, 0, 0);
    this.getFirstExists(false).fire(x+5, y-5, angle, this.bulletSpeed, 7, 7, 0, 0);

    this.getFirstExists(false).fire(x, y, angle-30, this.bulletSpeed+100, 7, 7, 0, 0);
    this.getFirstExists(false).fire(x, y, angle, this.bulletSpeed+100, 7, 7, 0, 0);
    this.getFirstExists(false).fire(x, y, angle+30, this.bulletSpeed+100, 7, 7, 0, 0);
};

/* Straight Boss1 */

Weapon.StraightBoss1 = function (game) {
    Phaser.Group.call(this, game, game.world, 'StraightBoss1', false, true, Phaser.Physics.ARCADE);

    this.bulletSpeed = 300;
    this.shotDelay = 10;

    for (var i = 0; i < 200; i++)
    {
        this.add(new Bullet(game, 'bullet7'), true);
    }

    return this;
};

Weapon.StraightBoss1.prototype = Object.create(Phaser.Group.prototype);
Weapon.StraightBoss1.prototype.constructor = Weapon.StraightBoss1;

Weapon.StraightBoss1.prototype.fire = function (source, target) {
    var x = source.x;
    var y = source.y-40;

    this.getFirstExists(false).fire(x, y, 90+3, this.bulletSpeed+100, 7, 7, 0, 0);
    this.getFirstExists(false).fire(x, y, 90-3, this.bulletSpeed+100, 7, 7, 0, 0);
    this.getFirstExists(false).fire(x, y, 90, this.bulletSpeed+100, 7, 7, 0, 0);
};