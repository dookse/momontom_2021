const form = document.querySelector('.js-form');
const input = form.querySelector('input');
const greeting = document.querySelector('.js-greetings');

const USER_LS = 'currentUser';
const SHOWING_CN = 'showing';

const main = {
  init: () => {
    main.loadName();
  },
  handleSubmit: event => {
    event.preventDefault();
    const currentValue = input.value;
    main.saveName(currentValue);
    main.loadName();
  },
  saveName: text => localStorage.setItem(USER_LS, text),
  askForName: () => {
    form.classList.add(SHOWING_CN);
    form.addEventListener('submit', main.handleSubmit);
  },
  paintGreeting: text => {
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerHTML = `Hello ${text}`;
  },
  loadName: () => {
    const currentUser = localStorage.getItem(USER_LS);
    if (currentUser === null) {
      main.askForName();
    } else {
      main.paintGreeting(currentUser);
    }
  }
}

main.init();
