
//Global variavel
var btnsEntrada = [];
var possiveisDefesas = [];
var possiveisAtaques = [];
var txtInfoPlayer;
var player;
var placarX,placarO;
var playerX,playerO;
var turnoPlayer;
var mudarPlayer;
var gerarNumero;
var ctngVerificar;
var verificarDef;

//mensagens
const mensagemEmpate  = "O jogo empatou,não houve vencedores!";
const mensagemVitoria = "Parabéns, Jogo vencido pelo ";
const mensagemLugarOcupado = "Selecione um lugar ainda não preenchido!";
const mensagemFimJogo  = "Fim de jogo, para continuar jogando renicie o tabuleiro!";
 
//Instanciados variaveis 
function iniciarVariaveis(){
	
//Pegar info do turno do jojgador
turnoPlayer = document.getElementById("turnoPlayer");

//Pegar info placar
placarX = document.getElementById("placarGameX");
placarO = document.getElementById("placarGameO");

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
 *colunas  1 e 2 - campos já preenchido e 3 - Campo que será preenchido
*/

 //Possiveis defesa [campo já preenchido,campo já preenchido,campo a ser preenchido]
 possiveisDefesas = [
 [0,1,2], 
 [1,2,0]
 ];
 
 //Possiveis ataques [representa o endereço do botão btnsEntrada]
 possiveisAtaques[0] = 4;
 possiveisAtaques[1] = 0;
 possiveisAtaques[2] = 2;
 possiveisAtaques[3] = 1;
 possiveisAtaques[4] = 6;
 possiveisAtaques[5] = 8;
 possiveisAtaques[6] = 7;
 possiveisAtaques[7] = 3;
 possiveisAtaques[8] = 5;

 
} 

//Verifica o notão que iniciou a ação atraves do numero passado pelo parametro
function verificaBotaoGerouAcao(obj){

//Realizar Jogada Caso tenha 2 jogadores
realizarJogada(obj);

//Verifica fim de jogo
verificarFim();



}

//Realizar Jogada com 2 players
function realizarJogada(obj){
	
 if(btnsEntrada[obj].value == "" && txtInfoPlayer.value != "off"){
	 
  switch(txtInfoPlayer.value){
   case "X":
    btnsEntrada[obj].value = "X";
     txtInfoPlayer.value = "O";
	  turnoPlayer.innerHTML = "Vez de jogar: O";
  	   break;
   case "O":
    btnsEntrada[obj].value = "O";
     txtInfoPlayer.value = "X";
	  turnoPlayer.innerHTML = "Vez de jogar: X";
  	   break;		
	} 
}
	
}

//Realizar Jogada sozinho
function realizarJogadaSolo(obj){
   if(btnsEntrada[obj].value == ""){
    btnsEntrada[obj].value = "X";
     txtInfoPlayer.value = "O";
	  escolherJogadaMaquina();
   }else{
    alert(mensagemLugarOcupado);	   
   }
 
}

//Verificar player
function verificarPlayer(){
 return (txtInfoPlayer.value == "X") ? "O" : "X";	
}

//Verifica se os campos foram todos preenchidos caso não houver vencedores(Empate)
function verificarEmpate(){

 //Realiza a verificação dos campos
 if(btnsEntrada[0].value != "" && btnsEntrada[1].value != "" && btnsEntrada[2].value != "" && 
    btnsEntrada[3].value != "" && btnsEntrada[4].value != "" && btnsEntrada[5].value != "" && 
    btnsEntrada[6].value != "" && btnsEntrada[7].value != "" && btnsEntrada[8].value != ""){ 

    //Caso todos preenchido exibe a mensa e chama metodos para resetar campos e mudar player
	alert(mensagemEmpate); 
	 outroJogosPosVitoria();
	 
   }
}

