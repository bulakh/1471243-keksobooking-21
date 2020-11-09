'use strict';

const PIN_SIZE = window.pin.PIN_SIZE;

const adForm = window.upload.adForm;

const mainPin = document.querySelector(`.map__pin--main`);
const adFormAddress = adForm.querySelector(`#address`);

const HALF_PIN_SIZE = {
  X: PIN_SIZE.WIDTH / 2,
  Y: PIN_SIZE.HEIGHT / 2
};

const LIMIT = {
  TOP: 130,
  BOTTOM: 630,
  LEFT: -32,
  RIGHT: 1168
};

const setAddress = function (x, y) {
  adFormAddress.value = x + `, ` + y;
};

const setActualAddress = function () {
  let changedX = parseInt(mainPin.style.left, 10) + PIN_SIZE.WIDTH / 2;
  let changedY = parseInt(mainPin.style.top, 10) + PIN_SIZE.HEIGHT / 2;

  setAddress(changedX, changedY);
};

const mainPinMoveItHandler = function (evt) {
  evt.preventDefault();
  let startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  let dragged = false;

  const mouseMoveHandler = function (moveEvt) {
    moveEvt.preventDefault();

    dragged = true;

    const shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    const mainPinPosition = {
      X: mainPin.offsetLeft - shift.x,
      Y: mainPin.offsetTop - shift.y
    };

    if (mainPinPosition.X >= LIMIT.LEFT && mainPinPosition.X <= LIMIT.RIGHT) {
      mainPin.style.left = mainPinPosition.X + `px`;
    }
    if (mainPinPosition.Y >= LIMIT.TOP - HALF_PIN_SIZE.Y && mainPinPosition.Y <= LIMIT.BOTTOM) {
      mainPin.style.top = mainPinPosition.Y + `px`;
    }
    setActualAddress();
  };

  const mouseUpHandler = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener(`mousemove`, mouseMoveHandler);
    document.removeEventListener(`mouseup`, mouseUpHandler);

    if (dragged) {
      const clickPreventDefaultHandler = function (clickEvt) {
        clickEvt.preventDefault();
        mainPin.removeEventListener(`click`, clickPreventDefaultHandler);
      };
      mainPin.addEventListener(`click`, clickPreventDefaultHandler);
    }
  };

  document.addEventListener(`mousemove`, mouseMoveHandler);
  document.addEventListener(`mouseup`, mouseUpHandler);
};

const activateMovePin = function () {
  mainPin.addEventListener(`mousedown`, mainPinMoveItHandler);
};

const deactivateMovePin = function () {
  mainPin.removeEventListener(`mousedown`, mainPinMoveItHandler);
};

window.move = {
  mainPin,
  HALF_PIN_SIZE,
  setAddress,
  activateMovePin,
  deactivateMovePin
};


