const PATH_TILES = 40;
let tiles = [];
let playerPos = 0;
let score = 0;
let diceMoves = 0;
let avatarImg = "";
let locked = false;

const winSound = new Audio("assets/sound/win.mp3");
const correctSound = new Audio("assets/sound/correct.mp3");
const wrongSound = new Audio("assets/sound/wrong.mp3");

const path = document.getElementById("path");
const diceResult = document.getElementById("dice-result");
const popup = document.getElementById("popup");
const popupContent = document.getElementById("popup-text");
const popupChoices = document.getElementById("popup-choices");
const startbtn = document.getElementById("start-btn");
const gameInstructions = document.getElementById("game-instructions");
const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const instructionsScreen = document.getElementById("instructions-screen");
const btnInstructions = document.getElementById("btn-instructions");
const btnHome = document.getElementById("btn-home");
const backBtn = document.getElementById("back-btn");
const scorePath = document.getElementById("score");
const stepsPath = document.getElementById("steps");
const popupWin = document.getElementById("popup-win");
const popupContentWin = document.getElementById("popup-txt");
const closePopup = document.getElementById("close-popup");

// Select avatar
document.querySelectorAll(".avatar-option").forEach(option => {
    option.addEventListener("click", () => {
        document.querySelectorAll(".avatar-option").forEach(o => o.classList.remove("selected"));
        option.classList.add("selected");
        avatarImg = option.dataset.avatar;
        startbtn.style.display = 'flex';
    });
});

// Start game
startbtn.addEventListener("click", () => {
    startScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");
    gameInstructions.style.display = 'flex';
    newGame();
});

// Bottom bar buttons
let lastScreen = "start";

btnInstructions.addEventListener("click", () => {
    if (!gameScreen.classList.contains("hidden")) {
        lastScreen = "game";
    } else {
        lastScreen = "start";
    }
    gameScreen.classList.add("hidden");
    instructionsScreen.classList.remove("hidden");
    startScreen.classList.add("hidden");
});

btnHome.addEventListener("click", () => {
    instructionsScreen.classList.add("hidden");
    startScreen.classList.remove("hidden");
    gameScreen.classList.add("hidden");
});

backBtn.addEventListener("click", () => {
    instructionsScreen.classList.add("hidden");
    if (lastScreen === "game") {
        gameScreen.classList.remove("hidden");
        startScreen.classList.add("hidden");
    } else {
        startScreen.classList.remove("hidden");
        gameScreen.classList.add("hidden");
    }
});

// Dice 
document.getElementById("roll-btn").addEventListener("click", () => {
    if (locked) return;
    diceMoves = Math.floor(Math.random() * 6) + 1;
    diceResult.innerText = "Dice: " + diceMoves;
});

// Keyboard movement
document.addEventListener("keydown", e => {
    if (e.key === "ArrowRight") {
        movePlayer();
    }
});

// New game
function newGame() {
    playerPos = 0;
    diceMoves = 0;
    tiles = [];
    locked = false;
    path.innerHTML = "";
    scorePath.innerText = score;

    for (let i = 0; i < PATH_TILES; i++) {
        const tile = document.createElement("li");
        tile.dataset.id = i;
        if (i > 0 && i < PATH_TILES - 1) {
            const rnd = Math.random();
            if (rnd < 0.2) {
                tile.dataset.type = "bonus";
                tile.classList.add("bonus");
            }
            else if (rnd > 0.8) {
                tile.dataset.type = "malus";
                tile.classList.add("malus");
            }
            else {
                tile.dataset.type = "normal";
            }
        }
        if (i === 0) {
            tile.classList.add("start");
            tile.innerText = "START";
        }
        if (i === PATH_TILES - 1) {
            tile.classList.add("end");
            tile.innerText = "END";
        }
        path.appendChild(tile);
        tiles.push(tile);
    }

    updateVisualPlayer(playerPos, 'normal');
}

// Move avatar
function movePlayer() {
    if (diceMoves <= 0 || locked) return;
    playerPos += 1;
    diceMoves--;
    if (playerPos >= PATH_TILES - 1) {
        playerPos = PATH_TILES - 1;
    }
    const tile = tiles[playerPos];
    const type = tile.dataset.type;
    if (playerPos >= PATH_TILES - 1) {
        playerPos = PATH_TILES - 1;
        updateVisualPlayer(playerPos, type);
        winSound.play();
        score++;
        scorePath.innerText = score;
        showPopup("You win!");
        diceMoves = 0;
        return;
    }
    updateVisualPlayer(playerPos, type);
}

// Update position avatar with bonus and malus 
function updateVisualPlayer(newPlayerPos, type) {
    tiles.forEach(t => {
        t.classList.remove("player");
    });
    playerPos = newPlayerPos;
    const current = tiles[playerPos];
    current.classList.add("player");
    current.style.setProperty("--avatar", `url(${avatarImg})`);
    stepsPath.innerText = PATH_TILES - 1 - playerPos;
    if (type === "jump") return;
    if (diceMoves === 0) {
        if (type === "malus") {
            locked = true;
            let newPlayerPos = playerPos - 1;
            setTimeout(() => {
                updateVisualPlayer(newPlayerPos, 'jump');
                locked = false;
            }, 2000);
        }
        else if (type === "bonus") {
            fetchTrivia();
            return;
        }
    }
}

// API trivia and popup
function fetchTrivia() {
    popupContent.innerText = "Loading question...";
    popupChoices.innerHTML = "";
    popup.classList.remove("hidden");
    locked = true;

    fetch("https://the-trivia-api.com/v2/questions?limit=1")
        .then(res => res.json())
        .then(data => {
            const q = data[0];
            popupContent.innerText = q.question.text;
            const answers = q.incorrectAnswers.concat(q.correctAnswer);
            answers.sort(() => Math.random() - 0.5);
            const handleAnswer = (answer, correctAnswer) => {
                let message = "";
                let isCorrect = (answer === correctAnswer);
                document.querySelectorAll("#popup-choices button").forEach(btn => btn.disabled = true);
                if (isCorrect) {
                    correctSound.play();
                    message = "Correct! You move forward one step.";
                    playerPos += 1;
                    if (playerPos >= PATH_TILES - 1) {
                        playerPos = PATH_TILES - 1;
                        updateVisualPlayer(playerPos, 'normal');
                        winSound.play();
                        score++;
                        scorePath.innerText = score;
                        showPopup("You win!");
                        diceMoves = 0;
                        locked = false;
                        return;
                    }
                } else {
                    wrongSound.play();
                    message = `Wrong! The correct answer was: ${correctAnswer}`;
                }
                popupContent.innerText = message;
                popupChoices.innerHTML = ""; 
                setTimeout(() => {
                    updateVisualPlayer(playerPos, 'normal');
                    popup.classList.add("hidden");
                    locked = false;
                }, 1500);
            };
            answers.forEach(answer => {
                const btn = document.createElement("button");
                btn.textContent = answer;
                btn.addEventListener("click", () => {
                    handleAnswer(answer, q.correctAnswer);
                });
                popupChoices.appendChild(btn);
            });
        })
        .catch(err => {
            popupContent.innerText = "Could not load trivia.";
            setTimeout(() => {
                popup.classList.add("hidden");
                locked = false;
            }, 1000);
            console.error(err);
        });
}

// Popup win
function showPopup(msg) {
    popupContentWin.innerText = msg;
    popupWin.classList.remove("hidden");
}
closePopup.addEventListener("click", () => {
    popupWin.classList.add("hidden");
    newGame();
});