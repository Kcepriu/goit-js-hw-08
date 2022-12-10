const throttle = require('lodash.throttle');

const KEY_LOCAL_STORAGE = 'feedback-form-state';

const formFeedback = document.querySelector('.feedback-form');
const inputEmail = formFeedback.querySelector('input');
const textareaMessage = formFeedback.querySelector('textarea');

function addEvents() {
  formFeedback.addEventListener('submit', eventSubmitForm);
  document.addEventListener('keydown', throttle(onKeyDown, 500));
}

//Events
function eventSubmitForm(event) {
  event.preventDefault();

  console.log(getDatasForm());

  formFeedback.reset();

  writeToLocalStorage(getDatasForm());
}

function onKeyDown(event) {
  writeToLocalStorage(getDatasForm());
}

// * Local Storage
function writeToLocalStorage(data) {
  localStorage.setItem(KEY_LOCAL_STORAGE, JSON.stringify(data));
}

function readFromLocalStorage() {
  let data = null;
  try {
    data = JSON.parse(localStorage.getItem(KEY_LOCAL_STORAGE));
  } catch {
    data = null;
  }

  return {
    email: data?.email || '',
    message: data?.message || '',
  };
}

function setDataToForm(data) {
  inputEmail.value = data.email;
  textareaMessage.value = data.message;
}

function getDatasForm() {
  return {
    email: inputEmail.value,
    message: textareaMessage.value,
  };
}

function initializeScript() {
  //Прочитати і встановити початкові дані
  setDataToForm(readFromLocalStorage());

  // Підключити слухачі
  addEvents();
}

initializeScript();
