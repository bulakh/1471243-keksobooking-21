'use strict';

const MAP_SIZE = {
  MAP_WIDTH: 1200,
  MAP_TOP: 130,
  MAP_BOTTOM: 630
};

const PIN_SIZE = {
  WIDTH: 50,
  HEIGHT: 70
};

const START_COORDINATES = {
  X: 648,
  Y: 453
};

const PRICE = {
  MIN: 1000,
  MAX: 1000000
};

const TITLES = [`Домик у озера`, `Уютные аппартаменты`, `Квартира под крыльцом`, `Таунхаус`, `Хижина в лесу`];
const DESCRIPTIONS = [`Шикарный вид на оригами`, `Жилье для уединения с самим собой`, `Вершина мира`, `Для скромного отпуска`, `Окунись в городскую суету`];
const ADVERT_NUMBER = 8;
const HOUSE_TYPES = [`palace`, `flat`, `house`, `bungalow`];
const ROOMS = [1, 2, 3];
const GUESTS = [1, 2, 3];
const CHECK_TIME = [`12:00`, `13:00`, `14:00`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];

// Функции рандомов

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

// Создание объявления

const getAdvert = function (adAmount) {
  const locationX = getRandomNumber(0, MAP_SIZE.MAP_WIDTH);
  const locationY = getRandomNumber(MAP_SIZE.MAP_TOP, MAP_SIZE.MAP_BOTTOM);
  const advert = {
    author: {
      avatar: `img/avatars/user0` + adAmount + `.png`
    },
    offer: {
      title: getRandomArrElement(TITLES),
      address: locationX + `, ` + locationY,
      price: getRandomNumber(PRICE.MIN, PRICE.MAX),
      type: getRandomArrElement(HOUSE_TYPES),
      rooms: getRandomArrElement(ROOMS),
      guests: getRandomArrElement(GUESTS),
      checkin: getRandomArrElement(CHECK_TIME),
      checkout: getRandomArrElement(CHECK_TIME),
      features: getRandomArrLength(FEATURES),
      description: getRandomArrElement(DESCRIPTIONS),
      photos: getRandomArrLength(PHOTOS),
    },
    location: {
      x: locationX,
      y: locationY
    }
  };
  return advert;
};

const getAdverts = function (adAmount) {
  const adverts = [];
  for (let i = 0; i < adAmount; i++) {
    adverts.push(getAdvert[i]);
  }
  return adverts;
};

const userMap = document.querySelector(`.map`);

const pinTemplate = document.querySelector(`#pin`)
  .content
  .querySelector(`map__pin`);

const mapContainer = userMap.querySelector(`.map__pins`);

// Создание метки (пина)

const createPin = function (advert) {
  const pinElement = pinTemplate.cloneNode(true);
  const pinAvatar = pinTemplate.querySelector(`img`);

  pinAvatar.src = advert.author.avatar;
  pinAvatar.alt = advert.offer.title;
  const pinX = advert.location.x - PIN_SIZE.WIDTH / 2;
  const pinY = advert.location.y - PIN_SIZE.HEIGHT;
  pinElement.style = `left: ` + pinX + `px; top: ` + pinY + `px;`;

  return pinElement;
};

const createPins = function (adverts) {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < adverts.length; i++) {
    fragment.appendChild(createPin[i]);
  }

  mapContainer.appendChild(fragment);
};


getAdverts(ADVERT_NUMBER);
createPins(ADVERT_NUMBER);

// Неактивное состояние страницы

const adForm = document.querySelector(`.ad-form`);
const adFormFieldsets = adForm.querySelectorAll(`fieldset`);
const mapFiltres = document.querySelectorAll(`.map__filter`);
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

// Активация страницы

const removeDisabledFromCollection = function (elements) {
  for (let elem of elements) {
    elem.removeAttribute(`disabled`, `disabled`);
  }
};

const activatePage = function () {
  userMap.classList.remove(`map--faded`);
  adForm.classList.remove(`ad-form--disabled`);
  removeDisabledFromCollection(adFormFieldsets);
  removeDisabledFromCollection(mapFiltres);
  adFormAddress.value = (TipCoordinates.x + PIN_SIZE.WIDTH / 2) + `, ` + (TipCoordinates.y + PIN_SIZE.HEIGHT / 2);
};

const onPinEnterPress = function (evt) {
  if (evt.key === `Enter`) {
    activatePage();
  }
};

const onPinMouseClick = function (evt) {
  if (evt.which === 1) {
    activatePage();
  }
};

mapPinMain.addEventListener(`keydown`, onPinEnterPress);

mapPinMain.addEventListener(`mousedown`, onPinMouseClick);

// Валидация

const roomNumber = adForm.querySelector(`#room_number`);
const capacityNumber = adForm.querySelector(`#capacity`);


const joinGuestsToRooms = function () {
  if (roomNumber.value === `1`) {
    capacityNumber.value = 1;
    capacityNumber.options[1].setAttribute(`disabled`, `disabled`);
  } else if (roomNumber.value === `2`) {
    capacityNumber.value = 2;
    capacityNumber.options[0].setAttribute(`disabled`, `disabled`);
    capacityNumber.options[3].setAttribute(`disabled`, `disabled`);
    capacityNumber.options[1].removeAttribute(`disabled`, `disabled`);
  } else if (roomNumber.value === `3`) {
    capacityNumber.value = 3;
    capacityNumber.options[3].setAttribute(`disabled`, `disabled`);
    capacityNumber.options[1].removeAttribute(`disabled`, `disabled`);
    capacityNumber.options[2].removeAttribute(`disabled`, `disabled`);
    capacityNumber.options[0].removeAttribute(`disabled`, `disabled`);
  } else {
    capacityNumber.value = 0;
    capacityNumber.options[0].setAttribute(`disabled`, `disabled`);
    capacityNumber.options[2].setAttribute(`disabled`, `disabled`);
    capacityNumber.options[1].setAttribute(`disabled`, `disabled`);
    capacityNumber.options[3].setAttribute(`disabled`, `disabled`);
  }
};

roomNumber.addEventListener(`change`, joinGuestsToRooms);

