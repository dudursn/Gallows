function criaJogo(){
	var sprite = criaSprite(".sprite");
	var $entrada = $(".entrada");
	var $lacunas = $(".lacunas");
	var j = new JogoController($entrada, $lacunas, sprite);
	return j;
}

function criaSprite(seletorCSS){

	var sprite =  null;
	numFrames = 9;
	while(numFrames>0){

		var proximo = sprite;
		sprite = new Sprite("frame"+numFrames, seletorCSS, proximo);
		numFrames -=1;
	}
	return sprite;
}