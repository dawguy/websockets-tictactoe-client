let sock = new WebSocket('wss://127.0.0.1:8090/socket');
const boardState = Array(9).fill('');
let playerTurn = 1;
const player = {
    1 : 'X',
    2 : 'O',
}

sock.onopen = function(event) {
    alert('We did it!');
};

sock.onmessage = function(event) {
    console.log(event);
    console.log(event.data);
    alert('Whoo!');
    const data = event.data;

    var type = data.type;

    switch(type){
        case 'placed':
            var state = data.boardState;
            var curTurn = data.curTurn;
            var nextTurn = curTurn+1;
            updatePlayerTurn(curTurn);
            updateBoard(state);
            updatePlayerTurn(nextTurn);
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

function draw(){
    for(var i=0; i<boardState.length;i++){
        document.getElementById(i).innerHTML = boardState[i];
    }

    document.getElementById('nextPlayer').innerHTML = player[playerTurn];
}

window.onload = () => {
    draw();
};