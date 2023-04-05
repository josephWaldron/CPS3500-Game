var arrayOfClicks = [];
var interval;
var started = false;
var time = 0;
var words = [
  "🐘",
  "🍩",
  "🛀",
  "🚀",
  "🐙",
  "🎭",
  "🎈",
  "🎸",
  "🐘",
  "🍩",
  "🛀",
  "🚀",
  "🐙",
  "🎭",
  "🎈",
  "🎸",
];

var ready = true;
var numCompleted = 0;
function shuffle() {
  var currentIndex = words.length,
    temporaryValue,
    randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = words[currentIndex];
    words[currentIndex] = words[randomIndex];
    words[randomIndex] = temporaryValue;
  }
  return currentIndex;
}

function wordsSetUp() {
  shuffle();

  var cells = document.querySelectorAll("td");
  for (var i = 0; i < cells.length; i++) {
    var cell = cells[i];
    cell.completed = false;
    cell.clicked = false;
    cell.value = words[i];
    cell.addEventListener("mouseenter", function () {
      if (this.completed == false && this.clicked == false)
        this.style.background = "orange";
    });
    cell.addEventListener("mouseleave", function () {
      if (this.completed == false && this.clicked == false)
        this.style.background = "#fe7968";
    });
    cell.addEventListener("click", function (ready) {
      if (ready == false) return;
      startTimer();
      if (this.clicked == false && this.completed == false) {
        arrayOfClicks.push(this);
        release(this);
      }
      if (arrayOfClicks.length == 2) {
        if (arrayOfClicks[0].value == arrayOfClicks[1].value) {
          //if the match found
          complete(arrayOfClicks[0]);
          complete(arrayOfClicks[1]);
          arrayOfClicks = []; //reset
          if (numCompleted == 16) {
            //4x4 matrix has 16 elements, game over
            alert("You won in " + time + " seconds!");
            clearInterval(interval);
          }
        } else {
          //if the match is not found
          ready = false;

          var table = document.querySelector("#matrix");
          table.style.border = "5px dashed orange";

          setTimeout(function () {
            //after a 500ms delay
            hide(arrayOfClicks[0]);
            hide(arrayOfClicks[1]);
            arrayOfClicks = [];

            ready = true;
            var table = document.querySelector("#matrix");
            table.style.border = "5px solid black ";
          }, 300);
        }
      }
    });
  }
}

function release(cell) {
  cell.style.backgroundColor = "red";
  cell.innerHTML = cell.value;
  cell.clicked = true;
}

function startTimer() {
  if (started == false) {
    interval = setInterval(function () {
      time++;
      var myTime = document.querySelector("#timer");
      myTime.innerHTML = "Time Elapsed: " + time;
    }, 1000);
    started = true;
  }
}

function hide(cell) {
  cell.style.backgroundColor = "#fe7968";
  cell.innerHTML = "";
  cell.clicked = false;
}

function complete(cell) {
  numCompleted++;
  cell.completed = true;
  cell.style.backgroundColor = "green";
}

function start() {
  shuffle();
  wordsSetUp();
  startTimer();
}

const startButton = document.getElementById("start");
startButton.addEventListener("click", function () {
  start();
});

function restart() {
  location.reload();
}
