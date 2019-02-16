class Jogo{

	constructor(palavraSecreta, etapa, lacunas){
		this.palavraSecreta = palavraSecreta;
		this.etapa = etapa;
		this.lacunas = lacunas;
	}

	getPalavraSecreta(){
		return this.palavraSecreta;
	}

	setPalavraSecreta(palavraSecreta){
		this.palavraSecreta = palavraSecreta;
	}	

	getEtapa(){
		return this.etapa;
	}

	setEtapa(etapa){
		this.etapa = etapa;
	}

	getLacunas(){
		return this.lacunas;
	}

	setLacunas(lacunas){
		this.lacunas = lacunas;
	}

}