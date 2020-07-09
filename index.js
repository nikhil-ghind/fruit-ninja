const startButton = document.querySelector("#startButton");
const pauseButton = document.querySelector("#pauseButton");
startButton.addEventListener("click", () => {
  let intervalid = setInterval(() => {
    let img = document.createElement("img");
    img.setAttribute("src", selectRandomImage());
    img.classList.add("fruit");

    img.addEventListener("mouseleave", (e) => {
      e.target.remove();
    });
    document.body.appendChild(img);
  }, 1000);
  pauseButton.addEventListener("click", () => {
    clearTimeout(intervalid);
  });
});
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
