
const buttonStart = document.getElementById("startBtn")
const buttonStop = document.getElementById("stopBtn")
const backGround = document.querySelector("body")
let timerId = null;

function changeBackgroundColor() {
    const color = getRandomHexColor();
    backGround.style.backgroundColor = color;

}

buttonStart.addEventListener("click" , (e) =>{
    timerId = setInterval(changeBackgroundColor, 1000);
});

buttonStop.addEventListener("click", () => {
  clearInterval(timerId);
});

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }