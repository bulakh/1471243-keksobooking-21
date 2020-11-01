'use strict';

(function () {
  const housingType = window.filter.housingType;
  const filterOrders = window.filter.filterOrders;
  const createCard = window.card.createCard;
  const deactivatePin = window.card.deactivatePin;
  const removeCards = window.card.removeCards;

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
    const pinAvatar = pinElement.querySelector(`img`);

    pinAvatar.src = advert.author.avatar;
    pinAvatar.alt = advert.offer.title;
    const pinX = advert.location.x - PIN_SIZE.WIDTH / 2;
    const pinY = advert.location.y - PIN_SIZE.HEIGHT;
    pinElement.style = `left: ` + pinX + `px; top: ` + pinY + `px;`;

    const onPinClickShowCard = function () {
      deactivatePin();
      pinElement.classList.add(`map__pin--active`);
      removeCards();
      createCard(advert);
    };

    pinElement.addEventListener(`click`, onPinClickShowCard);

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

  const removePins = function () {
    const pins = userMap.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    for (let pin of pins) {
      pin.remove();
    }
  };


  const changeHousingTypeHandler = function () {
    const filteredOrders = filterOrders(orders);
    removePins();
    renderPins(filteredOrders);
  };

  const successHandler = function (data) {
    orders = data;
    renderPins(orders);
    housingType.addEventListener(`change`, changeHousingTypeHandler);
  };

  window.pin = {
    PIN_SIZE,
    pinTemplate,
    userMap,
    mapContainer,
    successHandler,
    createPin,
    renderPins
  };
})();
