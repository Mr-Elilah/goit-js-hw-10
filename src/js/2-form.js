const save = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.log(err);
  }
};

const load = key => {
  try {
    const dataFromLS = localStorage.getItem(key);
    return dataFromLS === null ? undefined : JSON.parse(dataFromLS);
  } catch (err) {
    console.log(err);
  }
};

const formData = {
  email: '',
  message: '',
};

const form = document.querySelector('.feedback-form');
const emailInput = form.elements.email;
const messageTextarea = form.elements.message;

const savedData = load('feedback-form-state');
if (savedData) {
  formData.email = savedData.email || '';
  formData.message = savedData.message || '';
  emailInput.value = formData.email;
  messageTextarea.value = formData.message;
}

form.addEventListener('input', event => {
  formData[event.target.name] = event.target.value.trim();
  save('feedback-form-state', formData);
});

form.addEventListener('submit', event => {
  event.preventDefault();

  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }

  console.log('Submitted data:', formData);

  localStorage.removeItem('feedback-form-state');
  formData.email = '';
  formData.message = '';
  form.reset();
});
