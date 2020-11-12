'use strict';

const enterPressHandler = window.util.enterPressHandler;
const mouseClickHandler = window.util.mouseClickHandler;

const load = window.backend.load;
const save = window.backend.save;

const mapFilter = window.filter.map;

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
const activateMovePin = window.move.activatePin;
const deactivateMovePin = window.move.deactivatePin;

const activateValidation = window.form.activateValidation;
const deactivateValidation = window.form.deactivateValidation;

const adFormFieldsets = adForm.querySelectorAll(`fieldset`);
const mapFiltresForm = document.querySelector(`.map__filters`);
const mapFiltres = mapFiltresForm.querySelectorAll(`.map__filter`);
const resetButton = adForm.querySelector(`.ad-form__reset`);

const disableEachElement = (elements) => {
  for (let elem of elements) {
    elem.setAttribute(`disabled`, `disabled`);
  }
};

const disableAllElements = () => {
  disableEachElement(adFormFieldsets);
  disableEachElement(mapFiltres);
};

const removeDisabledFromCollection = (elements) => {
  for (let elem of elements) {
    elem.removeAttribute(`disabled`, `disabled`);
  }
};

const pinEnterPressActivatePageHandler = (evt) => {
  enterPressHandler(evt, activatePage);
};

const pinMouseClickActivatePageHandler = (evt) => {
  mouseClickHandler(evt, activatePage);
};

const showFormWithLoad = (data) => {
  if (data.length) {
    removeDisabledFromCollection(mapFiltres);
    mapFiltresForm.classList.remove(`hidden`);
  }
};

const successSendHandler = () => {
  showSuccessSend();
  pageDeactivateHandler();
};

const errorSendHandler = () => {
  showErrorSend();
  pageDeactivateHandler();
};

const submitHandler = (evt) => {
  save(new FormData(adForm), successSendHandler, errorSendHandler);
  evt.preventDefault();
};

const pageDeactivateHandler = () => {
  userMap.classList.add(`map--faded`);
  adForm.classList.add(`ad-form--disabled`);
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
  resetButton.removeEventListener(`click`, pageDeactivateHandler);
};

pageDeactivateHandler();

const activatePage = () => {
  userMap.classList.remove(`map--faded`);
  adForm.classList.remove(`ad-form--disabled`);
  removeDisabledFromCollection(adFormFieldsets);
  load((orders) => {
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
  resetButton.addEventListener(`click`, pageDeactivateHandler);
};
