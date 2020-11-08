'use strict';

const PIN_SIZE = window.pin.PIN_SIZE;
const mainPin = window.map.mainPin;
const setAddress = window.map.setAddress;
const HALF_PIN_SIZE = window.map.HALF_PIN_SIZE;

const LIMIT = {
  TOP: 130,
  BOTTOM: 630,
  LEFT: -32,
  RIGHT: 1168
};

const setActualAddress = function () {
  let changedX = parseInt(mainPin.style.left, 10) + PIN_SIZE.WIDTH / 2;
  let changedY = parseInt(mainPin.style.top, 10) + PIN_SIZE.HEIGHT / 2;

  setAddress(changedX, changedY);
};

const onMainPinMoveIt = function (evt) {
  evt.preventDefault();
  let startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  let dragged = false;

  const onMouseMove = function (moveEvt) {
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

  const onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener(`mousemove`, onMouseMove);
    document.removeEventListener(`mouseup`, onMouseUp);

    if (dragged) {
      const onClickPreventDefault = function (clickEvt) {
        clickEvt.preventDefault();
        mainPin.removeEventListener(`click`, onClickPreventDefault);
      };
      mainPin.addEventListener(`click`, onClickPreventDefault);
    }
  };

  document.addEventListener(`mousemove`, onMouseMove);
  document.addEventListener(`mouseup`, onMouseUp);
};

mainPin.addEventListener(`mousedown`, onMainPinMoveIt);
