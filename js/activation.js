'use strict';

(function () {
  const userMap = window.pin.userMap;
  const PIN_SIZE = window.pin.PIN_SIZE;
  const load = window.backend.load;

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

  const onPinEnterPress = function (evt) {
    window.main.onElemEnterPress(evt, activatePage);
  };

  const onPinMouseClick = function (evt) {
    window.main.onElemMouseClick(evt, activatePage);
  };

  mapPinMain.addEventListener(`keydown`, onPinEnterPress);

  mapPinMain.addEventListener(`mousedown`, onPinMouseClick);

  const showFormWithLoad = function (data) {
    if (data.length) {
      removeDisabledFromCollection(mapFiltres);
      mapFiltresForm.classList.remove(`hidden`);
    }
  };

  const errorHandler = function (errorMessage) {
    const node = document.createElement(`div`);
    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red; color: white`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `30px`;

    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  const activatePage = function () {
    userMap.classList.remove(`map--faded`);
    adForm.classList.remove(`ad-form--disabled`);
    removeDisabledFromCollection(adFormFieldsets);
    adFormAddress.value = (TipCoordinates.x + PIN_SIZE.WIDTH / 2) + `, ` + (TipCoordinates.y + PIN_SIZE.HEIGHT / 2);
    load(function (orders) {
      window.pin.successHandler(orders);
      showFormWithLoad(orders);
    }, errorHandler);
  };

  window.activation = {
    adForm,
    showFormWithLoad,
    activatePage
  };
})();
