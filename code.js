
//Global variavel
var btnsEntrada = [];
var possiveisDefesas = [];
var possiveisAtaques = [];
var possiveisVitoria = [];
var txtInfoPlayer;
var player;
var placarX,placarO;
var playerX,playerO;
var turnoPlayer;
var mudarPlayer;
var gerarNumero;
var ctngVerificar;
var verificarDef;
var numeroDefesa;
var caminhoArqGame;
//mensagens
const mensagemEmpate  = "O jogo empatou,não houve vencedores!";
const mensagemVitoria = "Parabéns, Jogo vencido pelo ";
const mensagemLugarOcupado = "Selecione um lugar ainda não preenchido!";
const mensagemFimJogo  = "Fim de jogo, para continuar jogando renicie o tabuleiro!";
 
//Instanciados variaveis 
function iniciarVariaveis(){
 //Pegar caminho do arquivp
  caminhoArqGame = window.location.pathname;
  
  //Pegando pontuação do parametro                                                "O= 0";
  playerX = getUrlVars()["X"];
  playerO = getUrlVars()["O"];	  
  
 //Pegar info do turno do jojgador
 turnoPlayer = document.getElementById("turnoPlayer");

 //Pegar info placar
 placarX = document.getElementById("placarGameX");
 placarO = document.getElementById("placarGameO");
 
 //Setando placar 
 placarX.innerHTML = "<p class='btn btn-danger btn-block text-uppercase font-weight-bold'>X:"+playerX+"</p>";
 placarO.innerHTML = "<p class='btn btn-success btn-block text-uppercase font-weight-bold'>O:"+playerO+"</p>"; 

 //Coletar quem vai jogar
 txtInfoPlayer = document.getElementById("lblInfoPlayer");
 
 //Entrada da 1 fileira
 btnsEntrada[0] = document.getElementById("btnActionUm");
 btnsEntrada[1] = document.getElementById("btnActionDois");
 btnsEntrada[2] = document.getElementById("btnActionTres");

 //Entrada da 2 fileira
 btnsEntrada[3] = document.getElementById("btnActionQuatro");
 btnsEntrada[4] = document.getElementById("btnActionCinco");
 btnsEntrada[5] = document.getElementById("btnActionSeis");

 //Entrada da 3 fileira
 btnsEntrada[6] = document.getElementById("btnActionSete");
 btnsEntrada[7] = document.getElementById("btnActionOito");
 btnsEntrada[8] = document.getElementById("btnActionNove");
 
/*
 *Possiveis jogadas para defender
*/

 //Possiveis defesa [campo já preenchido,campo já preenchido,campo a ser preenchido]
 possiveisDefesas = [
 [0,1,2], //0
 [1,2,0], //1
 [3,4,5], //2
 [4,5,3], //3
 [6,7,8], //4
 [8,7,6], //5
 [0,3,6], //6
 [3,6,0], //7
 [1,4,7], //8
 [4,7,1], //9
 [2,5,8], //10
 [5,8,2], //11
 [0,4,8], //12
 [4,8,0], //13
 [2,4,6], //14
 [4,6,2], //15
 [0,6,3], //16
 [1,7,4], //17
 [2,8,5], //18
 [0,8,4], //19
 [2,6,4], //20
 [0,6,3], //21
 [0,2,1], //22
 [0,8,4], //23
 [1,7,4], //24
 [2,0,1], //25
 [3,5,4], //26
 [6,0,3], //27
 [6,8,7], //28
 ];
 
 //Possiveis ataques [representa o endereço do botão btnsEntrada]
 possiveisAtaques[0] = 4; //0
 possiveisAtaques[1] = 0; //1
 possiveisAtaques[2] = 2; //2
 possiveisAtaques[3] = 1; //3
 possiveisAtaques[4] = 6; //4
 possiveisAtaques[5] = 8; //5
 possiveisAtaques[6] = 7; //6
 possiveisAtaques[7] = 3; //7
 possiveisAtaques[8] = 5; //8
 
 //Possibilidades de vitorias [identificador do botão]
 possiveisVitoria = [
 [0,1,2], //0
 [3,4,5], //1
 [6,7,8], //2
 [0,4,8], //3
 [2,4,6], //4
 [0,3,6], //5
 [1,4,7], //6
 [2,5,8]  //7
 ];
 
} 
	
