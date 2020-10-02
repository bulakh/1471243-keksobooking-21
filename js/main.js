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

const PRICE = {
  MIN: 1000,
  MAX: 100000
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
userMap.classList.remove(`map--faded`);

const pinTemplate = document.querySelector(`#pin`)
  .content
  .querySelector(`map__pin`);

const mapContainer = userMap.querySelector(`.map__pins`);


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
createPins();
