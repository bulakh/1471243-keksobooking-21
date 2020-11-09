'use strict';

const enterPressHandler = window.util.enterPressHandler;
const mouseClickHandler = window.util.mouseClickHandler;

const load = window.backend.load;
const save = window.backend.save;

const mapFilter = window.filter.mapFilter;

const removeCards = window.card.removeCards;

const userMap = window.pin.userMap;
const removePins = window.pin.removePins;
const activatePins = window.pin.activatePins;
const deactivatePins = window.pin.deactivatePins;

const showErrorSend = window.modals.showErrorSend;
const showSuccessSend = window.modals.showSuccessSend;
const errorLoadHandler = window.modals.errorLoadHandler;


const resetPreviewInputs = window.upload.resetPreviewInputs;
const activatePreviewInputs = window.upload.activatePreviewInputs;
const adForm = window.upload.adForm;

const mainPin = window.move.mainPin;
const HALF_PIN_SIZE = window.move.HALF_PIN_SIZE;
const setAddress = window.move.setAddress;
const activateMovePin = window.move.activateMovePin;
const deactivateMovePin = window.move.deactivateMovePin;

const activateValidation = window.form.activateValidation;
const deactivateValidation = window.form.deactivateValidation;

const adFormFieldsets = adForm.querySelectorAll(`fieldset`);
const mapFiltresForm = document.querySelector(`.map__filters`);
const mapFiltres = mapFiltresForm.querySelectorAll(`.map__filter`);
const resetButton = adForm.querySelector(`.ad-form__reset`);

const START_COORDINATES = {
  X: 570,
  Y: 375
};

const TipCoordinates = {
  X: parseInt(mainPin.style.left, 10),
  Y: parseInt(mainPin.style.top, 10)
};

const DefaultCoordinates = {
  X: TipCoordinates.X + HALF_PIN_SIZE.X,
  Y: TipCoordinates.Y + HALF_PIN_SIZE.Y
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

const pinEnterPressActivatePageHandler = function (evt) {
  enterPressHandler(evt, activatePage);
};

const pinMouseClickActivatePageHandler = function (evt) {
  mouseClickHandler(evt, activatePage);
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
  removeCards();
  disableAllElements();
  mapFilter.reset();
  mainPin.addEventListener(`keydown`, pinEnterPressActivatePageHandler);
  mainPin.addEventListener(`mousedown`, pinMouseClickActivatePageHandler);
  adForm.removeEventListener(`submit`, submitHandler);
  deactivatePins();
  deactivateMovePin();
  deactivateValidation();
  resetPreviewInputs();
  resetButton.removeEventListener(`click`, deactivatePage);
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
  mainPin.removeEventListener(`keydown`, pinEnterPressActivatePageHandler);
  mainPin.removeEventListener(`mousedown`, pinMouseClickActivatePageHandler);
  adForm.addEventListener(`submit`, submitHandler);
  activatePins();
  activatePreviewInputs();
  activateMovePin();
  activateValidation();
  resetButton.addEventListener(`click`, deactivatePage);
};
