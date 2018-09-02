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
    game = false;
    pause = true;
    die = false;
});

ee.on('gameOver', () => {
    game = false;
    pause = false;
    die = true;
});

//вызов событий
ee.emit('gameOn');
setTimeout(_ => ee.emit('gamePause'), 5000);        // через 5 секунд после начала
setTimeout(_ => ee.emit('gameOn'), 8000);           // через 8 секунд после начала
setTimeout(_ => ee.emit('gameOver'), 10000);        // через 10 секунд после начала

let i = 1;
setTimeout(function go() {
    let tick = setTimeout(go, 1000);
    //если game == true
    if (game) log(i + ' game on');

    //если pause == true
    if(pause) log(i + ' pause');

    //если die == true
    if(die){
        clearTimeout(tick);
        log(i + ' game over');
    }
    i++;
}, 10);
