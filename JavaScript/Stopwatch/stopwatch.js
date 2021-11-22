var tens = 0;
var seconds = 0;
var minutes = 0;
var displayTens = document.getElementById("tens");
var displaySeconds = document.getElementById("seconds");
var displayMinutes = document.getElementById("minutes");
var buttonStart = document.getElementById("buttonStart");
var buttonStop = document.getElementById("buttonStop");
var buttonResume = document.getElementById("buttonResume")
var timerRunning = false;

buttonStart.onclick = function () {
    if (timerRunning == false) {
        timerRunning = true;
        Timer();
    }
}

buttonStop.onclick = function () {
    if (timerRunning == true) {
        timerRunning = false;
    }
}

buttonResume.onclick = function () {
    timerRunning = false;
    tens = 0;
    seconds = 0;
    minutes = 0;
    displayTens.innerHTML = "00";
    displaySeconds.innerHTML = "00";
    displayMinutes.innerHTML = "00";
}

function Timer() {
    if (timerRunning == true) {
        tens++;
            if (tens <= 9) {
                displayTens.innerHTML = "0" + tens;
            }
            else if (tens > 9 && tens <= 99) {
                displayTens.innerHTML = tens;
            }
            else {
                tens = 0;
                displayTens.innerHTML = "0" + 0;
                seconds++;
            }

            if (seconds <= 9) {
                displaySeconds.innerHTML = "0" + seconds;
            }
            else if (seconds > 9 && seconds <= 59) {
                displaySeconds.innerHTML = seconds;
            }
            else {
                seconds = 0;
                displaySeconds.innerHTML = "0" + seconds;
                minutes++;
            }

            if (minutes <= 9) {
                displayMinutes.innerHTML = "0" + minutes;
            }
            else if (minutes > 9 && minutes <= 99) {
                displayMinutes.innerHTML = minutes;
            }
            else {
                displayTens = "XX";
                displaySeconds = "XX";
                displayMinutes.innerHTML = "XX";
        }
    }
    setTimeout("Timer()", 10); //call the function after the time specified in milliseconds (1000 ms = 1 second) has passed
}
