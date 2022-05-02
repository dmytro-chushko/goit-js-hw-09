import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

let timerId = null;
const inputDate = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0].getTime();
    const currentDate = new Date().getTime();
    if (selectedDate >= currentDate) {
      startBtn.disabled = false;
    } else {
      Notify.failure('Please choose a date in the future');
    }
  }
};

function addLeadingZerro(values) {
  for (const key in values) {
    values[key] = String(values[key]).padStart(2, '0');
  };
  return values;
}

function updateTimer(timerId, selectedDate) {
  const currentDate = new Date().getTime();
  const deltaTime = selectedDate - currentDate;
  if (deltaTime > 0) {
    const { days, hours, minutes, seconds } =addLeadingZerro(convertMs(deltaTime));
      daysEl.textContent = days;
      hoursEl.textContent = hours;
      minutesEl.textContent = minutes;
      secondsEl.textContent = seconds;
  } else {
    clearInterval(timerId);
  }
}

function onStart() {
  const selectedDate = new Date(inputDate.value).getTime();
  timerId = setInterval(updateTimer, 1000, timerId, selectedDate);
  startBtn.disabled = true;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

flatpickr('#datetime-picker', options);
startBtn.addEventListener('click', onStart);