'use strict';

const HEIGHT_PIN_TIP = 22;

const StartCoordinates = {
  X: 570,
  Y: 375
};

const Limit = {
  TOP: 75,
  BOTTOM: 543,
  LEFT: -32,
  RIGHT: 1168
};

const PinSize = window.pin.Size;

const adForm = window.upload.adForm;

const mainPin = document.querySelector(`.map__pin--main`);
const adFormAddress = adForm.querySelector(`#address`);

const setStartCoordsMainPin = () => {
  mainPin.style.left = StartCoordinates.X + `px`;
  mainPin.style.top = StartCoordinates.Y + `px`;
};

const HalfPinSize = {
  X: Math.floor(PinSize.WIDTH / 2),
  Y: Math.floor(PinSize.HEIGHT / 2)
};

const DeactiveCoordinates = {
  X: StartCoordinates.X + HalfPinSize.X,
  Y: StartCoordinates.Y + HalfPinSize.Y
};

const setDeactivateCoordinates = () => {
  adFormAddress.placeholder = DeactiveCoordinates.X + `, ` + DeactiveCoordinates.Y;
};

const setActualAddress = () => {
  let changedX = parseInt(mainPin.style.left, 10) + HalfPinSize.X;
  let changedY = parseInt(mainPin.style.top, 10) + PinSize.HEIGHT + HEIGHT_PIN_TIP;

  adFormAddress.value = changedX + `, ` + changedY;
};

const mainPinMoveItHandler = (evt) => {
  evt.preventDefault();
  let startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  let dragged = false;

  const mouseMoveHandler = (moveEvt) => {
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

    if (mainPinPosition.X >= Limit.LEFT && mainPinPosition.X <= Limit.RIGHT) {
      mainPin.style.left = mainPinPosition.X + `px`;
    }
    if (mainPinPosition.Y >= Limit.TOP - HalfPinSize.Y && mainPinPosition.Y <= Limit.BOTTOM) {
      mainPin.style.top = mainPinPosition.Y + `px`;
    }
    setActualAddress();
  };

  const mouseUpHandler = (upEvt) => {
    upEvt.preventDefault();

    document.removeEventListener(`mousemove`, mouseMoveHandler);
    document.removeEventListener(`mouseup`, mouseUpHandler);

    if (dragged) {
      const clickPreventDefaultHandler = (clickEvt) => {
        clickEvt.preventDefault();
        mainPin.removeEventListener(`click`, clickPreventDefaultHandler);
      };
      mainPin.addEventListener(`click`, clickPreventDefaultHandler);
    }
  };

  document.addEventListener(`mousemove`, mouseMoveHandler);
  document.addEventListener(`mouseup`, mouseUpHandler);
};

const activatePin = () => {
  mainPin.addEventListener(`mousedown`, mainPinMoveItHandler);
  setActualAddress();
};

const deactivatePin = () => {
  setDeactivateCoordinates();
  mainPin.removeEventListener(`mousedown`, mainPinMoveItHandler);
  setStartCoordsMainPin();
};

window.move = {
  mainPin,
  activatePin,
  deactivatePin
};