//Verifica fim de jogo                                               
function verificarFim(){                   
 
 /* Descrição do jogo
  * 0 1 2 
  * 3 4 5 
  * 6 7 8 
 */
 
 player = verificarPlayer(); //Verifica Player  
 
 //Verifica situação do jogo
 if(btnsEntrada[0].value == player && btnsEntrada[1].value == player && btnsEntrada[2].value ==  player){ // 0 1 2
  txtInfoPlayer.value = "off";
   verificarVitoria(player);
    outroJogosPosVitoria();
 }else if(btnsEntrada[3].value == player && btnsEntrada[4].value == player && btnsEntrada[5].value ==  player){ // 3 4 5 
  txtInfoPlayer.value = "off";
   verificarVitoria(player);
    outroJogosPosVitoria();
 }else if(btnsEntrada[6].value == player && btnsEntrada[7].value == player && btnsEntrada[8].value ==  player){ // 6 7 8
  txtInfoPlayer.value = "off";
   verificarVitoria(player);
    outroJogosPosVitoria();
 }else if(btnsEntrada[0].value == player && btnsEntrada[4].value == player && btnsEntrada[8].value ==  player){ // 0 4 8
  txtInfoPlayer.value = "off";
   verificarVitoria(player);
    outroJogosPosVitoria();
 }else if(btnsEntrada[0].value == player && btnsEntrada[3].value == player && btnsEntrada[6].value ==  player){ // 0 3 6
  txtInfoPlayer.value = "off";
   verificarVitoria(player);
    outroJogosPosVitoria();
 }else if(btnsEntrada[1].value == player && btnsEntrada[4].value == player && btnsEntrada[7].value ==  player){ // 1 4 7
  txtInfoPlayer.value = "off";
   verificarVitoria(player);
    outroJogosPosVitoria();
 }else if(btnsEntrada[2].value == player && btnsEntrada[5].value == player && btnsEntrada[8].value ==  player){ // 2 5 8
  txtInfoPlayer.value = "off";
   verificarVitoria(player);
    outroJogosPosVitoria();
 }else if(btnsEntrada[2].value == player && btnsEntrada[4].value == player && btnsEntrada[6].value ==  player){ // 2 4 6
  txtInfoPlayer.value = "off";
   verificarVitoria(player);
    outroJogosPosVitoria();
 }else{
  verificarEmpate();
 }	 
	
}

//Contagem vitoria ao usuario e mostrar
function verificarVitoria(player){
	
  //Verifica iniciou contagem
  playerO = (playerO == null) ? 0 : playerO;
  playerX = (playerX == null) ? 0 : playerX;
  
  //Realizar o ponto da vitoria e mostra menssagem do vencedor
   switch(player){
	  case "X":
       ++playerX;
        placarX.innerHTML = "<p class='btn btn-success btn-block text-uppercase font-weight-bold'>X:"+playerX+"</p>";
		 placarO.innerHTML = "<p class='btn btn-danger btn-block text-uppercase font-weight-bold'>O:"+playerO+"</p>";
         alert(mensagemVitoria+player);
          break;
      case "O":
       ++playerO;
         placarX.innerHTML = "<p class='btn btn-danger btn-block text-uppercase font-weight-bold'>X:"+playerX+"</p>";
		 placarO.innerHTML = "<p class='btn btn-success btn-block text-uppercase font-weight-bold'>O:"+playerO+"</p>";
         alert(mensagemVitoria+player);
          break;		  
   } 
}

//Resetar tabuleiro para recomeçar o jogo e muda o player 
function outroJogosPosVitoria(){
 
 //Mudar Player
 mudarPlayer = (mudarPlayer == null || mudarPlayer=="X") ? "O" : "X";
 
 //Realiza a troca de player
 switch(mudarPlayer){
  case "X":
   txtInfoPlayer.value= "X";
    turnoPlayer.innerHTML = "Vez de jogar: X";
    break; 
  case "O":
   txtInfoPlayer.value= "O";
     turnoPlayer.innerHTML = "Vez de jogar: O";
    break;	
 }
 
 //Resetar campos
 for(var x=0 ; x<=8 ; x++){
   btnsEntrada[x].value = "";	 
 }
 
}




