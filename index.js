const startButton = document.querySelector("#startButton");
const pauseButton = document.querySelector("#pauseButton");
const score = document.querySelector("#score");
const lives = document.querySelector("#lives");
// Change this to increase difficulty
const numberOfNewImagesPerSecond = 1;
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

startButton.addEventListener("click", () => {
  // Create image after every 1000ms.
  let intervalid = setInterval(() => {
    let img = document.createElement("img");
    img.setAttribute("src", selectRandomImage());
    img.classList.add("fruit");
    document.body.appendChild(img);
    //To create falling animation for fruits.
    startMoving(img);
  }, numberOfNewImagesPerSecond * 1000);
  // Event listener for pause in every created image.
  pauseButton.addEventListener("click", () => {
    clearTimeout(intervalid);
  });
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
    score.innerHTML = parseInt(score.innerHTML) + 1;
    e.target.remove();
  });
  let finalTop =
    parseInt(getComputedStyle(document.body).height) -
    parseInt(getComputedStyle(img).height) +
    "px";
  let finalLeft = Math.floor(Math.random() * 61) + 20 + "vw";
  let rate = Math.floor(Math.random() * 7) + 9 + "s";
  img.style.transition = "all " + rate + " linear";
  img.style.top = finalTop;
  img.style.left = finalLeft;
  img.addEventListener("transitionend", () => {
    if (lives.innerHTML === "0") {
      console.log("game over");
    } else {
      lives.innerHTML = parseInt(lives.innerHTML) - 1;
    }
  });
}
