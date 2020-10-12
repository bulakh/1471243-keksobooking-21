'use strict';

(function () {

  const ADVERT_NUMBER = window.data.ADVERT_NUMBER;

  const PIN_SIZE = {
    WIDTH: 50,
    HEIGHT: 70
  };

  const userMap = document.querySelector(`.map`);

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


  createPins(ADVERT_NUMBER);

  window.pin = {
    PIN_SIZE,
    userMap
  };
})();
