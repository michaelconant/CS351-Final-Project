const ROCK_SVG = '<svg viewBox="0 0 24 24"><path d="M11 11.5v-1a1.5 1.5 0 0 1 3 0v1.5" /><path d="M17 12v-6.5a1.5 1.5 0 0 1 3 0v10.5a6 6 0 0 1 -6 6h-2h.208a6 6 0 0 1 -5.012 -2.7a69.74 69.74 0 0 1 -.196 -.3c-.312 -.479 -1.407 -2.388 -3.286 -5.728a1.5 1.5 0 0 1 .536 -2.022a1.867 1.867 0 0 1 2.28 .28l1.47 1.47" /><path d="M14 10.5a1.5 1.5 0 0 1 3 0v1.5" /><path d="M8 13v-8.5a1.5 1.5 0 0 1 3 0v7.5" /></svg>';
const PAPER_SVG = '<svg viewBox="0 0 24 24"><path d="M14 3v4a1 1 0 0 0 1 1h4" /><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" /></svg>';
const SCISSORS_SVG = '<svg viewBox="0 0 24 24"><circle cx="6" cy="7" r="3" /><circle cx="6" cy="17" r="3" /><line x1="8.6" y1="8.6" x2="19" y2="19" /><line x1="8.6" y1="15.4" x2="19" y2="5" /></svg>';
const DRAW_SVG = '<svg viewBox="0 0 24 24"><path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" /><path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" /></svg>';
const WIN_SVG = '<svg viewBox="0 0 24 24"><path d="M7 11v8a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h3a4 4 0 0 0 4 -4v-1a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1 -2 2h-7a3 3 0 0 1 -3 -3" /></svg>';
const LOSS_SVG = '<svg viewBox="0 0 24 24"><path d="M7 13v-8a1 1 0 0 0 -1 -1h-2a1 1 0 0 0 -1 1v7a1 1 0 0 0 1 1h3a4 4 0 0 1 4 4v1a2 2 0 0 0 4 0v-5h3a2 2 0 0 0 2 -2l-1 -5a2 3 0 0 0 -2 -2h-7a3 3 0 0 0 -3 3" /></svg>';

let wins = 0;
let losses = 0;
let draws = 0;
let totalGames = 0;
let currentWinStreak = 0;
let highestWinStreak = 0;

function getMoveName(move) {
    switch (move) {
        case 0:
            return "Rock";
        case 1:
            return "Paper";
        case 2:
            return "Scissors";
    }
}

function updateMoveSVG(element, move) {
    switch (move) {
        case 0:
            element.innerHTML = ROCK_SVG;
            break;
        case 1:
            element.innerHTML = PAPER_SVG;
            break;
        case 2:
            element.innerHTML = SCISSORS_SVG;
            break;
    }
}

function playRPS(move) {
    //total games
    totalGames++;
    document.getElementById('totalGames').innerHTML = totalGames;

    //generate random move
    let computerMove = Math.floor(Math.random() * 3);

    //update player and computer svg
    updateMoveSVG(document.getElementById('playerMove'), move);
    updateMoveSVG(document.getElementById('computerMove'), computerMove);

    if ((move + 1) % 3 == computerMove) {
        //if player lost
        console.log(`RPS - Loss: playerMove[${getMoveName(move)}], computerMove[${getMoveName(computerMove)}]`);

        losses++;
        currentWinStreak = 0;

        //update states after loss
        document.getElementById('losses').innerHTML = losses;
        document.getElementById('currentWinStreak').innerHTML = currentWinStreak;
    
        //update match result
        document.getElementById('gameResult').innerHTML = LOSS_SVG;
    } else {
        if (move == computerMove) {
            //if player tied
            console.log(`RPS - Draw: playerMove[${getMoveName(move)}], computerMove[${getMoveName(computerMove)}]`);

            draws++;
            document.getElementById('draws').innerHTML = draws;

            //update match result
        document.getElementById('gameResult').innerHTML = DRAW_SVG;
        } else {
            //if player won
            console.log(`RPS - Win: playerMove[${getMoveName(move)}], computerMove[${getMoveName(computerMove)}]`);

            wins++;
            currentWinStreak++;
            document.getElementById('wins').innerHTML = wins;
            document.getElementById('currentWinStreak').innerHTML = currentWinStreak;

            //check if the highest win streak was beat
            if (currentWinStreak > highestWinStreak) {
                highestWinStreak = currentWinStreak;
                document.getElementById('highestWinStreak').innerHTML = highestWinStreak;
            }

            //update match result
            document.getElementById('gameResult').innerHTML = WIN_SVG;
        }
    }

}