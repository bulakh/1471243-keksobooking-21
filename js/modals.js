'use strict';

const escPressHandler = window.util.escPressHandler;

const main = document.querySelector(`main`);
const successMessageTemplate = document.querySelector(`#success`).content;
const errorMessageTemplate = document.querySelector(`#error`).content;

const errorLoadHandler = (errorMessage) => {
  const node = document.createElement(`div`);
  node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red; color: white`;
  node.style.position = `absolute`;
  node.style.left = 0;
  node.style.right = 0;
  node.style.fontSize = `30px`;

  node.textContent = errorMessage;
  document.body.insertAdjacentElement(`afterbegin`, node);
};

const showSuccessSend = () => {
  const message = successMessageTemplate.cloneNode(true);
  message.querySelector(`.success`).addEventListener(`click`, successMessageCloseHandler);
  document.addEventListener(`keydown`, escCloseSuccessMessageHandler);
  main.appendChild(message);
};

const successMessageCloseHandler = () => {
  main.querySelector(`.success`).remove();
  document.removeEventListener(`keydown`, escCloseSuccessMessageHandler);
  document.removeEventListener(`click`, successMessageCloseHandler);
};

const escCloseSuccessMessageHandler = (evt) => {
  escPressHandler(evt, successMessageCloseHandler);
};

const showErrorSend = () => {
  const message = errorMessageTemplate.cloneNode(true);
  message.querySelector(`.error`).addEventListener(`click`, errorMessageCloseHandler);
  document.addEventListener(`keydown`, escCloseErrorMessageHandler);
  main.appendChild(message);
};

const errorMessageCloseHandler = () => {
  main.querySelector(`.error`).remove();
  document.removeEventListener(`keydown`, escCloseErrorMessageHandler);
  document.removeEventListener(`click`, errorMessageCloseHandler);
};

const escCloseErrorMessageHandler = (evt) => {
  escPressHandler(evt, errorMessageCloseHandler);
};


window.modals = {
  showErrorSend,
  showSuccessSend,
  errorLoadHandler
};
