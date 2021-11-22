var numSquares = 6;
var colors = [];
var pickedColor;
var h1InitBackgroundColor = "#6495ED"; //cornflowerblue
var hiddenSquareColor = "#232323"; //very dark gray (mostly black)

//use querySelector for
//    element (eg. "h1")
//    class (eg. ".square")
//    id (eg. "#message")
var squares = document.querySelectorAll(".square");
var colorDisplay = document.querySelector("#color-display");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");
var easyButton = document.querySelector(".mode");

run();

function run() {
	setupSquares();
	setupMode();
	reset();
	colorDisplay.textContent = pickedColor;
}

function changeAllToCorrectColor(color) {
	for (var i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = color;
		h1.style.backgroundColor = color;
	}
}

function setupSquares() {
	for (var i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = colors[i];
		squares[i].addEventListener("click", function() {
			var clickedColor = this.style.backgroundColor;
			if (clickedColor === pickedColor) {
				messageDisplay.textContent = "Correct";
				resetButton.textContent = "Play Again";
				changeAllToCorrectColor(pickedColor);
			}
			else {
				//make the selected-incorrect square "invisible"
				this.style.backgroundColor = hiddenSquareColor;
				messageDisplay.textContent = "try again";
			}
		});
	}
}

function makeColor() {
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g + ", " + b + ")"; 
}

function genRandomColors(num) {
	var arrColor = [];
	for (var i = 0; i < num; i++) {
		arrColor.push(makeColor());
	}
	return arrColor;
}

function chooseColor() {
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function reset() {
	colors = genRandomColors(numSquares);
	pickedColor = chooseColor();
	colorDisplay.textContent = pickedColor;
	h1.style.backgroundColor = h1InitBackgroundColor;
	resetButton.textContent = "New Colors";
	messageDisplay.textContent = "Let's go";
	for (var i = 0; i < squares.length; i++) {
		if (colors[i]) { 
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		}
		else {
			squares[i].style.display = "none";
		}
	}
}

function setupMode() {
	//switch "selected" tag between "EASY" and "HARD"
	for (var i = 0; i < modeButtons.length; i++) {
		modeButtons[i].addEventListener("click", function() {
			for (var i = 0; i < modeButtons.length; i++) {
				//classList property is used for representing the value of the DOMTokenList object
				//eg. class name
				modeButtons[i].classList.remove("selected");
			}
			this.classList.add("selected");
			if (this.textContent == "Easy") {
				//textContent is the text showing out, not the class name or id
				//"==" includes type conversion (eg. 3 == "3" is true)
				//"===" doesn's include type conversion (eg. 3 === "3" is false)
				numSquares = 3;
			}
			else {
				numSquares = 6;
			}
			reset();
		});
	}
}

resetButton.addEventListener("click", function() {
	reset();
});
