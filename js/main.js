'use strict';

(function () {

  const ENTER = `Enter`;
  const ESC = `Escape`;

  const getRandomArrElement = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  const getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  };

  const getRandomArrLength = function (arr) {
    const arrLength = getRandomNumber(1, arr.length);
    const arrCopy = [...arr];
    const resultArr = [];
    for (let i = 0; i < arrLength; i++) {
      const arrElement = getRandomArrElement(arrCopy);
      resultArr.push(arrElement);
      const index = arrCopy.indexOf(arrElement);
      if (index > -1) {
        arrCopy.splice(index, 1);
      }
    }
    return resultArr;
  };

  const onElemEnterPress = function (evt, action) {
    if (evt.key === ENTER) {
      action();
    }
  };

  const onElemMouseClick = function (evt, action) {
    if (evt.which === 1) {
      action();
    }
  };

  const onEscPress = function (evt, action) {
    if (evt.key === ESC) {
      evt.preventDefault();
      action();
    }
  };

  window.main = {
    getRandomArrElement,
    getRandomNumber,
    getRandomArrLength,
    onElemEnterPress,
    onElemMouseClick,
    onEscPress
  };
})();

