var Weapon = {};

///////////////////////////////////
/* Bullet Level 1 */

Weapon.BulletLvl1 = function (game) {
    Phaser.Group.call(this, game, game.world, 'Bullet Level 1', false, true, Phaser.Physics.ARCADE);
    this.id = "BulletLvl1";

    this.nextFire = 0;
    this.bulletSpeed = 500;
    this.fireRate = 150;
    this.power = 1;

    for (var i = 0; i < 64; i++)
    {
        this.add(new Bullet(game, 'bullet8', this.id, i), true);
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

    this.getFirstExists(false).fire(x, y, -90, this.bulletSpeed, 11, 20, 0, 0);

    this.nextFire = this.game.time.time + this.fireRate;
};

///////////////////////////////////
/* Bullet Level 2 (11x20) */

Weapon.BulletLvl2 = function (game) {
    Phaser.Group.call(this, game, game.world, 'Bullet Level 2', false, true, Phaser.Physics.ARCADE);
    this.id = "BulletLvl2";

    this.nextFire = 0;
    this.bulletSpeed = 500;//1000;
    this.fireRate = 150;//50;
    this.power = 1;

    for (var i = 0; i < 96; i++)
    {
        this.add(new Bullet(game, 'bullet8', this.id, i), true);
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

    this.getFirstExists(false).fire(x-5, y-5, -105, this.bulletSpeed, 11, 20, 0, 0);
    this.getFirstExists(false).fire(x+5, y-5, -75, this.bulletSpeed, 11, 20, 0, 0);
    this.getFirstExists(false).fire(x, y, -90, this.bulletSpeed, 11, 20, 0, 0);

    this.nextFire = this.game.time.time + this.fireRate;
};

///////////////////////////////////
/* Bullet Level 3 */

Weapon.BulletLvl3 = function (game) {
    Phaser.Group.call(this, game, game.world, 'Bullet Level 3', false, true, Phaser.Physics.ARCADE);
    this.id = "BulletLvl3";

    this.nextFire = 0;
    this.bulletSpeed = 500;//1000;
    this.fireRate = 150;//75;
    this.power = 2;

    for (var i = 0; i < 96; i++)
    {
        this.add(new Bullet(game, 'bullet4', this.id, i), true);
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

    this.getFirstExists(false).fire(x-5, y-5, -105, this.bulletSpeed, 30, 13, 0, 0);
    this.getFirstExists(false).fire(x+5, y-5, -75, this.bulletSpeed, 30, 13, 0, 0);
    this.getFirstExists(false).fire(x, y, -90, this.bulletSpeed, 30, 13, 0, 0);

    this.nextFire = this.game.time.time + this.fireRate;
};

///////////////////////////////////
/* Fireball (28x26) */

Weapon.Fireball = function (game) {
    Phaser.Group.call(this, game, game.world, 'Fireball', false, true, Phaser.Physics.ARCADE);
    this.id = "Fireball";

    this.nextFire = 0;
    this.bulletSpeed = 500;
    this.fireRate = 1600;
    this.power = 4;

    for (var i = 0; i < 20; i++)
    {
        this.add(new Bullet(game, 'fireball', this.id, i), true);
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
    this.id = "BulletEnemy1";

    this.bulletSpeed = 200;
    this.shotDelay = 3000;

    for (var i = 0; i < 64; i++)
    {
        this.add(new Bullet(game, 'bullet7', this.id, i), true);
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

/* Bullet Enemy2 (11x11) */

Weapon.BulletEnemy2 = function (game) {
    Phaser.Group.call(this, game, game.world, 'Bullet Enemy2', false, true, Phaser.Physics.ARCADE);
    this.id = "BulletEnemy2";

    this.bulletSpeed = 200;
    this.shotDelay = 2000;

    for (var i = 0; i < 64; i++)
    {
        this.add(new Bullet(game, 'bullet7', this.id, i), true);
    }

    return this;
};

Weapon.BulletEnemy2.prototype = Object.create(Phaser.Group.prototype);
Weapon.BulletEnemy2.prototype.constructor = Weapon.BulletEnemy2;

Weapon.BulletEnemy2.prototype.fire = function (source, target) {
    var x = source.x;
    var y = source.y+20;
    var rand = this.game.rnd.integerInRange(-5,5);
    var randNb = this.game.rnd.integerInRange(0,1);

    if(randNb){
        this.getFirstExists(false).fire(x, y, 100+rand, this.bulletSpeed, 7, 7, 0, 0);
        this.getFirstExists(false).fire(x, y, 80+rand, this.bulletSpeed, 7, 7, 0, 0);
        this.getFirstExists(false).fire(x, y, 90+rand, this.bulletSpeed, 7, 7, 0, 0);
     }
     else{
        this.getFirstExists(false).fire(x, y, 75+rand, this.bulletSpeed, 7, 7, 0, 0);
        this.getFirstExists(false).fire(x, y, 85+rand, this.bulletSpeed, 7, 7, 0, 0);
        this.getFirstExists(false).fire(x, y, 95+rand, this.bulletSpeed, 7, 7, 0, 0);
        this.getFirstExists(false).fire(x, y, 105+rand, this.bulletSpeed, 7, 7, 0, 0);
    }
};

/* Bullet EnemyTowerBoss (11x11) */

Weapon.BulletEnemyTowerBoss = function (game) {
    Phaser.Group.call(this, game, game.world, 'Bullet EnemyTowerBoss', false, true, Phaser.Physics.ARCADE);
    this.id = "BulletEnemyTowerBoss";

    this.bulletSpeed = 200;
    this.shotDelay = 2000;

    for (var i = 0; i < 64; i++)
    {
        this.add(new Bullet(game, 'bullet7', this.id, i), true);
    }

    return this;
};

Weapon.BulletEnemyTowerBoss.prototype = Object.create(Phaser.Group.prototype);
Weapon.BulletEnemyTowerBoss.prototype.constructor = Weapon.BulletEnemyTowerBoss;

Weapon.BulletEnemyTowerBoss.prototype.fire = function (source, target) {
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
    this.id = "PatternBoss1";

    this.bulletSpeed = 200;
    this.shotDelay = 25;

    this.pattern = Phaser.ArrayUtils.numberArrayStep(-800, 800, 105);
    this.pattern = this.pattern.concat(Phaser.ArrayUtils.numberArrayStep(800, -800, -105));

    this.patternIndex = 0;

    for (var i = 0; i < 64; i++)
    {
        this.add(new Bullet(game, 'bullet7', this.id, i), true);
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
    this.id = "SpreadBoss1";

    this.bulletSpeed = 200;
    this.shotDelay = 1000;

    for (var i = 0; i < 90; i++)
    {
        this.add(new Bullet(game, 'bullet7', this.id, i), true);
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
    this.id = "HomingBoss1";

    this.bulletSpeed = 100;
    this.shotDelay = 1000;

    for (var i = 0; i < 90; i++)
    {
        this.add(new Bullet(game, 'bullet7', this.id, i), true);
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
    this.id = "StraightBoss1";

    this.bulletSpeed = 300;
    this.shotDelay = 10;

    for (var i = 0; i < 200; i++)
    {
        this.add(new Bullet(game, 'bullet7', this.id, i), true);
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