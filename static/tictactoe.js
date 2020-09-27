let sock = new WebSocket('ws://127.0.0.1:8090/socket');

fetch('http://127.0.0.1:8090/game/start')
    .then(response => {
        console.log( response );
    });

fetch('http://127.0.0.1:8090/game/place', {

})
.then(response => {
    console.log( response );
});

let boardState = Array(9).fill('');
let playerTurn = 1;
const player = {
    1 : 'X',
    2 : 'O',
}

sock.onopen = function(event) {
    console.log('connected to socket');
};

sock.onmessage = function(event) {
    console.log(event);
    console.log(event.data);
    const data = JSON.parse( event.data );

    var name = data.name;

    switch(name){
        case 'place':
            var board = data.data;
            var state = board.split(',');

            // updatePlayerTurn(curTurn);
            playerTurn = ( playerTurn % 2 ) + 1;
            updateBoard(state);
            break;
        case 'reset':
            updatePlayerTurn(1);
            updateBoard(Array(9).fill(""));
            break;
        default:
    }
}

function updatePlayerTurn(turn){
    playerTurn = turn;
}

function updateBoard(state){
    boardState = state;
    draw();
}

function clickListener( id )
{
    return function( e )
    {
        console.log( 'clicked: ' + id )
        let y = Math.floor(id / 3);
        let x = id - (y * 3);

        let msg = {
            name : 'place',
            data : {
                x : x,
                y : y,
                player : playerTurn,
            }
        };
        sock.send(JSON.stringify(msg));
    }
}

function draw(){
    for(var i=0; i<boardState.length;i++){
        document.getElementById(i).innerHTML = boardState[i];
    }

    document.getElementById('nextPlayer').innerHTML = player[playerTurn];
}

window.onload = () => {
    draw();

    document.querySelectorAll('#board td').forEach( e => {
        e.addEventListener( 'click', clickListener( parseInt(e.id, 10) ) );
    });
};
