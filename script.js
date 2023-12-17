var board = ['', '', '', '', '', '', '', '', ''];
var currentPlayer = 'X';
var gameActive = true;
var scores = {
    'X': 0,
    'O': 0
};
var mode = '2Players';

function renderBoard() {
    var boardElement = document.getElementById('board');
    boardElement.innerHTML = '';
    
    for (var i = 0; i < 9; i++) {
        var cell = document.createElement('div');
        cell.className = 'cell';
        cell.setAttribute('data-index', i);
        cell.textContent = board[i];
        cell.addEventListener('click', handleCellClick);
        boardElement.appendChild(cell);
    }
}

function handleCellClick(event) {
    if (!gameActive) return;

    var index = event.target.getAttribute('data-index');
    
    if (board[index] === '') {
        board[index] = currentPlayer;
        renderBoard();
        if (checkWinner()) {
            document.getElementById('status').textContent = getPlayerName(currentPlayer) + ' wins!';
            scores[currentPlayer]++;
            updateScore();
            gameActive = false;
        } else if (board.every(cell => cell !== '')) {
            document.getElementById('status').textContent = 'It\'s a draw!';
            gameActive = false;
        } else {
            currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
            document.getElementById('status').textContent = getPlayerName(currentPlayer) + '\'s turn';
            if (mode === 'vsComputer' && currentPlayer === 'O') {
                playComputerMove();
            }
        }
    }
}

function playComputerMove() {
    // Simple computer move: choose the first available empty cell
    for (var i = 0; i < 9; i++) {
        if (board[i] === '') {
            setTimeout(function() {
                board[i] = currentPlayer;
                renderBoard();
                if (checkWinner()) {
                    document.getElementById('status').textContent = 'Computer wins!';
                    scores[currentPlayer]++;
                    updateScore();
                    gameActive = false;
                } else if (board.every(cell => cell !== '')) {
                    document.getElementById('status').textContent = 'It\'s a draw!';
                    gameActive = false;
                } else {
                    currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
                    document.getElementById('status').textContent = getPlayerName(currentPlayer) + '\'s turn';
                }
            }, 500);
            break;
        }
    }
}

function checkWinner() {
    for (var i = 0; i < 3; i++) {
        if (board[i] !== '' && board[i] === board[i + 3] && board[i] === board[i + 6]) {
            return true;
        }
        if (board[i * 3] !== '' && board[i * 3] === board[i * 3 + 1] && board[i * 3] === board[i * 3 + 2]) {
            return true;
        }
    }

    if (board[0] !== '' && board[0] === board[4] && board[0] === board[8]) {
        return true;
    }

    if (board[2] !== '' && board[2] === board[4] && board[2] === board[6]) {
        return true;
    }

    return false;
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    document.getElementById('status').textContent = getPlayerName(currentPlayer) + '\'s turn';
    renderBoard();

    if (mode === 'vsComputer' && currentPlayer === 'O') {
        playComputerMove();
    }
}

function updateScore() {
    document.getElementById('score').textContent = 'Player X: ' + scores['X'] + ' | Player O: ' + scores['O'];
}

function getPlayerName(player) {
    return (player === 'X') ? 'Player X' : 'Player O';
}

function changeGameMode() {
    mode = document.getElementById('mode').value;
    resetGame();
}