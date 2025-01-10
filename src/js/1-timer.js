import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const timer = {
  deadline: null,
  intervalId: null,
  elements: {
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
    startButton: document.querySelector('[data-start]'),
    datePicker: document.querySelector('#datetime-picker'),
  },

  init() {
    this.elements.startButton.disabled = true;
    this.elements.startButton.addEventListener('click', this.start.bind(this));

    flatpickr(this.elements.datePicker, {
      enableTime: true,
      time_24hr: true,
      defaultDate: new Date(),
      minuteIncrement: 1,
      onClose: this.onDateSelect.bind(this),
    });
  },

  onDateSelect(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate <= new Date()) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      this.elements.startButton.disabled = true;
    } else {
      this.deadline = selectedDate;
      this.elements.startButton.disabled = false;
    }
  },

  start() {
    this.elements.startButton.disabled = true;
    this.elements.datePicker.disabled = true;

    this.intervalId = setInterval(() => {
      const diff = this.deadline - Date.now();

      if (diff <= 0) {
        this.stop();
        iziToast.success({ title: 'Success', message: 'Countdown finished!' });
        return;
      }

      const timeComponents = this.getTimeComponents(diff);
      this.updateUI(timeComponents);
    }, 1000);
  },

  stop() {
    clearInterval(this.intervalId);
    this.intervalId = null;

    this.elements.datePicker.disabled = false;
    this.elements.startButton.disabled = true;
  },

  getTimeComponents(diff) {
    const days = Math.floor(diff / 1000 / 60 / 60 / 24);
    const hours = Math.floor((diff / 1000 / 60 / 60) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return { days, hours, minutes, seconds };
  },

  updateUI({ days, hours, minutes, seconds }) {
    this.elements.days.textContent = this.pad(days);
    this.elements.hours.textContent = this.pad(hours);
    this.elements.minutes.textContent = this.pad(minutes);
    this.elements.seconds.textContent = this.pad(seconds);
  },

  pad(value) {
    return String(value).padStart(2, '0');
  },
};

timer.init();