//Verifica o notão que iniciou a ação atraves do numero passado pelo parametro
function verificaBotaoGerouAcao(obj){

  //Verifica se o jogo ainda esta em andamento 
  if(txtInfoPlayer.value != "off"){   
  
   //Realizar jogada sozinho
   realizarJogadaSolo(obj);
   
   //verificar situação do jogo
   verificarFimSozinho();
   
  }else{
   alert(mensagemFimJogo);	 
  }
}

//Realizar Jogada sozinho
function realizarJogadaSolo(obj){
	
   //Só realizara a jogada se o campo estiver vazio caso contrario exibe mensagem
   if(btnsEntrada[obj].value == ""){
    btnsEntrada[obj].value = "X";
    verificarAtaqueDefesa(); 
   }else{
    alert(mensagemLugarOcupado);	   
   }
 
}

//Verifica se os campos foram todos preenchidos caso não houver vencedores(Empate) jogando sozinho
function verificarEmpateSozinho(){
	 
  //Realiza a verificação dos campos
  if(btnsEntrada[0].value != "" && btnsEntrada[1].value != "" && btnsEntrada[2].value != "" && 
     btnsEntrada[3].value != "" && btnsEntrada[4].value != "" && btnsEntrada[5].value != "" && 
     btnsEntrada[6].value != "" && btnsEntrada[7].value != "" && btnsEntrada[8].value != ""){ 
   
	turnoPlayer.innerHTML = mensagemEmpate; 
	 txtInfoPlayer.value = "off";
   }
}

//Verifica fim de jogo caso jogando contra a maquina                                              
function verificarFimSozinho(){
   
 //Repitição para realizar verificão do andamento do jogo
 for(var x=0; x<=8; x++){
	 
 //Realizar a verificação
  if(btnsEntrada[possiveisVitoria[x][0]].value == "X" && btnsEntrada[possiveisVitoria[x][1]].value == "X" && btnsEntrada[possiveisVitoria[x][2]].value == "X" && txtInfoPlayer.value != "off"){
	verificarVitoria("X");
   }else if(btnsEntrada[possiveisVitoria[x][0]].value == "O" && btnsEntrada[possiveisVitoria[x][1]].value == "O" && btnsEntrada[possiveisVitoria[x][2]].value == "O" && txtInfoPlayer.value != "off"){
	verificarVitoria("O");
   }
 }
  
}

//Contagem vitoria ao usuario e mostrar
function verificarVitoria(player){
	
  //Verifica iniciou contagem
  //playerO = (playerO == null) ? 0 : playerO;
  //playerX = (playerX == null) ? 0 : playerX;
  
  //Realizar o ponto da vitoria e mostra menssagem do vencedor
   switch(player){
	  case "X":
       playerX++;
        txtInfoPlayer.value = "off";
		 alert(mensagemVitoria+player);
          break;
      case "O":
       playerO++; 
        txtInfoPlayer.value = "off";
		 alert(mensagemVitoria+player);
          break;		  
   } 
}

//Resetar tabuleiro para recomeçar o jogo contra a maquina
function outroJogosPosVitoriaSozinho(){
 window.location = caminhoArqGame+"?"+"X="+playerX+"&"+
                                                 "O="+playerO;
}

//Gerar numero de (x-x)
function geraNumero(low, high){
 if(geraNumero == null){
  geraNumero = Math.floor(Math.random() * (high - low + 1)) + low 
 }else{
  gerarNumero = null; 
 }
 alert(geraNumero);
}

