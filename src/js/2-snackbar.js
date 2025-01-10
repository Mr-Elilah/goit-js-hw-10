import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

document.querySelector('.form').addEventListener('submit', event => {
  event.preventDefault();

  const form = event.currentTarget;
  const delayInput = form.elements.delay.value;
  const state = form.elements.state.value;
  const delay = Number(delayInput);

  if (isNaN(delay) || delay < 0) {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a valid delay in milliseconds.',
    });
    return;
  }

  createPromise(delay, state)
    .then(message => {
      iziToast.success({
        title: 'Success',
        message,
        position: 'topRight',
      });
    })
    .catch(message => {
      iziToast.error({
        title: 'Error',
        message,
        position: 'topRight',
      });
    });
});

function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(`✅ Fulfilled promise in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise in ${delay}ms`);
      }
    }, delay);
  });
}
