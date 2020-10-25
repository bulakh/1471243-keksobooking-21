'use strict';

(function () {
  const userMap = window.pin.userMap;
  const PIN_SIZE = window.pin.PIN_SIZE;

  const START_COORDINATES = {
    X: 648,
    Y: 453
  };

  const adForm = document.querySelector(`.ad-form`);
  const adFormFieldsets = adForm.querySelectorAll(`fieldset`);
  const mapFiltresForm = document.querySelector(`.map__filters`);
  const mapFiltres = mapFiltresForm.querySelectorAll(`.map__filter`);
  const adFormAddress = adForm.querySelector(`#address`);
  const mapPinMain = document.querySelector(`.map__pin--main`);
  const showPins = window.pin.showPins;

  const TipCoordinates = {
    x: parseInt(mapPinMain.style.left, 10),
    y: parseInt(mapPinMain.style.top, 10)
  };

  const disableEachElement = function (elements) {
    for (let elem of elements) {
      elem.setAttribute(`disabled`, `disabled`);
    }
  };

  const disableAllElements = function () {
    disableEachElement(adFormFieldsets);
    disableEachElement(mapFiltres);
  };

  const setStartCoordinates = function () {
    adFormAddress.value = START_COORDINATES.X + `, ` + START_COORDINATES.Y;
  };

  setStartCoordinates();

  disableAllElements();

  const removeDisabledFromCollection = function (elements) {
    for (let elem of elements) {
      elem.removeAttribute(`disabled`, `disabled`);
    }
  };

  const showFormWithLoad = function (orders) {
    if (orders.length) {
      removeDisabledFromCollection(mapFiltres);
      mapFiltresForm.classList.remove(`hidden`);
    }
  };

  const activatePage = function () {
    userMap.classList.remove(`map--faded`);
    adForm.classList.remove(`ad-form--disabled`);
    removeDisabledFromCollection(adFormFieldsets);
    adFormAddress.value = (TipCoordinates.x + PIN_SIZE.WIDTH / 2) + `, ` + (TipCoordinates.y + PIN_SIZE.HEIGHT / 2);
    showPins();
  };

  const onPinEnterPress = function (evt) {
    window.main.onElemEnterPress(evt, activatePage);
  };

  const onPinMouseClick = function (evt) {
    window.main.onElemMouseClick(evt, activatePage);
  };

  mapPinMain.addEventListener(`keydown`, onPinEnterPress);

  mapPinMain.addEventListener(`mousedown`, onPinMouseClick);

  window.activation = {
    adForm,
    showFormWithLoad
  };
})();
