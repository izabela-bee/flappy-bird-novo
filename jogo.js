const sprites = new Image();
sprites.src = './sprites.png';
const som_punch = new Audio();
som_punch.src = './punch.wav'

let animation_frame = 0;
var count = 0;
let elemento = document.getElementById('contador')
let pontuacao = document.getElementById('score')

const canvas = document.querySelector('#game-canvas');
const contexto = canvas.getContext('2d');

let chaoX = 0;
let planoFundoX = 0;
let tubosX = 220;

const flappyBird = {
  spriteX: 0,
  spriteY: 0,
  largura: 35,
  altura: 25,
  x: 10,
  y: 50,
  gravidade: 0.18,
  velocidade: 0,
  pula: 4.6,
  movimentos: [
    {spriteX: 0, spriteY: 0,},
    {spriteX: 0, spriteY: 26,},
    {spriteX: 0, spriteY: 52,},
    {spriteX: 0, spriteY: 26,},
  ],
  frameAtual: 0,
  desenha() {
    contexto.drawImage(
      sprites,
      flappyBird.spriteX, flappyBird.spriteY,
      flappyBird.largura, flappyBird.altura,
      flappyBird.x, flappyBird.y,
      flappyBird.largura, flappyBird.altura
    );
  },
  atualiza() {
    if (colisaochao()){
      som_punch.play();
      telaAtiva = Telafinal;
      return;
    }
    flappyBird.velocidade += flappyBird.gravidade;
    flappyBird.y += flappyBird.velocidade;
    flappyBird.atualizaFrame();
  },
  voar() {
    flappyBird.velocidade = -flappyBird.pula;
  },
  atualizaFrame(){
    if ((animation_frame % 10) ===  0){
    flappyBird.frameAtual = flappyBird.frameAtual + 1;
    flappyBird.frameAtual = flappyBird.frameAtual % flappyBird.movimentos.length;
    flappyBird.spriteX = flappyBird.movimentos[flappyBird.frameAtual].spriteX;
    flappyBird.spriteY = flappyBird.movimentos[flappyBird.frameAtual].spriteY;
  }}
};


const chao = {
  spriteX: 0,
  spriteY: 609,
  largura: 223,
  altura: 115,
  x: 0,
  y: 380,
  desenhachao() {
    contexto.drawImage(
      sprites,
      chao.spriteX, chao.spriteY,
      chao.largura, chao.altura,
      chaoX, chao.y,
      chao.largura, chao.altura
    );
    contexto.drawImage(
      sprites,
      chao.spriteX, chao.spriteY,
      chao.largura, chao.altura,
      chaoX + chao.largura, chao.y,
      chao.largura, chao.altura
    );
  },
  atualizar() {
    chao.x = chao.x - 1;
    chao.x = chao.x % (chao.largura / 2);
  }
};

const planoFundo = {
  spriteX: 400,
  spriteY: 0,
  largura: 265,
  altura: 204,
  x: 0,
  y: 177,
  velocidade: 0.5,
  desenhafundo() {
    contexto.drawImage(
      sprites,
      planoFundo.spriteX, planoFundo.spriteY,
      planoFundo.largura, planoFundo.altura,
      planoFundoX, planoFundo.y,
      planoFundo.largura, planoFundo.altura
    );
    contexto.drawImage(
      sprites,
      planoFundo.spriteX, planoFundo.spriteY,
      planoFundo.largura, planoFundo.altura,
      planoFundoX + planoFundo.largura, planoFundo.y,
      planoFundo.largura, planoFundo.altura
    );
  },
  atualizar() {
    planoFundoX -= planoFundo.velocidade;
    if (planoFundoX <= -planoFundo.largura) {
      planoFundoX = 0;
  };
  }
}

const inicio = {
  spriteX: 125,
  spriteY: 0,
  largura: 185,
  altura: 153,
  x: 65,
  y: 90,
  desenhainicio() {
    contexto.drawImage(
      sprites,
      inicio.spriteX, inicio.spriteY,
      inicio.largura, inicio.altura,
      inicio.x, inicio.y,
      inicio.largura, inicio.altura
    );
  }
};

