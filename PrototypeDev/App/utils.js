function angleEnemyPlayer(x, y, tx, ty){
	var dx = tx-x;
	var dy = ty-y;

	if(dx==0){
		if(y>ty){
			return -90;
		}
		else{
			return 90;
		}
	}

	var angleRad = Math.atan(dy/dx);
	var angle = angleRad * (180 / Math.PI);

	if(x>tx){
		angle += 180;
	}

	return angle;
}

function tintDamage(enemy, healthMax){
	var ratio = Math.floor(((enemy.health / healthMax) * Math.pow(16, 2))-1);
	var ratioHex = ratio.toString(16); 	// 0x????
	if(ratio<16){
		ratioHex = "0" + ratioHex;
	}

	var tint =  Math.pow(16, 2)-1;
	var tintHex = tint.toString(16);	// 0xFF

	enemy.tint = "0x" + tintHex + ratioHex + ratioHex;		// 0xFF????
}

function blink(sprite) {
	if (sprite.tint == 0xFFFFFF) {
        sprite.tint = 0xFF0000;
    }
    else {
        sprite.tint = 0xFFFFFF;
    }
};