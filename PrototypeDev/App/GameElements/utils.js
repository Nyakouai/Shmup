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