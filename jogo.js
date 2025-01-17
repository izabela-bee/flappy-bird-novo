const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('#game-canvas');
const contexto = canvas.getContext('2d');




const flappyBird = {
    spriteX: 0,
    spriteY: 0,
    largura: 35,
    altura: 25,
    x: 10,
    y: 50,
    gravidade: 0.25,
    velocidade: 0,
    desenha(){
        contexto.drawImage(
            sprites,
            flappyBird.spriteX, flappyBird.spriteY,
            flappyBird.largura, flappyBird.altura,
            flappyBird.x, flappyBird.y,
            flappyBird.largura, flappyBird.altura,
            );
        }, 
        atualiza(){
            flappyBird.y = flappyBird.y + 1
            flappyBird.velocidade +- flappyBird.gravidade;
            flappyBird.y - flappyBird.y + flappyBird.velocidade;
        }
    }

    const chao = {
        spriteX: 0,
        spriteY: 609,
        largura: 223,
        altura: 115,
        x: 0,
        y: 380,
        desenhachao(){
            contexto.drawImage(
                sprites,
                chao.spriteX, chao.spriteY,
                chao.largura, chao.altura,
                chao.x, chao.y,
                chao.largura, chao.altura,
                );

                contexto.drawImage(
                    sprites,
                    chao.spriteX, chao.spriteY,
                    chao.largura, chao.altura,
                    chao.x+chao.largura, chao.y,
                    chao.largura, chao.altura,
                    );

        }
    }

        const planoFundo = {
            spriteX: 400,
            spriteY: 0,
            largura: 265,
            altura: 204,
            x: 0,
            y: 177,
            desenhafundo(){
                contexto.drawImage(
                    sprites,
                    planoFundo.spriteX, planoFundo.spriteY,
                    planoFundo.largura, planoFundo.altura,
                    planoFundo.x, planoFundo.y,
                    planoFundo.largura, planoFundo.altura,
                    );

                    contexto.drawImage(
                        sprites,
                        planoFundo.spriteX, planoFundo.spriteY,
                        planoFundo.largura, planoFundo.altura,
                        planoFundo.x+planoFundo.largura, planoFundo.y,
                        planoFundo.largura, planoFundo.altura,
                        );

                }
            }

            const inicio = {
                spriteX: 125,
                spriteY: 0,
                largura: 185,
                altura: 153,
                x: 65,
                y: 90,
                desenhainicio(){
                    contexto.drawImage(
                        sprites,
                        inicio.spriteX, inicio.spriteY,
                        inicio.largura, inicio.altura,
                        inicio.x, inicio.y,
                        inicio.largura, inicio.altura,
                        );
                    }
                }
        
                const start = {
                    spriteX: 200,
                    spriteY: 320,
                    largura: 87,
                    altura: 32,
                    x: 111,
                    y: 270,
                    desenhastart(){
                        contexto.drawImage(
                            sprites,
                            start.spriteX, start.spriteY,
                            start.largura, start.altura,
                            start.x, start.y,
                            start.largura, start.altura,
                            );
                        }
                    }
    
const TelaInicio = {
    desenha(){
        planoFundo.desenhafundo();
        chao.desenhachao();
        flappyBird.desenha();
        inicio.desenhainicio();
        start.desenhastart();
    },
    click(){
        telaAtiva = TelaJogo;
    }
}

const TelaJogo = {
    desenha(){
        planoFundo.desenhafundo();
        chao.desenhachao();
        flappyBird.desenha();
        flappyBird.atualiza();
    },
    click(){}
    }

var telaAtiva = TelaInicio;

function mudaTelaAtiva(){
    telaAtiva.click();
}
window.addEventListener("click", mudaTelaAtiva);

function loop(){
    contexto.fillStyle = '#70c5ce';
    contexto.fillRect(0,0, canvas.width, canvas.height)
    telaAtiva.desenha() 
    requestAnimationFrame(loop);
}
        
loop();
