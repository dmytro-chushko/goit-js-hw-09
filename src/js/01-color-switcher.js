const body = document.body;
let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function setBodyBgc() {
  body.style.backgroundColor = getRandomHexColor();
}

function getNameOfDataAttribute(obj) {
  return Object.keys(obj).toString();
}

function onClickStartBtn() {
  timerId = setInterval(setBodyBgc, 1000);
}

function onClickStopBtn(timerId) {
  clearInterval(timerId);
}

body.addEventListener('click', ({ target, target: { dataset } }) => {
  switch (getNameOfDataAttribute(dataset)) {
    case 'start':
      onClickStartBtn();
      target.disabled = true;
    break;
    case 'stop':
      if (timerId) {
        onClickStopBtn(timerId);
        target.previousElementSibling.disabled = false;
      }
    break;
  }
});
