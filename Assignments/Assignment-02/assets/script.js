const PATH_TILES = 40;
let tiles = [];
let playerPos = 0;
let score = 0;
let diceMoves = 0;
let avatarImg = "";

const winSound = new Audio("assets/sound/win.mp3");

const path = document.getElementById("path");
const diceResult = document.getElementById("dice-result");
const scorePath = document.getElementById("score");
const popup = document.getElementById("popup");
const popupContent = document.getElementById("popup-text");
const closePopupBtn = document.getElementById("close-popup");
const stepsPath = document.getElementById("steps");
const startbtn = document.getElementById("start-btn");
const gameInstructions = document.getElementById("game-instructions");


//select avatar
document.querySelectorAll(".avatar-option").forEach(option => {
    option.addEventListener("click", () => {
        document.querySelectorAll(".avatar-option").forEach(o => o.classList.remove("selected"));
        option.classList.add("selected");
        avatarImg = option.dataset.avatar;
        startbtn.style.display = 'flex';
    });
});

//start game
document.getElementById("start-btn").addEventListener("click", () => {
    document.getElementById("start-screen").classList.add("hidden");
    document.getElementById("game").classList.remove("hidden");
    gameInstructions.style.display= 'flex';
    newGame();
});

//path
function newGame() {
    playerPos = 0;
    diceMoves = 0;
    tiles = [];
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
            } else if (rnd > 0.8) {
                tile.dataset.type = "malus";
                tile.classList.add("malus");
            } else {
                tile.dataset.type = "normal";
            }
        }
        if (i === 0) {
            tile.classList.add("start");
            tile.dataset.label = "START";
            tile.innerText = "START";
        }
        if (i === PATH_TILES - 1) {
            tile.classList.add("end");
            tile.dataset.label = "END";
            tile.innerText = "END";
        }
        path.appendChild(tile);
        tiles.push(tile);
    }
    updateVisualPlayer(playerPos, 'normal');
}

//dice
document.getElementById("roll-btn").addEventListener("click", () => {
    diceMoves = Math.floor(Math.random() * 6) + 1;
    diceResult.innerText = "Dice: " + diceMoves;
});

//keyboard movement 
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
        movePlayer();
    }
});

//avatar movement 
function movePlayer() {
    if (diceMoves <= 0) return;
    playerPos += 1;
    diceMoves--;
    if (playerPos > PATH_TILES - 1) playerPos = PATH_TILES - 1;
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

//update position avatar
function updateVisualPlayer(newPlayerPos, type) {
    console.log(type)
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
        if (type === "bonus") {
            let newPlayerPos = playerPos + 1;
            if (newPlayerPos >= PATH_TILES - 1) {
                playerPos = PATH_TILES - 1;
                updateVisualPlayer(playerPos, 'jump');
                winSound.play();
                score++;
                scorePath.innerText = score;
                showPopup("You win!");
                diceMoves = 0;
                return;
            } else {
            setTimeout(updateVisualPlayer, 2000, newPlayerPos, 'jump');}
        }
        else if (type === "malus") {
            let newPlayerPos = playerPos - 1;
            setTimeout(updateVisualPlayer, 2000, newPlayerPos, 'jump');
        }
    }
}

//popup
function showPopup(msg) {
    popupContent.innerText = msg;
    popup.classList.remove("hidden");
}
closePopupBtn.addEventListener("click", () => {
    popup.classList.add("hidden");
    newGame();
});