const tubos = {
  
  largura: 53,
  altura: 270,
  ceu: {
    spriteX: 0,
    spriteY: 168,
    x: 240,
    y: 0, 
  },
  chao: {
    spriteX: 0,
    spriteY: 168,
  },
  
  velocidade: 2,
  pares: [],
  espacamento: 120,
  desenhatubos() {
    const espacamento = 120
    for (i=0;i<tubos.pares.length;i++){
      tubos.ceu.x = tubos.pares[i].x;
      tubos.ceu.y = tubos.pares[i].y;
    }
    contexto.drawImage(
      sprites,
      tubos.ceu.spriteX, tubos.ceu.spriteY,
      tubos.largura, tubos.altura,
      tubos.ceu.x, tubos.ceu.y,
      tubos.largura, tubos.altura
    );
    const canochaox = tubos.ceu.x;
    const canochaoy = tubos.altura + espacamento + tubos.ceu.y;
    contexto.drawImage(
      sprites,
      tubos.chao.spriteX, tubos.chao.spriteY,
      tubos.largura, tubos.altura,
      canochaox, canochaoy,
      tubos.largura, tubos.altura
    );
  },
  atualizar() {
    tubos.ceu.x -= 2; 
    const passou100frames = (animation_frame % 100 === 0);
    if (passou100frames){
      const novopar = {
        x: canvas.width,
        y: -150 * (Math.random() + 1),
      }
      tubos.pares.push(novopar);
    }
    for (i=0;i<tubos.pares.length;i++){
      const par = tubos.pares[i];
      par.x -= 2;
    }
    if(par.x + tubos.largura <= 0){
      tubos.pares.shift();
    }
    if (fazcolisaocomobstaculo(par)){
      som_punch.play();
      telaAtiva = TelaInicio;
      return;
    }
  },
  colisaoComFlappyBird() {
    if (
      flappyBird.x + flappyBird.largura > tubos.x &&
      flappyBird.x < tubos.x + tubos.largura &&
      (flappyBird.y < tubos.altura || flappyBird.y + flappyBird.altura > tubos.y + tubos.altura + tubos.espaco)
    ) {
      som_punch.play();
      pontuacao.style.display = 'block';
      return true;
    }
    return false; 
  }
};

const start = {
  spriteX: 200,
  spriteY: 320,
  largura: 87,
  altura: 32,
  x: 111,
  y: 270,
  desenhastart() {
    contexto.drawImage(
      sprites,
      start.spriteX, start.spriteY,
      start.largura, start.altura,
      start.x, start.y,
      start.largura, start.altura
    );
  }
};

const gameOver = {
  spriteX: 135,
  spriteY: 154,
  largura: 250,
  altura: 239,
  x: 53,
  y: 130,
  desenhaover() {
    contexto.drawImage(
      sprites,
      gameOver.spriteX, gameOver.spriteY,
      gameOver.largura, gameOver.altura,
      gameOver.x, gameOver.y,
      gameOver.largura, gameOver.altura
    );
  }
};


const TelaInicio = {
  pontuacaostyledisplay:'none',
  desenha() {
    planoFundo.desenhafundo();
    chao.desenhachao();
    flappyBird.desenha();
    inicio.desenhainicio();
    start.desenhastart();
  },
  click() {
    telaAtiva = TelaJogo;
    count = 0;
    elemento.innerHTML = count;
    pontuacao.innerHTML = count;
  }
};

const TelaJogo = {
  pontuacaostyledisplay:'none',
  desenha() {
    planoFundo.desenhafundo();
    tubos.desenhatubos();
    chao.desenhachao();
    chao.atualizar();
    planoFundo.atualizar();
    tubos.atualizar();
    flappyBird.desenha();
    flappyBird.atualiza();
    if (tubos.colisaoComFlappyBird()) {
      telaAtiva = Telafinal;
      pontuacao.style.display = 'block';
      elemento.style.display = 'none';
    }
  },
  click() {
    flappyBird.voar();
  },
};

const Telafinal = {
  elementostyledisplay:'none',
  pontuacaostyledisplay:'block',
  desenha() {
    planoFundo.desenhafundo();
    gameOver.desenhaover();
    chao.desenhachao();
    flappyBird.desenha();
    pontuacao.innerHTML = count;
  },
  click() {
    flappyBird.y = 50;
    telaAtiva = TelaJogo;
    flappyBird.velocidade = 0;
    tubos.x = 220;
    tubos.y = 0;
    count = 0;
    elemento.innerHTML = count;
    pontuacao.innerHTML = count;
    pontuacao.style.display = 'none';
  }
};

let telaAtiva = TelaInicio;

function mudaTelaAtiva() {
  telaAtiva.click();
}

window.addEventListener("click", mudaTelaAtiva);

function colisaochao(){
  if (flappyBird.y + flappyBird.altura >= chao.y || flappyBird.y < 0){
    telaAtiva = Telafinal;
    pontuacao.style.display = 'block';
    elemento.style.display = 'none';
    return true;
  }
  else{
    elemento.style.display = 'block';
  return false;}
}

function atualizaContador(){
  if (telaAtiva === TelaJogo){
    count++;
    elemento.innerHTML = count;
  }
}

function fazcolisaocomobstaculo(par){
  if(flappyBird.x >= par.x){
    const alturacabecaflappybird = flappyBird.y;
    const alturapeflappybird = flappyBird.y + flappyBird.altura;
    const bocacanoceuy = par.y + tubos.altura;
    const bocacanochaoy = par.y + tubos.altura + tubos.espacamento;
    if (alturacabecaflappybird <= bocacanoceuy){
      return true;
    }
    if (alturapeflappybird <= bocacanochaoy){
      return true;
    }
  }
  return false;
}

setInterval(atualizaContador, 1000);

function loop() {
  contexto.fillStyle = '#70c5ce';
  contexto.fillRect(0, 0, canvas.width, canvas.height);
  telaAtiva.desenha();
  requestAnimationFrame(loop);
  animation_frame++;
}

loop();