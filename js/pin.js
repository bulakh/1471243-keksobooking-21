'use strict';

const setDebounce = window.debounce.setDebounce;

const createCard = window.card.createCard;
const deactivatePin = window.card.deactivatePin;
const removeCards = window.card.removeCards;

const mapFilter = window.filter.mapFilter;
const filterAllOptions = window.filter.filterAllOptions;

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
  pinElement.dataset.id = advert.offer.address;

  return pinElement;
};

let orders = [];

const pinOpenCardHandler = function (evt) {
  let pin;
  if (evt.target.matches(`.map__pin:not(.map__pin--active):not(.map__pin--main)`)) {
    pin = evt.target;
  } else if (evt.target.parentElement.matches(`.map__pin:not(.map__pin--active):not(.map__pin--main)`)) {
    pin = evt.target.parentElement;
  } else {
    return;
  }
  deactivatePin();
  pin.classList.add(`map__pin--active`);
  removeCards();
  let orderAddress = pin.dataset.id;
  createCard(orders.find(function (el) {
    if (orderAddress === el.offer.address) {
      return true;
    }
    return false;
  }));
};

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

const changeFilterHandler = function () {
  const filteredOrders = filterAllOptions(orders);
  removeCards();
  removePins();
  renderPins(filteredOrders);
};

const successLoadHandler = function (data) {
  orders = data;
  renderPins(orders);
  mapFilter.addEventListener(`change`, setDebounce(changeFilterHandler));
};

const activatePins = function () {
  mapContainer.addEventListener(`click`, pinOpenCardHandler);
};

const deactivatePins = function () {
  mapContainer.removeEventListener(`click`, pinOpenCardHandler);
  mapFilter.removeEventListener(`change`, setDebounce(changeFilterHandler));
};

window.pin = {
  PIN_SIZE,
  userMap,
  removePins,
  successLoadHandler,
  activatePins,
  deactivatePins
};
