const body = document.querySelector('body');
const IMAGE_NUMBER = 4;

const genRandomNumber = () => Math.floor(Math.random() * IMAGE_NUMBER) + 1;

const bg = {
  init: () => {
    const number = genRandomNumber();
    const image = new Image();
    image.classList.add('bgImage');
    image.src = `images/${number}.jpg`;

    body.prepend(image);
  }
}

bg.init();
