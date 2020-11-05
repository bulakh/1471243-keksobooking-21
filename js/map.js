'use strict';

(function () {
  const userMap = window.pin.userMap;
  const PIN_SIZE = window.pin.PIN_SIZE;
  const load = window.backend.load;
  const save = window.backend.save;
  const removePins = window.pin.removePins;
  const showErrorSend = window.modals.showErrorSend;
  const errorLoadHandler = window.modals.errorLoadHandler;
  const showSuccessSend = window.modals.showSuccessSend;
  const mainPin = document.querySelector(`.map__pin--main`);

  const START_COORDINATES = {
    X: 570,
    Y: 375
  };

  const TipCoordinates = {
    X: parseInt(mainPin.style.left, 10),
    Y: parseInt(mainPin.style.top, 10)
  };

  const HALF_PIN_SIZE = {
    X: PIN_SIZE.WIDTH / 2,
    Y: PIN_SIZE.HEIGHT / 2
  };

  const DefaultCoordinates = {
    X: TipCoordinates.X + HALF_PIN_SIZE.X,
    Y: TipCoordinates.Y + HALF_PIN_SIZE.Y
  };

  const adForm = document.querySelector(`.ad-form`);
  const adFormFieldsets = adForm.querySelectorAll(`fieldset`);
  const mapFiltresForm = document.querySelector(`.map__filters`);
  const mapFiltres = mapFiltresForm.querySelectorAll(`.map__filter`);
  const adFormAddress = adForm.querySelector(`#address`);

  const setAddress = function (x, y) {
    adFormAddress.value = x + `, ` + y;
  };

  const setStartCoordsMainPin = function () {
    mainPin.style.left = START_COORDINATES.X + `px`;
    mainPin.style.top = START_COORDINATES.Y + `px`;
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

  const removeDisabledFromCollection = function (elements) {
    for (let elem of elements) {
      elem.removeAttribute(`disabled`, `disabled`);
    }
  };

  const onPinEnterPress = function (evt) {
    window.util.onElemEnterPress(evt, activatePage);
  };

  const onPinMouseClick = function (evt) {
    window.util.onElemMouseClick(evt, activatePage);
  };

  const showFormWithLoad = function (data) {
    if (data.length) {
      removeDisabledFromCollection(mapFiltres);
      mapFiltresForm.classList.remove(`hidden`);
    }
  };

  const successSendHandler = function () {
    showSuccessSend();
    deactivatePage();
  };

  const errorSendHandler = function () {
    showErrorSend();
    deactivatePage();
  };

  const submitHandler = function (evt) {
    save(new FormData(adForm), successSendHandler, errorSendHandler);
    evt.preventDefault();
  };

  const deactivatePage = function () {
    userMap.classList.add(`map--faded`);
    adForm.classList.add(`ad-form--disabled`);
    setStartCoordsMainPin();
    removePins();
    disableAllElements();
    adForm.reset();
    mainPin.addEventListener(`keydown`, onPinEnterPress);
    mainPin.addEventListener(`mousedown`, onPinMouseClick);
    adForm.removeEventListener(`submit`, submitHandler);
  };

  deactivatePage();

  const activatePage = function () {
    userMap.classList.remove(`map--faded`);
    adForm.classList.remove(`ad-form--disabled`);
    removeDisabledFromCollection(adFormFieldsets);
    setAddress(DefaultCoordinates.X, DefaultCoordinates.Y);
    load(function (orders) {
      window.pin.successLoadHandler(orders);
      showFormWithLoad(orders);
    }, errorLoadHandler);
    mainPin.removeEventListener(`keydown`, onPinEnterPress);
    mainPin.removeEventListener(`mousedown`, onPinMouseClick);
    adForm.addEventListener(`submit`, submitHandler);
  };

  window.map = {
    adForm,
    mainPin,
    HALF_PIN_SIZE,
    setAddress
  };
})();
