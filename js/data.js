'use strict';

(function () {
  const getRandomArrLength = window.main.getRandomArrLength;
  const getRandomArrElement = window.main.getRandomArrElement;
  const getRandomNumber = window.main.getRandomNumber;

  const MAP_SIZE = {
    MAP_WIDTH: 1200,
    MAP_TOP: 130,
    MAP_BOTTOM: 630
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

  getAdverts(ADVERT_NUMBER);

})();
