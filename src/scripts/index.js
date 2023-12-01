const state = {
  view: {
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
    lives: document.querySelector("#lives"),
    modal: document.querySelector("#modal"),
    finalScore: document.querySelector("#final"),
    restartButton: document.querySelector("#restart"),
  },
  values: {
    timerId: setInterval(squareRandomizer, 1000),
    countDownTimerId: setInterval(countDown, 1000),
    hitPosition: 0,
    result: 0,
    currentTime: 60,
    livesCount: 5,
  },
};

function countDown() {
  state.values.currentTime--;
  state.view.timeLeft.textContent = state.values.currentTime;

  if (state.values.currentTime <= 0 || state.values.livesCount <= 0) {
    state.view.finalScore.textContent = state.values.result;
    state.view.modal.style.display = "flex";
    clearInterval(state.values.timerId);
    clearInterval(state.values.countDownTimerId);
  }
}

function playSound(audioName) {
  let audio = new Audio(`./src/sounds/${audioName}`);
  audio.volume = 0.2;
  audio.play();
}

function squareRandomizer() {
  state.view.squares.forEach((square) => {
    square.classList.remove("enemy");
  });

  let randomNumber = Math.floor(Math.random() * 9);
  let randomSquare = state.view.squares[randomNumber];
  randomSquare.classList.add("enemy");
  state.values.hitPosition = randomSquare.id;
}

function addListenerHitbox() {
  state.view.squares.forEach((square) => {
    square.addEventListener("mousedown", () => {
      if (square.id === state.values.hitPosition) {
        state.values.result++;
        state.view.score.textContent = state.values.result;
        state.values.hitPosition = null;
        state.values.gameVelocity -= 20;
        playSound("hit.m4a");
      } else {
        state.values.livesCount--;
        state.view.lives.textContent = "x" + state.values.livesCount;
        playSound("miss.wav");
      }
    });
  });
}

function init() {
  addListenerHitbox();
  state.view.restartButton.onclick = () => window.location.reload();
}

init();