//function verificar se realiza ataque ou defesa
function verificarAtaqueDefesa(){
  
  if(btnsEntrada[0].value == "O" && btnsEntrada[1].value == "O"){ //Verificar se a "Maquina" ganha 
  btnsEntrada[2].value == "O";
  }else if(btnsEntrada[2].value == "O" && btnsEntrada[1].value == "O"){ //Verificar se a "Maquina" ganha 
  btnsEntrada[0].value == "O";
  }else if(btnsEntrada[3].value == "O" && btnsEntrada[4].value == "O"){ //Verificar se a "Maquina" ganha 
  btnsEntrada[5].value == "O";
  }else if(btnsEntrada[4].value == "O" && btnsEntrada[5].value == "O"){ //Verificar se a "Maquina" ganha 
  btnsEntrada[3].value == "O";
  }else if(btnsEntrada[6].value == "O" && btnsEntrada[7].value == "O"){ //Verificar se a "Maquina" ganha 
  btnsEntrada[8].value == "O";
  }else if(btnsEntrada[7].value == "O" && btnsEntrada[8].value == "O"){ //Verificar se a "Maquina" ganha 
  btnsEntrada[6].value == "O";
  }else if(btnsEntrada[0].value == "O" && btnsEntrada[4].value == "O"){ //Verificar se a "Maquina" ganha 
  btnsEntrada[8].value == "O";
  }else if(btnsEntrada[4].value == "O" && btnsEntrada[8].value == "O"){ //Verificar se a "Maquina" ganha 
  btnsEntrada[0].value == "O";
  }else if(btnsEntrada[2].value == "O" && btnsEntrada[4].value == "O"){ //Verificar se a "Maquina" ganha 
  btnsEntrada[6].value == "O";
  }else if(btnsEntrada[4].value == "O" && btnsEntrada[6].value == "O"){ //Verificar se a "Maquina" ganha 
  btnsEntrada[2].value == "O";
  }else if(btnsEntrada[0].value == "O" && btnsEntrada[6].value == "O"){ //Verificar se a "Maquina" ganha 
  btnsEntrada[3].value == "O";
  }else if(btnsEntrada[0].value == "O" && btnsEntrada[3].value == "O"){ //Verificar se a "Maquina" ganha 
  btnsEntrada[6].value == "O";
  }else if(btnsEntrada[1].value == "O" && btnsEntrada[4].value == "O"){ //Verificar se a "Maquina" ganha 
  btnsEntrada[7].value == "O";
  }else if(btnsEntrada[2].value == "O" && btnsEntrada[5].value == "O"){ //Verificar se a "Maquina" ganha 
  btnsEntrada[8].value == "O";
  }else if(btnsEntrada[1].value == "O" && btnsEntrada[7].value == "O"){ //Verificar se a "Maquina" ganha 
  btnsEntrada[4].value == "O";
  }else if(btnsEntrada[2].value == "O" && btnsEntrada[8].value == "O"){ //Verificar se a "Maquina" ganha 
  btnsEntrada[5].value == "O";
  }
   
 if(btnsEntrada[0].value == "X" && btnsEntrada[1].value == "X" && btnsEntrada[2].value == ""){ //0
   defender();  
  }else if(btnsEntrada[1].value == "X" && btnsEntrada[2].value == "X" && btnsEntrada[0].value == ""){ //1
   defender();  
  }else if(btnsEntrada[3].value == "X" && btnsEntrada[4].value == "X" && btnsEntrada[5].value == ""){ //2
   defender();   
  }else if(btnsEntrada[4].value == "X" && btnsEntrada[5].value == "X" && btnsEntrada[3].value == ""){ //3
   defender();  
  }else if(btnsEntrada[6].value == "X" && btnsEntrada[7].value == "X" && btnsEntrada[8].value == ""){ //4
   defender();   
  }else if(btnsEntrada[8].value == "X" && btnsEntrada[7].value == "X" && btnsEntrada[6].value == ""){ //5
   defender();   
  }else if(btnsEntrada[0].value == "X" && btnsEntrada[3].value == "X" && btnsEntrada[6].value == ""){ //6
   defender();  
  }else if(btnsEntrada[3].value == "X" && btnsEntrada[6].value == "X" && btnsEntrada[0].value == ""){ //7
   defender();   
  }else if(btnsEntrada[1].value == "X" && btnsEntrada[4].value == "X" && btnsEntrada[7].value == ""){ //8
   defender();   
  }else if(btnsEntrada[4].value == "X" && btnsEntrada[7].value == "X" && btnsEntrada[1].value == ""){ //9
   defender();   
  }else if(btnsEntrada[2].value == "X" && btnsEntrada[5].value == "X" && btnsEntrada[8].value == ""){ //10
   defender();  
  }else if(btnsEntrada[5].value == "X" && btnsEntrada[8].value == "X" && btnsEntrada[2].value == ""){ //11
   defender();   
  }else if(btnsEntrada[0].value == "X" && btnsEntrada[4].value == "X" && btnsEntrada[8].value == ""){ //12
   defender();  
  }else if(btnsEntrada[4].value == "X" && btnsEntrada[8].value == "X" && btnsEntrada[0].value == ""){ //13
   defender();
  }else if(btnsEntrada[2].value == "X" && btnsEntrada[4].value == "X" && btnsEntrada[6].value == ""){ //14
   defender();   
  }else if(btnsEntrada[4].value == "X" && btnsEntrada[6].value == "X" && btnsEntrada[2].value == ""){ //15
   defender();  
  }else if(btnsEntrada[0].value == "X" && btnsEntrada[6].value == "X" && btnsEntrada[3].value == ""){ //16
   defender();  
  }else if(btnsEntrada[1].value == "X" && btnsEntrada[7].value == "X" && btnsEntrada[4].value == ""){ //17
   defender();  
  }else if(btnsEntrada[2].value == "X" && btnsEntrada[8].value == "X" && btnsEntrada[5].value == ""){ //18
   defender();  
  }else if(btnsEntrada[0].value == "X" && btnsEntrada[8].value == "X" && btnsEntrada[4].value == ""){ //19
   defender();  
  }else if(btnsEntrada[2].value == "X" && btnsEntrada[6].value == "X" && btnsEntrada[4].value == ""){ //20
   defender();  
  }else if(btnsEntrada[0].value == "X" && btnsEntrada[6].value == "X" && btnsEntrada[3].value == ""){ //21
   defender();  
  }else if(btnsEntrada[0].value == "X" && btnsEntrada[2].value == "X" && btnsEntrada[1].value == ""){ //22
   defender();  
  }else if(btnsEntrada[0].value == "X" && btnsEntrada[8].value == "X" && btnsEntrada[4].value == ""){ //23
   defender();  
  }else if(btnsEntrada[1].value == "X" && btnsEntrada[7].value == "X" && btnsEntrada[4].value == ""){ //24
   defender();  
  }else if(btnsEntrada[2].value == "X" && btnsEntrada[0].value == "X" && btnsEntrada[1].value == ""){ //25
   defender();  
  }else if(btnsEntrada[3].value == "X" && btnsEntrada[5].value == "X" && btnsEntrada[4].value == ""){ //26
   defender();  
  }else if(btnsEntrada[6].value == "X" && btnsEntrada[0].value == "X" && btnsEntrada[3].value == ""){ //27
   defender();  
  }else if(btnsEntrada[6].value == "X" && btnsEntrada[8].value == "X" && btnsEntrada[7].value == ""){ //28
   defender();  
  }else{
   atacar();  
  }
 
}

