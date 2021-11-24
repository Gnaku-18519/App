var quiz = [];
var word; //key word to guess
var guesses = []; //record the user's guesses
var keyboard = document.getElementsByClassName("char");
const totalLives = 10;
var countLives = totalLives;
var lives = document.getElementById("lives");
var space; //count the number of spaces in the key word
var restLetters; //count the number of letters remained to guess

class Question {
    constructor(Key, Category, Hint) {
        this.Key = Key;
        this.Category = Category;
        this.Hint = Hint;
    }
}

main();

function main() {
    buildQuiz();
    chooseQuestion();
}

function buildQuiz() {
    quiz.push(new Question("batman", "comic character", "Gotham"));
    quiz.push(new Question("nightwing", "comic character", "Bludhaven"));
    quiz.push(new Question("red hood", "comic character", "The Outlaws"));
    quiz.push(new Question("red robin", "comic character", "Teen Titans"));
    quiz.push(new Question("robin", "comic character", "five kids"));
    quiz.push(new Question("green lantern", "comic character", "OA"));
    quiz.push(new Question("flash", "comic character", "speed"));
    quiz.push(new Question("firestorm", "comic character", "nuclear"));
    quiz.push(new Question("real madrid", "La Liga", "white"));
    quiz.push(new Question("barcelona", "La Liga", "Camp Nou"));
    quiz.push(new Question("atletico de madrid", "La Liga", "Torres"));
    quiz.push(new Question("liverpool", "Premier League", "Gerrard"));
    quiz.push(new Question("chelsea", "Premier League", "Abramovich"));
    quiz.push(new Question("manchester city", "Premier League", "light blue"));
    quiz.push(new Question("manchester united", "Premier League", "C Ronaldo"));
    quiz.push(new Question("tottenham hotspur", "Premier League", "Lilywhites"));
    quiz.push(new Question("arsenal", "Premier League", "4"));
    quiz.push(new Question("juventus", "Serie A", "zebra"));
    quiz.push(new Question("inter milan", "Serie A", "international"));
    quiz.push(new Question("ac milan", "Serie A", "red and black"));
    quiz.push(new Question("paris saint german", "Ligue A", "paris"));
    quiz.push(new Question("monaco", "Ligue A", "Not in France"));
    quiz.push(new Question("bayern munich", "Bundesliga", "Neuer"));
    quiz.push(new Question("dortmund", "Bundesliga", "Reus"));
    quiz.push(new Question("max verstappen", "F1", "Netherlands"));
    quiz.push(new Question("lewis hamilton", "F1", "100 poles"));
    quiz.push(new Question("carlos sainz", "F1", "Spanish"));
    quiz.push(new Question("daniel ricciardo", "F1", "Honey Badger"));
    quiz.push(new Question("sebastian vettel", "F1", "German"))
}

function chooseQuestion() {
    let index = Math.floor(Math.random() * quiz.length);
    let tempQuestion = quiz[index];
    word = tempQuestion.Key;
    createGuess();
    showCategory(tempQuestion.Category);
    showLives();
    showClue(tempQuestion.Hint);
}

function createGuess() {
    space = 0;
    wordHolder = document.getElementById('hold');
    correct = document.createElement('ul');

    for (var i = 0; i < word.length; i++) {
        correct.setAttribute('id', 'currWord');
        guess = document.createElement('li');
        guess.setAttribute('class', 'guess');
        if (word[i] === " ") {
            guess.innerHTML = " ";
            space++;
        }
        else {
            guess.innerHTML = "_";
        }

        guesses.push(guess);
        wordHolder.appendChild(correct);
        correct.appendChild(guess);
    }
    restLetters = word.length - space;
}

function showLives() {
    if (countLives >= 1) {
        if (restLetters === 0) {
            lives.innerHTML = "Congratulations! You Win!";
        }
        else {
            lives.innerHTML = "You have " + countLives + " lives left.";
        }
    }
    else {
        lives.innerHTML = "Ah oh. Let's take another shot.";
    }
}

function showCategory(category) {
    document.getElementById("showCategory").innerHTML = category;
}

function showClue(clue) {
    document.getElementById("clue").innerHTML = clue;
}

function charClicked(id) {
    let flag = false;
    document.getElementById(id).setAttribute('class', 'char chosen');
    for (let i = 0; i < word.length; i++) {
        if (word[i] == id) {
            guesses[i].innerHTML = word[i];
            restLetters--;
            flag = true;
        }
    }
    if (flag === false) {
        countLives--;
    }
    showLives();
}

document.getElementById("playAgain").onclick = function () {
    correct.parentNode.removeChild(correct);
    guesses = [];
    for (let i = 0; i < keyboard.length; i++) {
        keyboard[i].setAttribute('class', 'char');
    }
    countLives = totalLives;
    chooseQuestion();
}
