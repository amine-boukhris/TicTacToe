
let board = [
  ['','',''],
  ['','',''],
  ['','','']
];

let players = ['X', 'O'];

let currentPlayer;
let available = [];

function setup() {
  createCanvas(400, 400);
  //frameRate(1);
  currentPlayer = floor(random(players.length));
  for (let j=0; j<3; j++) {
    for (let i=0; i<3; i++) {
      available.push( [i,j] )
    }
  }
}


function nextTurn() {
  let index = floor(random(available.length));
  let spot = available.splice(index, 1)[0];
  let i = spot[0];
  let j = spot[1];
  board[i][j] = players[currentPlayer];
  currentPlayer = (currentPlayer + 1) % players.length;
}

function checkWinner() {
  let winner = null;
  
  for ( let i = 0; i < 3 ; i++) {
    if ( board[i][0] == board[i][1] && board[i][1] == board[i][2] && board[i][0] != '') {
      winner = board[i][0];
    }
  } // horizontal
  
  for ( let i = 0; i < 3 ; i++) {
    if ( board[0][i] == board[1][i] && board[1][i] == board[2][i] && board[0][i] != '') {
      winner = board[0][i];
    }
  } // vertical
  
  
  if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != '') {
    winner = board[0][0];
  }
  if (board[0][2] == board[1][1] && board[1][1] == board[2][0]&& board[0][2] != '') {
    winner = board[0][2];
  }
  
  
  if (winner != null) {
    return winner;
  }
  if (available.length == 0) {
    return winner;
  }
  if (winner != null && available.length == 0) {
    return "tie";
  }
}



/*
function mousePressed() {
  nextTurn();
}
*/

function draw() {
  background(220);
  let w = width / 3;
  let h = height / 3;
  
  line(w, 0, w, height);
  line(w*2, 0, w*2, height);
  line(0, h, width, h);
  line(0, h*2, width, h*2);
  
  for (let j=0; j<3; j++) {
    for (let i=0; i<3; i++) {
      let x = w*i + w/2;
      let y = h*j + h/2;
      spot = board[i][j];
      textSize(32);
      strokeWeight(4);
      if (spot == players[1]) {
        noFill();
        ellipse(x,y,w/2);
      } else if (spot == players[0]) {
        let xr = w/4;
        line(x-xr, y-xr, x+xr, y+xr);
        line(x-xr, y+xr, x+xr, y-xr);
      } 
      //line(x+w/2, y-h/2, x+w/2, y+h/2);
      //line(x-w/2,y+h/2, x+h/2, y+h/2);
    }
  }
  
  
  let result = checkWinner();
  if (result != null) {
    noLoop();
    createP(result).style('color' , '#fff').style('font-size', '32pt');
  }
  nextTurn();
}










