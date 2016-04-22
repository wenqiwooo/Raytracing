function change( el ) {
    if ( el.value === "Using CPU" ) {
        selection = 1;
        el.value = "Using GPU";
    } else {
        selection = 0;
        el.value = "Using CPU";
    }
}

function getOnPixels(onPixels){
    var height = onPixels.length;
    var width = onPixels[0].length;
    var result = [];
    for (var i = 0; i < height; i++){
        for (var j = 0; j < width; j++){
            if (onPixels[i][j] == 1){
                result.push([j, i]);
            }
        }
    }
    return result;
}

function getActiveVBoxesCoord(vBoxes){
    var height = vBoxes.length;
    var width = vBoxes[0].length;
    var result = [];
    for (var i = 0; i < height; i++){
        for (var j = 0; j < width; j++){
            if (vBoxes[i][j] == 1){
                result.push([j, i]);
            }
        }
    }
    return result;
}

function intToColorRgb(n){
    var s = n.toString();

    if (s.length != 10){
        return [0, 0, 0];
    }

    var color_r = parseInt(s.substring(1,4));
    var color_g = parseInt(s.substring(4,7));
    var color_b = parseInt(s.substring(7));
    return [color_r, color_g, color_b];
}

function colorRgbToInt(r, g, b){
    var color_r = Math.round(r * 255);
    var color_g = Math.round(g * 255);
    var color_b = Math.round(b * 255);
    return 1000000000 + color_r * 1000000 + color_g * 1000 + color_b;
}

function getColorHueFromInt(n, code){
    if (code == 0){
        return Math.round(n / 1000000) - 1000;
    } else if (code == 1){
        return Math.round((n % 1000000) / 1000);
    } else if (code == 2){
        return n % 1000;
    } else {
        return 0;
    }
}

function sqr(x) {
	return x*x;
}

function dist(x1,y1,x2,y2) {
    return Math.sqrt( sqr(x2-x1)+sqr(y2-y1) );
}

function magVector(x,y,z){
	return Math.sqrt( Math.pow(x,2)+Math.pow(y,2)+Math.pow(z,2) );
}

function intersectBB(rayPt_x, rayPt_y, rayPt_z, rayDir_x, rayDir_y, rayDir_z, bb_min_x, bb_min_y, bb_min_z, bb_max_x, bb_max_y, bb_max_z){
	// Smits algorithm
	var min_x, max_x, min_y, max_y, min_z, max_z;

    if (rayDir_x >= 0) {
       	min_x = (bb_min_x - rayPt_x) / rayDir_x;
       	max_x = (bb_max_x - rayPt_x) / rayDir_x;
	} else {
        min_x = (bb_max_x - rayPt_x) / rayDir_x;
       	max_x = (bb_min_x - rayPt_x) / rayDir_x;
    }

    if (rayDir_y >= 0) {
        min_y = (bb_min_y - rayPt_y) / rayDir_y;
        max_y = (bb_max_y - rayPt_y) / rayDir_y;
	} else {
        min_y = (bb_max_y - rayPt_y) / rayDir_y;
        max_y = (bb_min_y - rayPt_y) / rayDir_y;
    }

    if ((min_x > max_y) || (min_y > max_x)){
    	return 0;
    }

	if (min_y > min_x){
		min_x = min_y;
    }
    
    if (max_y < max_x){
    	max_x = max_y;
    }

    if (rayDir_z >= 0){
        min_z = (bb_min_z - rayPt_z) / rayDir_z;
        max_z = (bb_max_z - rayPt_z) / rayDir_z;
	} else {
        min_z = (bb_max_z - rayPt_z) / rayDir_z;
        max_z = (bb_min_z - rayPt_z) / rayDir_z;
    }

    if ((min_x > max_z) || (min_z > max_x)){
        return 0;
    }
    
    // if (min_z > min_x){
    //     min_x = min_z;
    // }

    // if (max_z < max_x){
    //     max_x = max_z;
    // }

   	// if((tmin < t1) && (tmax > t0)){
   	// 	return 1;
   	// } 
   	return 1;
}

function getScalingForZDepth(pt_z, dir_z, z){
    return (z - pt_z) / dir_z; 
}

function checkOverlappingSquares(bb_min_x, bb_min_y, bb_max_x, bb_max_y, 
    coord0_min_x, coord0_min_y, coord0_max_x, coord0_max_y, 
    coord1_min_x, coord1_min_y, coord1_max_x, coord1_max_y){
    if (bb_min_x < coord1_min_x && bb_max_x > coord0_min_x && bb_max_y > coord0_min_y && bb_min_y < coord1_min_y){
        return 1;
    }
    if (bb_min_x < coord1_max_x && bb_max_x > coord0_max_x && bb_max_y > coord0_max_y && bb_min_y < coord1_max_y){
        return 1;
    }
    return 0;
}

function getPixelCoord_x(vBox_x, thread_x, width){
    return vBox_x * width + thread_x;
}

function getPixelCoord_y(vBox_y, thread_y, height){
    return vBox_y * height + thread_y;
}




















