import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix, { Notify } from "notiflix";

const input = document.querySelector("#datetime-picker");
const daysEl = document.querySelector("span[data-days]");
const hoursEl = document.querySelector("span[data-hours]");
const minutesEl = document.querySelector("span[data-minutes]");
const secondsEl = document.querySelector("span[data-seconds]");
const startBtn = document.querySelector("button[data-start]");
console.log(startBtn);
console.log(input);
startBtn.addEventListener("click", onClickBtn);
startBtn.setAttribute("disabled", "true");

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < options.defaultDate) {
      Notify.failure(`Please choose a date in the future`);
    } else {
      options.defaultDate = selectedDates[0];
      startBtn.removeAttribute(`disabled`);
    }
  },
};
flatpickr(input, options);

function onClickBtn() {
  const timerStart = setInterval(timer, 1000);

  function timer() {
    const diff = options.defaultDate - Date.now();
    const days = addLeadingZero(Math.floor(diff / (1000 * 60 * 60 * 24)));
    const hours = addLeadingZero(Math.floor((diff / (1000 * 60 * 60)) % 24));
    const minutes = addLeadingZero(Math.floor((diff / (1000 * 60)) % 60));
    const seconds = addLeadingZero(Math.floor((diff / 1000) % 60));
    daysEl.textContent = days;
    hoursEl.textContent = hours;
    minutesEl.textContent = minutes;
    secondsEl.textContent = seconds;
    startBtn.setAttribute("disabled", "true");
    if (diff < 1000) {
      clearInterval(timerStart);
      startBtn.removeAttribute(`disabled`);
      let str = "\u2665";
      Notiflix.Notify.success("Time to rest a little!" + str);
    }
  }
  function addLeadingZero(value) {
    return String(value).padStart(2, "0");
  }
}
