const buttonColors = ["green", "red", "yellow", "blue"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;
let levelMax = 5;

// Fonction pour démarrer le jeu
document.addEventListener("keypress", function() {
  if (!started) {
    document.getElementById("level-title").textContent = "Niveau " + level;
    nextSequence();
    started = true;
  }
});

// Gestion des clics de l'utilisateur
const colors = document.querySelectorAll(".color");
colors.forEach((color) => {
  color.addEventListener("click", function() {
    const userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);

    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
  });
});

// Fonction pour générer la séquence suivante
function nextSequence() {
  userClickedPattern = [];
  console.log(userClickedPattern)
  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  document.getElementById(randomChosenColor).classList.add("pressed");
  setTimeout(() => {
    document.getElementById(randomChosenColor).classList.remove("pressed");
  }, 500);

  if(level === levelMax){
    document.getElementById("simon").classList.add("invisible");
    document.getElementById("level-title").classList.add("invisible");
    document.getElementById("enorme").classList.remove("invisible");
    
  }
  level++;
  document.getElementById("level-title").textContent = "Niveau " + level;
}

// Vérification de la réponse de l'utilisateur
function checkAnswer(currentLevel) {
    console.log(gamePattern[currentLevel], userClickedPattern[currentLevel])
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    document.body.classList.add("game-over");
    document.getElementById("level-title").textContent = "Game Over ! Retenez les couleurs depuis le début.";
    setTimeout(() => {
      document.body.classList.remove("game-over");
    }, 200);

    startOver();
  }
}

// Redémarrer le jeu
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

// Animation lors d'un clic
function animatePress(currentColor) {
  document.getElementById(currentColor).classList.add("pressed");
  setTimeout(() => {
    document.getElementById(currentColor).classList.remove("pressed");
  }, 100);
}
