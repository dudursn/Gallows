



class JogoController{

	constructor($entrada, $lacunas, sprite, palavraSecreta="", etapa=1, lacunas=[]){
		
		this.$entrada = $entrada;
		this.$lacunas = $lacunas;
		this.sprite = sprite;
		this.buffer = [];
		this.jogo = new Jogo(palavraSecreta, etapa, lacunas);
	}

	getLacunas(){
		return this.jogo.getLacunas();
	}	

	getEtapa(){
		return this.jogo.getEtapa();
	}

	// faz a associação do evento keypress para capturar a entrada do usuário toda vez que ele teclar ENTER
	inicia(){

		self = this;
		this.$entrada.keypress(function (event) {
            if (event.which == 13) {

                switch (self.getEtapa()) {
                    case 1:
                    	
                    	//self referencia JogoController, this referencia a função agora
                      	self.guardaPalavraSecreta(); 
                        break;

                    case 2:
                        self.leChute();
                        break;
                        
                    default:
                    	break;
                }
                self.$entrada.val("");
            }
        });
	}

	//Passa para jogo.setPalavraSecreta() o valor digitado pelo jogador e chama o a função `exibeLacunas()` e `mudaPlaceHolder()` definidas no controller. 
	guardaPalavraSecreta(){
		try{
			if(this.getEtapa()==1){
				this.setPalavraSecreta(this.$entrada.val().trim());
				this.exibeLacunas();
	            this.mudaPlaceHolder("chute");
			}
		}catch(err){
			alert(err.message);
		}
	}

	setPalavraSecreta(palavraSecreta){

		if(!palavraSecreta.trim()) throw Error('Palavra inválida');
		var qtd = palavraSecreta.length, lacunas = [];

		this.jogo.setEtapa(2);

		for(let i = 0; i<qtd;i+=1)
			lacunas.push("");
		//var lacunas = Array(palavraSecreta.length).fill('')

		this.jogo.setLacunas(lacunas);

		this.jogo.setPalavraSecreta(palavraSecreta);
	}

	// consulta jogo.getLacunas() e exibe para o usuário cada lacuna 
	exibeLacunas(){
		
		if(this.getEtapa()==2){

			for(var i = 0; i < this.getLacunas().length; i++){

				var li = $("<li>");
				li.addClass("lacuna")
					.attr("id",""+i)
					.text(this.jogo.getLacunas()[i]);
 
				this.$lacunas.append(li);
			}
		}

	}

	// muda o texto do placeHolder do campo de entrada
	mudaPlaceHolder(texto){

		this.$entrada.attr("placeholder", texto);

	}

	//Passa o chute do usuaria para ser processado
	leChute(){
		try{
			this.processaChute(this.$entrada.val().trim().substr(0,1));
			this.finalizaJogo();
		} catch(err) {
            alert(err.message);
        }
		
	}	

	processaChute(chute){

		if(!chute.trim()) throw Error("Chute Inválido!");

		if(this.jogo.getPalavraSecreta!=""){

			var encontrou = false, exp, resultado = [];
			//Verifica se o chute ja foi dado 
			if (!this.buffer.includes(chute)){

				//Adiciona um chute ao buffer
				this.buffer.push(chute)

				//Cria regex - g: busca além da primeira ocorrencia, i:nao diferencia mauiuscula e minuscula
				exp = new RegExp(chute,"gi");

				while(resultado!=null){

					resultado = exp.exec(this.jogo.getPalavraSecreta());

					if (resultado!=null){

						encontrou = true;
						this.preencheLacuna(resultado.index, chute);
					}
				}
				
				if (encontrou == false){

					this.preencheSprite();
				}
			}
		}
	}

	//Processo para finalizar o jogo e mostrar o resultado
	finalizaJogo(){

		if(this.ganhouOuPerdeu()){
			var msg = "";
			if(this.ganhou()){
				msg = "Parabéns,você ganhou!";
			}else if(this.perdeu()){
				msg = "Você perdeu!\nResposta Certa: "+this.jogo.getPalavraSecreta();
			}

			self = this;
			setTimeout(function(){
				alert(msg);
				self.removeLacunas();
				self.mudaPlaceHolder("Palavra secreta");
				self.reinicia();
			},250);
			
		}
	}

	preencheLacuna(pos, chute){

		this.jogo.getLacunas()[pos] = chute;
		$("#"+pos).text(chute);
	}

	preencheSprite(){

		this.sprite.nextFrame();
	}

	removeLacunas(){
		this.$lacunas.find("li").remove();
		
	}

	
	ganhou(){
		var exp, 
			palavraNasLacunas = this.jogo.getLacunas().join(""),
			palavraResposta = this.jogo.getPalavraSecreta();

		if(palavraResposta!=""){
			exp = new RegExp(palavraResposta,"i");
			return exp.test(palavraNasLacunas);
		}
		return false;
	}

	perdeu(){
		return this.sprite.isFinished();
	}

	ganhouOuPerdeu(){
		return(this.ganhou() || this.perdeu());
	}

	reinicia(){
		this.sprite.reset();
		this.buffer = [];
		this.jogo = new Jogo("", 1, []);
	}
}
