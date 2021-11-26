var b1 = document.getElementById("b1");
var b2 = document.getElementById("b2");
var b3 = document.getElementById("b3");
var b4 = document.getElementById("b4");
var b5 = document.getElementById("b5");
var b6 = document.getElementById("b6");
var b7 = document.getElementById("b7");
var b8 = document.getElementById("b8");
var b9 = document.getElementById("b9");
var list = [b1, b2, b3, b4, b5, b6, b7, b8, b9];
var turn = 1; /* 1 for X and 0 for O */
var print = document.getElementById('print');
var checkTie = false;
var toContinue = true;
var boxes = document.getElementsByClassName('box');

function checkTurns(id) {
    tempElement = document.getElementById(id)
    if (turn == 1) {
        tempElement.value = "X";
        tempElement.disabled = true;
        turn = 0;
    }
    else {
        tempElement.value = "O";
        tempElement.disabled = true;
        turn = 1;
    }
}

function checkWinning() {
    var flagBreak = false;
    for (var i = 0; i < list.length; i++) {
        if (list[i].value == '') {
            /* only need to check tie when the whole board is filled up */
            flagBreak = true;
            break;
        }
    }

    if (flagBreak) {
        checkTie = false;
    }
    else {
        checkTie = true;
    }

    if (checkTie) {
        if (!(checkWinningHelper('X') || checkWinningHelper('O'))) {
            print.innerHTML = "We have a tie";
            window.confirm('Tie');
        }
    }
    else {
        if (turn == 0) {
            /* the previous turn is X */
            if (checkWinningHelper('X')) {
                toContinue = false;
                disableAll();
                print.innerHTML = 'We have a winner!';
                window.alert("Player X Wins!");
            }
        }
        else {
            if (checkWinningHelper('O')) {
                toContinue = false;
                disableAll();
                print.innerHTML = 'We have a winner!';
                window.alert("Player O Wins!");
            }
        }

        if (toContinue) {
            if (turn == 1) {
                print.innerHTML = "Player X's Turn";
            }
            else {
                print.innerHTML = "Player O's Turn";
            }
        }
    }
}

function checkWinningHelper(element) {
    /* element = 'X' or 'O' */
    if (b1.value == element && b2.value == element && b3.value == element) {
        return true;
    }
    else if (b4.value == element && b5.value == element && b6.value == element) {
        return true;
    }
    else if (b7.value == element && b8.value == element && b9.value == element) {
        return true;
    }
    else if (b1.value == element && b4.value == element && b7.value == element) {
        return true;
    }
    else if (b2.value == element && b5.value == element && b8.value == element) {
        return true;
    }
    else if (b3.value == element && b6.value == element && b9.value == element) {
        return true;
    }
    else if (b1.value == element && b5.value == element && b9.value == element) {
        return true;
    }
    else if (b3.value == element && b5.value == element && b7.value == element) {
        return true;
    }
    else {
        return false;
    }
}

function disableAll() {
    for (var i = 0; i < list.length; i++) {
        list[i].disabled = true;
    }
}

function reset() {
    location.reload();
    boxes.value = '';
}
