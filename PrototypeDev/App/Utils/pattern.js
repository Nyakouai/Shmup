function catmullPattern(enemy, idCatmull){
    enemy.body.x = enemy.catmull[idCatmull].path[enemy.catmull[idCatmull].pi*enemy.speed].x;
    enemy.body.y = enemy.catmull[idCatmull].path[enemy.catmull[idCatmull].pi*enemy.speed].y;
    if(enemy.catmull[idCatmull].pi >= enemy.catmull[idCatmull].path.length){
        enemy.kill();
    }
    else{
        enemy.catmull[idCatmull].pi++;
    }
}

function moveToXYPattern(enemy, xy, speed, delay){
	var x = xy[0];
	var y = xy[1];

	if(x == "this"){
		x = enemy.x;
	}
	if(y == "this"){
		y = enemy.y;
	}

	if(speed == "this"){
		speed = enemy.speed;
	}

	enemy.game.physics.arcade.moveToXY(enemy, x, y, speed, delay);
}

function rotMoveToXYPattern(enemy, xy, speed, delay){
	var x = xy[0];
	var y = xy[1];

	if(x == "this"){
		x = enemy.x;
	}
	if(y == "this"){
		y = enemy.y;
	}

	if(x == "random"){
		x = enemy.game.rnd.integerInRange(20, enemy.game.width-20);
	}
	if(y == "random"){
		y = enemy.game.rnd.integerInRange(20, enemy.game.height-20);
	}

	if(speed == "this"){
		speed = enemy.speed;
	}

	enemy.rotation = enemy.game.physics.arcade.moveToXY(enemy, x, y, speed, delay) - Math.PI/2;
}

function velocityPattern(enemy, axis, speed){
	if(speed == "this"){
		speed = enemy.speed;
	}
	if(speed == "-this"){
		speed = -enemy.speed;
	}

	enemy.body.velocity[axis] = speed;
}