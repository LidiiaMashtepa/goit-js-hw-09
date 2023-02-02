const body = document.querySelector("body");
const startBtn = document.querySelector("button[data-start]");
const stopBtn = document.querySelector("button[data-stop]");
let timerId = null;

startBtn.addEventListener("click", () => {
  startBtn.disabled = true;
  let randomColor = getRandomHexColor();
  body.style.background = randomColor;
  timerId = setInterval(() => {
    let randomColor = getRandomHexColor();
    body.style.background = randomColor;
  }, 1000);
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

stopBtn.addEventListener("click", () => {
  clearInterval(timerId);
  startBtn.disabled = false;
});
