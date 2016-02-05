var Bullet = function (game, key, id, i) {
    Phaser.Sprite.call(this, game, 0, 0, key);
    this.id = id + "_" + i;

    this.game = game;

    this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;

    this.anchor.set(0.5,0.5);

    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
    this.exists = false;

    this.tracking = false;
    this.scaleSpeed = 0;
    this.animation = false;
    this.indestructible = false;
    this.power = 0;
};

Bullet.prototype = Object.create(Phaser.Sprite.prototype);
Bullet.prototype.constructor = Bullet;

Bullet.prototype.fire = function(x, y, angle, speed, width, height, gx, gy){
    gx = gx || 0;
    gy = gy || 0;

    this.reset(x, y);
    this.scale.set(1);

    this.game.physics.arcade.velocityFromAngle(angle, speed, this.body.velocity);

    this.angle = angle;

    this.body.setSize(width, height, 0, 0);

    this.body.gravity.set(gy, gx);

    if (this.animation){
        this.animations.play('fire');
    }
};

Bullet.prototype.update = function () {
    if (this.tracking)
    {
        this.rotation = Math.atan2(this.body.velocity.y, this.body.velocity.x);
    }

    if (this.scaleSpeed > 0)
    {
        this.scale.x += this.scaleSpeed;
        this.scale.y += this.scaleSpeed;
    }
};

Bullet.prototype.saveData = function() {
    store.set(this.id+'.exists', this.exists);
    //console.log(this.id + " - " + this.exists);
    if(this.exists){
        //console.log(this.id);
        store.set(this.id+'.x', this.x);
        store.set(this.id+'.y', this.y);
        store.set(this.id+'.rotation', this.rotation);
        store.set(this.id+'.angle', this.angle);
        store.set(this.id+'.velocity.x', this.body.velocity.x);
        store.set(this.id+'.velocity.y', this.body.velocity.y);
        store.set(this.id+'.scale.x', this.scale.x);
        store.set(this.id+'.scale.y', this.scale.y);
        store.set(this.id+'.gravity.x', this.body.gravity.x);
        store.set(this.id+'.gravity.y', this.body.gravity.y);
    }
}

Bullet.prototype.loadData = function() {
    var exist = store.get(this.id+'.exists');
    //console.log(this.id + " - " + exist);
    if(exist){
        //consle.log(this.id);
        var x = store.get(this.id+'.x');
        var y = store.get(this.id+'.y');
        this.reset(x, y);

        this.rotation = store.get(this.id+'.rotation');
        this.angle = store.get(this.id+'.angle');
        this.body.velocity.x = store.get(this.id+'.velocity.x');
        this.body.velocity.y = store.get(this.id+'.velocity.y');
        this.scale.x = store.get(this.id+'.scale.x');
        this.scale.y = store.get(this.id+'.scale.y');
        this.body.gravity.x = store.get(this.id+'.gravity.x');
        this.body.gravity.y = store.get(this.id+'.gravity.y');
    }
    else{
        this.exists = exist ;
    }
}