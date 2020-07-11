const startButton = document.querySelector("#startButton");
const pauseButton = document.querySelector("#pauseButton");
const score = document.querySelector("#score");
const lives = document.querySelector("#lives");
const gameOver = document.querySelector("#gameOver");
const fruitsPerSecond = document.querySelector("#fruitsPerSecond");
const playAgain = document.querySelector("#playAgain");
const slicefruitAudio = document.querySelector("#slicefruitAudio");
const scoreminusAudio = document.querySelector("#scoreminusAudio");
const gameoverAudio = document.querySelector("#gameoverAudio");

var intervalId;

function selectRandomImage() {
  const choices = [
    "apple",
    "bananas",
    "cherries",
    "grapes",
    "mango",
    "orange",
    "peach",
    "pear",
    "watermelon",
  ];
  let selectedFruit = choices[Math.floor(Math.random() * choices.length)];
  return `./images/${selectedFruit}.png`;
}
function pauseButtonClick() {
  pauseButton.click();
}
fruitsPerSecond.addEventListener("change", () => {
  if (
    parseInt(fruitsPerSecond.value) > 9 ||
    parseInt(fruitsPerSecond.value) < 0 ||
    isNaN(parseInt(fruitsPerSecond.value))
  ) {
    fruitsPerSecond.value = 2;
  }
});
startButton.addEventListener("click", () => {
  // Create image after every 1000ms.
  intervalId = setInterval(() => {
    let img = document.createElement("img");
    img.setAttribute("src", selectRandomImage());
    let randomWidth = Math.floor(Math.random() * 4) + 4 + "%";
    img.setAttribute("width", randomWidth);
    img.classList.add("fruit");
    document.body.appendChild(img);
    //To create falling animation for fruits.
    startMoving(img);
  }, 1000 / parseInt(fruitsPerSecond.value));
  startButton.classList.add("hidden");
  pauseButton.classList.remove("hidden");
  // Event listener for pause in every created image.
  pauseButton.addEventListener("click", () => {
    pauseButton.classList.add("hidden");
    startButton.classList.remove("hidden");
    document.querySelectorAll("img").forEach((img) => {
      img.remove();
    });
    clearTimeout(intervalId);
    window.removeEventListener("resize", pauseButtonClick, false);
    fruitsPerSecond.removeEventListener("change", pauseButtonClick);
  });
  window.addEventListener("resize", pauseButtonClick, false);
  fruitsPerSecond.addEventListener("change", pauseButtonClick);
});

function startMoving(img) {
  img.style.top = Math.floor(Math.random() * 51) + "vh";
  let initialTop = img.style.top;
  if (initialTop === "0vh") {
    img.style.left = Math.floor(Math.random() * 101) + "vw";
  } else {
    img.style.left =
      [
        0,
        parseInt(getComputedStyle(document.body).width) -
          parseInt(getComputedStyle(img).width),
      ][Math.floor(Math.random() * 2)] + "px";
  }
  let initialLeft = img.style.left;
  img.addEventListener("mouseleave", (e) => {
    slicefruitAudio.play();
    score.innerHTML = parseInt(score.innerHTML) + 1;
    e.target.remove();
  });
  let finalTop =
    parseInt(getComputedStyle(document.body).height) -
    parseInt(getComputedStyle(img).height) +
    "px";
  let finalLeft = Math.floor(Math.random() * 61) + 20 + "vw";
  let rate = Math.floor(Math.random() * 6) + 3 + "s";
  img.style.transition = "all " + rate + " linear";
  img.style.top = finalTop;
  img.style.left = finalLeft;
  img.addEventListener("transitionend", () => {
    if (lives.innerHTML === "1") {
      window.removeEventListener("resize", pauseButtonClick, false);
      fruitsPerSecond.removeEventListener("change", pauseButtonClick);
      gameoverAudio.play();
      lives.classList.add("hidden");
      pauseButton.classList.add("hidden");
      document.querySelectorAll("img").forEach((img) => {
        img.remove();
      });
      clearTimeout(intervalId);
      gameOver.classList.remove("hidden");
    } else if (parseInt(lives.innerHTML) > 0) {
      scoreminusAudio.play();
      lives.innerHTML = (parseInt(lives.innerHTML * 2) - 1) / 2;
      img.remove();
    }
  });
}
playAgain.addEventListener("click", () => {
  gameOver.classList.add("hidden");
  score.innerHTML = "0";
  lives.innerHTML = "3";
  startButton.click();
  lives.classList.remove("hidden");
  pauseButton.classList.remove("hidden");
});
