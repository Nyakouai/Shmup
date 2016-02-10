Enemy = function(game, obj, i) {
	this.game = game;
    //this.obj = obj;
    this.id = obj.id + '_' + i;

	Phaser.Sprite.call(this, game, 0, 0, obj.sprite)
    this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;

    this.weapons = [];
    this.currentWeapon = 0;
    this.nextShot = 0;
    this.score = obj.score;
    this.powerup = obj.powerup;
    this.bomb = obj.bomb;
    this.boss = obj.boss;

    //this.patterns = obj.pattern;
    this.patterns = {};
    this.speed = 0;
    this.catmull = [];
    this.healthMax = obj.health;

    this.timeOnScreen = 0;
    this.timePattern = 0;

    this.anchor.set(0.5, 0.5);
    this.scale.setTo(obj.scale[0],obj.scale[1]);
    this.tint = obj.tint;

    game.physics.arcade.enable(this);

    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
    this.exists = false;

    var hitbox = obj.hitbox
    this.body.setSize(hitbox[0], hitbox[1], 0, 0);

    this.animations.add('move',obj.animationsFrames,4,true);

    for(var i=0; i<obj.weapons.length; i++){
        this.weapons.push(new Weapon[obj.weapons[i]](game));
    }

    for(var i=0; i<obj.pattern.length; i++){
        var pattern = obj.pattern[i];
        for(var j=0; j<pattern.time.length; j++){
            this.patterns[pattern.time[j]] = pattern;
        }
    }
};

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.appear = function(x, y, speed, health){
	this.exists = true;
	this.reset(x, y, health);

    this.init(speed);

    this.animations.play('move');
}

Enemy.prototype.fire = function(player){
    if(this.currentWeapon != -1){
	   var shotDelay = this.weapons[this.currentWeapon].shotDelay;
	   if(this.game.time.time > this.nextShot){
		  this.weapons[this.currentWeapon].fire(this, player);
		  this.nextShot = this.game.time.time + shotDelay;
	   }
    }
}

Enemy.prototype.explode = function(){
	var explosion = this.game.add.sprite(this.x, this.y, 'explosion');
	this.game.physics.arcade.enable(explosion);

    explosion.anchor.setTo(0.5, 0.5);
    explosion.animations.add('boom');
    explosion.play('boom',15,false,true);

    explosion.body.velocity.x = this.body.velocity.x;
    explosion.body.velocity.y = this.body.velocity.y;

    this.exists = false;
}

Enemy.prototype.init = function(speed){
    this.speed = speed;

    //for(var i=0; i<this.patterns.length; i++){
      //  var pattern = this.patterns[i];
    if(0 in this.patterns){
        var pattern = this.patterns[0];
        if(pattern.type == "catmull"){
            var idCatmull = pattern.idCatmull;
            this.catmull[idCatmull] = new CatmullData(this.game, pattern.pointsX, pattern.pointsY);
        }
        if(pattern.type == "rotMoveToXYPattern"){
            rotMoveToXYPattern(this, pattern.XY, pattern.speed, pattern.delay);
        }
    }
}

Enemy.prototype.update = function(){
	if(this.exists){

        if(this.boss){
            tintDamage(this, this.healthMax);
        }

        if(this.timeOnScreen in this.patterns){
            this.timePattern = this.timeOnScreen;
        }
        //for(var i=0; i<this.patterns.length; i++){
          //  var pattern = this.patterns[i]
            //for(var j=0; j<pattern.time.length; j++){
              //  if(this.timeOnScreen > pattern.time[j]){

        if(this.timePattern in this.patterns){
            var pattern = this.patterns[this.timePattern];

            this.currentWeapon = pattern.weapon;
            this.fire(player);

            if(pattern.type == "catmull"){
                catmullPattern(this, pattern.idCatmull);
            }

            if(pattern.type == "moveToXY"){
                moveToXYPattern(this, pattern.XY, pattern.speed, pattern.delay);
            }

            if(pattern.type == "rotMoveToXY"){
                rotMoveToXYPattern(this, pattern.XY, pattern.speed, pattern.delay);
            }

            if(pattern.type == "velocity"){
                velocityPattern(this, pattern.axis, pattern.speed);
            }

            if(pattern.type == "restart"){
                this.timeOnScreen = pattern.setTime-1;
            }
        }

        this.timeOnScreen++;
	}
}

Enemy.prototype.kill = function(){
	Phaser.Sprite.prototype.kill.call(this);
    this.init(this.speed);

    if(this.boss)
        this.game.state.start('VictoryMenu', true, false, this.game.levelId);
}

Enemy.prototype.saveData = function() {
    store.set(this.id+'.exists', this.exists);
    if(this.exists){
        store.set(this.id+'.x', this.x);
        store.set(this.id+'.y', this.y);
        store.set(this.id+'.health', this.health);
        store.set(this.id+'.currentWeapon', this.currentWeapon);
        store.set(this.id+'.nextShot', this.nextShot);
        store.set(this.id+'.speed', this.speed);
        store.set(this.id+'.timeOnScreen', this.timeOnScreen);
        store.set(this.id+'.timePattern', this.timePattern);
        store.set(this.id+'.tint', this.tint);
        store.set(this.id+'.catmull', this.catmull);
        
        for(var i=0; i<this.weapons.length; i++){
            this.weapons[i].forEach(function (bullet){
                bullet.saveData();
            },this);
        }
    }
/*
    for(var i=0; i<this.weapons.length; i++){
        this.weapons[i].forEach(function (bullet){
            bullet.saveData();
        },this);
    }*/
}

Enemy.prototype.loadData = function() {
    var exist = store.get(this.id+'.exists');
    if(exist){
        var x = store.get(this.id+'.x');
        var y = store.get(this.id+'.y');
        var health = store.get(this.id+'.health');

        this.reset(x, y, health);
        this.currentWeapon = store.get(this.id+'.currentWeapon');
        this.nextShot = store.get(this.id+'.nextShot');
        this.speed = store.get(this.id+'.speed');
        this.timeOnScreen = store.get(this.id+'.timeOnScreen');
        this.timePattern = store.get(this.id+'.timePattern');
        this.tint = store.get(this.id+'.tint');
        this.catmull = store.get(this.id+'.catmull');

        for(var i=0; i<this.weapons.length; i++){
            this.weapons[i].forEach(function (bullet){
                bullet.loadData();
            },this);
        }
    }
    else{
        this.exists = exist ;
    }
/*
    for(var i=0; i<this.weapons.length; i++){
        this.weapons[i].forEach(function (bullet){
            bullet.loadData();
        },this);
    }*/
}




EnemyGroup = function(game, obj){
    this.game = game;
    this.obj = obj;

    Phaser.Group.call(this, game, game.world, 'EnemyGroup', false, true, Phaser.Physics.ARCADE);

    for (var i = 0; i < 10; i++){
        this.add(new Enemy(game, obj, i), true);
    }

    return this;
};

EnemyGroup.prototype = Object.create(Phaser.Group.prototype);
EnemyGroup.prototype.constructor = EnemyGroup;

EnemyGroup.prototype.appear = function(x, y, speed){
    if(x=="random"){
        x = this.game.rnd.integerInRange(20, 780);
    }

    this.getFirstExists(false).appear(x,y,speed,this.obj.health);
}


CatmullData = function(game, x, y){
    this.path = [];
    this.pi = 0;

    var dx = 1/game.width;

    for(var i=0; i<=1; i+=dx){
        var px = game.math.catmullRomInterpolation(x, i);
        var py = game.math.catmullRomInterpolation(y, i);

        this.path.push( { x: px, y: py } );
    }
}