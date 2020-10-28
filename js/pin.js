'use strict';

(function () {
  const housingType = window.filter.housingType;
  const filterOrders = window.filter.filterOrders;

  const PIN_SIZE = {
    WIDTH: 50,
    HEIGHT: 70
  };
  const MAX_PINS = 5;

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

  let orders = [];

  const renderPins = function (currentOrders) {
    const pinFragment = document.createDocumentFragment();
    let maxCountPins = MAX_PINS < currentOrders.length ? MAX_PINS : currentOrders.length;

    for (let i = 0; i < maxCountPins; i++) {
      pinFragment.appendChild(createPin(currentOrders[i]));
    }
    mapContainer.appendChild(pinFragment);
  };

  const changeHousingTypeHandler = function () {
    const filteredOrders = filterOrders(orders);
    removePins();
    renderPins(filteredOrders);
  };

  const removePins = function () {
    const pins = document.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    const pin = [...pins];
    for (let i = 0; i < pin.length; i++) {
      pin[i].classList.add(`hidden`);
    }
  };

  const showPins = function () {
    const pins = document.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    const pin = [...pins];
    for (let i = 0; i < pin.length; i++) {
      pin[i].classList.remove(`hidden`);
    }
  };

  const successHandler = function (data) {
    orders = data;
    renderPins(orders);
    removePins();
    housingType.addEventListener(`change`, changeHousingTypeHandler);
  };

  window.pin = {
    PIN_SIZE,
    userMap,
    mapContainer,
    successHandler,
    showPins
  };
})();
