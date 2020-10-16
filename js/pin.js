'use strict';

(function () {

  const load = window.backend.load;
  const errorHandler = window.data.errorHandler;

  const PIN_SIZE = {
    WIDTH: 50,
    HEIGHT: 70
  };

  const userMap = document.querySelector(`.map`);

  const pinTemplate = document.querySelector(`#pin`)
    .content
    .querySelector(`.map__pin`);

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

  const successHandler = function (res) {

    const fragment = document.createDocumentFragment();

    for (let i = 0; i < res.length; i++) {
      fragment.appendChild(createPin(res[i]));
    }

    mapContainer.appendChild(fragment);
  };

  load(successHandler, errorHandler);


  window.pin = {
    PIN_SIZE,
    userMap
  };
})();
