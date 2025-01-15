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
    desenha(){
        contexto.drawImage(
            sprites,
            flappyBird.spriteX, flappyBird.spriteY,
            flappyBird.largura, flappyBird.altura,
            flappyBird.x, flappyBird.y,
            flappyBird.largura, flappyBird.altura,
            );
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



function loop(){
        
    flappyBird.desenha();
    chao.desenhachao();
    planoFundo.desenhafundo();
        
    requestAnimationFrame(loop);
}
        
loop();
