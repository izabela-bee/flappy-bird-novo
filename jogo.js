const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('#game-canvas');
const contexto = canvas.getContext('2d');

function loop(){

    contexto.drawImage(
        sprites,
        0, 0,
        35, 25,
        10, 50, 
        35, 25);

        requestAnimationFrame(loop);
    
}

loop();