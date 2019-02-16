class Sprite{
	constructor(frameI, seletorCSS, proximo){

		this.frameI = frameI;
		this.$seletor = $(seletorCSS);
		this.proximo = proximo
		this.auxiliar = proximo;
	}
	
	nextFrame(){
		
		if(this.auxiliar!=null){		
			this.$seletor.addClass(this.auxiliar.frameI);
			this.auxiliar = this.auxiliar.proximo;
		}
	}

	reset(){

		var aux = this.proximo;
		while(aux!=null){
			this.$seletor.removeClass(aux.frameI);
			aux = aux.proximo;
		}
		this.auxiliar = this.proximo;
	}

	isFinished(){

		if (this.auxiliar!=null){
			return false;
		}
		return true
	}
}

