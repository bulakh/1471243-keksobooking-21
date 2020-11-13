'use strict';

const TIMEOUT_IN_MS = 10000;

const URL_DATA = `https://21.javascript.pages.academy/keksobooking/data`;
const URL_SAVE = `https://21.javascript.pages.academy/keksobooking`;

const StatusCode = {
  OK: 200
};

window.backend = {
  load(onLoad, onError) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, () => {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
      }
    });

    xhr.addEventListener(`error`, () => {
      onError(`Произошла ошибка соединения`);
    })
    ;
    xhr.addEventListener(`timeout`, () => {
      onError(`Запрос не успел выполниться за ` + xhr.timeout + ` мс`);
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open(`GET`, URL_DATA);
    xhr.send();
  },

  save(data, onLoad, onError) {

    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, () => {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
      }
    });

    xhr.addEventListener(`error`, () => {
      onError(`Произошла ошибка соединения`);
    });
    xhr.addEventListener(`timeout`, () => {
      onError(`Запрос не успел выполниться за ` + xhr.timeout + ` мс`);
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open(`POST`, URL_SAVE);
    xhr.send(data);
  }
};
