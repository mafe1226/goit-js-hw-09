import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const dateTimePicker = document.getElementById("datetime-picker");
const startButton = document.getElementById("startButton");
const timerElements = {
  days: document.querySelector("[data-days]"),
  hours: document.querySelector("[data-hours]"),
  minutes: document.querySelector("[data-minutes]"),
  seconds: document.querySelector("[data-seconds]"),
};
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate <= new Date()) {
      window.alert("Please choose a date in the future");
    } else {
      startButton.disabled = false;
    }
  },
};

flatpickr(dateTimePicker, options);

let countdownInterval;

startButton.addEventListener("click", () => {
  const selectedDate = flatpickr.parseDate(dateTimePicker.value, "Y-m-d H:i");

  if (selectedDate) {
    const targetTime = selectedDate.getTime();
    startButton.disabled = true;
    countdownInterval = setInterval(updateCountdown, 1000, targetTime);
  }
});

function updateCountdown(targetTime) {
  const currentTime = new Date().getTime();
  const timeDifference = targetTime - currentTime;

  if (timeDifference <= 0) {
    clearInterval(countdownInterval);
    // Countdown has reached 00:00:00:00
    timerElements.days.innerText = "00";
    timerElements.hours.innerText = "00";
    timerElements.minutes.innerText = "00";
    timerElements.seconds.innerText = "00";
    startButton.disabled = false;
  } else {
    const timeRemaining = convertMs(timeDifference);
    updateTimerDisplay(timeRemaining);
  }
}

function updateTimerDisplay(timeRemaining) {
  timerElements.days.innerText = addLeadingZero(timeRemaining.days);
  timerElements.hours.innerText = addLeadingZero(timeRemaining.hours);
  timerElements.minutes.innerText = addLeadingZero(timeRemaining.minutes);
  timerElements.seconds.innerText = addLeadingZero(timeRemaining.seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor((ms % hour) / minute);
  const seconds = Math.floor((ms % minute) / second);

  return { days, hours, minutes, seconds };
}