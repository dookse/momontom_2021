const clockContainer = document.querySelector('.js-clock');
const clockTitle = clockContainer.querySelector('h1');

const getTime = () => {
  const date = new Date();
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const seconds = date.getSeconds();
  clockTitle.innerText = `${lpadZero(hours)}:${lpadZero(minutes)}:${lpadZero(
      seconds)}`;
};

const lpadZero = t => t < 10 ? `0${t}` : t;

const clock = {
  init: () => {
    getTime();
    setInterval(getTime, 1000);
  }
}

clock.init();
