const log = console.log;

const EE = require('events').EventEmitter;
const ee = new EE();

let die = false;
let game = false;
let pause = false;

//создать событие
ee.on('gameOn', () => {
    game = true;
    pause = false;
    die = false;
});

ee.on('gamePause', () => {
    pause = true;
    game = true;
    die = false;
});

ee.on('gameOver', () => {
    die = true;
    game = false;
    pause = false;
});

//вызов событий
ee.emit('gameOn');
setTimeout(_ => ee.emit('gamePause'), 5000);
setTimeout(_ => ee.emit('gameOn'), 8000);
setTimeout(_ => ee.emit('gameOver'), 10000);

setTimeout(function go() {
    
    //если game == true 
    if (game){
        log('game on');
        setTimeout(go, 1000);
    }
    
    //если pause == true 
    if(pause){
        log('pause');
        setTimeout(go, 1000);
    }
    
    //если die == true
    if(die){
        log('game over');
    }
}, 10);
