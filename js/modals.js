'use strict';

(function () {

  const onEscPress = window.util.onEscPress;
  const main = document.querySelector(`main`);
  const successMessageTemplate = document.querySelector(`#success`).content;
  const errorMessageTemplate = document.querySelector(`#error`).content;

  const errorLoadHandler = function (errorMessage) {
    const node = document.createElement(`div`);
    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red; color: white`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `30px`;

    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  const showSuccessSend = function () {
    const message = successMessageTemplate.cloneNode(true);
    message.querySelector(`.success`).addEventListener(`click`, closeMessageSuccess);
    document.addEventListener(`keydown`, onEscCloseMessageSucc);
    main.appendChild(message);
  };

  const closeMessageSuccess = function () {
    main.querySelector(`.success`).remove();
    document.removeEventListener(`click`, closeMessageSuccess);
    document.removeEventListener(`keydown`, onEscCloseMessageSucc);
  };

  const onEscCloseMessageSucc = function (evt) {
    onEscPress(evt, closeMessageSuccess);
  };

  const showErrorSend = function () {
    const message = errorMessageTemplate.cloneNode(true);
    message.querySelector(`.error__button`).addEventListener(`click`, closeMessageError);
    message.querySelector(`.error`).addEventListener(`click`, closeMessageError);
    document.addEventListener(`keydown`, onEscCloseMessageErr);
    main.appendChild(message);
  };

  const closeMessageError = function () {
    main.querySelector(`.error`).remove();
    document.removeEventListener(`keydown`, onEscCloseMessageErr);
    document.removeEventListener(`click`, closeMessageError);
  };

  const onEscCloseMessageErr = function (evt) {
    onEscPress(evt, closeMessageError);
  };


  window.modals = {
    showErrorSend,
    showSuccessSend,
    errorLoadHandler
  };
})();