//Possiveis jogadas que podem ser realizada
function atacar(){
  //verifica se não houve nenhum vencedor(empate)
  verificarEmpateSozinho();
  //---
  if(btnsEntrada[0].value == "X" && btnsEntrada[1].value == "X" && btnsEntrada[2].value == "X"){ //Verificando se jogo continua 
  }else if(btnsEntrada[3].value == "X" && btnsEntrada[4].value == "X" && btnsEntrada[5].value == "X"){ //Verificando se jogo continua
  }else if(btnsEntrada[6].value == "X" && btnsEntrada[7].value == "X" && btnsEntrada[8].value == "X"){ //Verificando se jogo continua 
  }else if(btnsEntrada[0].value == "X" && btnsEntrada[4].value == "X" && btnsEntrada[8].value == "X"){ //Verificando se jogo continua 
  }else if(btnsEntrada[2].value == "X" && btnsEntrada[4].value == "X" && btnsEntrada[6].value == "X"){ //Verificando se jogo continua 
  }else if(btnsEntrada[0].value == "X" && btnsEntrada[3].value == "X" && btnsEntrada[6].value == "X"){ //Verificando se jogo continua 
  }else if(btnsEntrada[1].value == "X" && btnsEntrada[4].value == "X" && btnsEntrada[7].value == "X"){ //Verificando se jogo continua
  }else if(btnsEntrada[2].value == "X" && btnsEntrada[5].value == "X" && btnsEntrada[8].value == "X"){ //Verificando se jogo continua
  }else{
    
  //Realizar uma contagem
  if(gerarNumero == null || gerarNumero > 8){
   gerarNumero=0;
  }else{
   gerarNumero++;  
  }
  	
   //Verificação para realizar ataques
   if(btnsEntrada[possiveisAtaques[gerarNumero]].value == ""){ 
    btnsEntrada[possiveisAtaques[gerarNumero]].value = "O";
    }else{
	atacar();   
   }
   
  }
}

//Defendar jogada 
function defender(){
	
 //Checagem dos campos já jogados para realizar defesa
 for(var x = 0 ; x<=28 ; x++){
  if(btnsEntrada[possiveisDefesas[x][0]].value == "X" && btnsEntrada[possiveisDefesas[x][1]].value == "X"){
   btnsEntrada[possiveisDefesas[x][2]].value = "O"; 
  }	  
   }
     
}

//Pegar parametos da url
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}


