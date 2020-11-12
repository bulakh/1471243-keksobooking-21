'use strict';

const MAX_PINS = 5;

const Size = {
  WIDTH: 65,
  HEIGHT: 65
};

const setDebounce = window.debounce.setDebounce;

const createCard = window.card.create;
const deactivatePin = window.card.deactivatePin;
const removeCards = window.card.removeCards;

const mapFilter = window.filter.map;
const filterAllOptions = window.filter.allOptions;

const userMap = document.querySelector(`.map`);

const pinTemplate = document.querySelector(`#pin`)
  .content
  .querySelector(`.map__pin`);

const mapContainer = userMap.querySelector(`.map__pins`);

const createPin = (advert) => {
  const pinElement = pinTemplate.cloneNode(true);
  const pinAvatar = pinElement.querySelector(`img`);

  pinAvatar.src = advert.author.avatar;
  pinAvatar.alt = advert.offer.title;
  const pinX = advert.location.x - Math.round(Size.WIDTH / 2);
  const pinY = advert.location.y - Size.HEIGHT;
  pinElement.style = `left: ` + pinX + `px; top: ` + pinY + `px;`;
  pinElement.dataset.id = advert.offer.address;

  return pinElement;
};

let orders = [];

const pinOpenCardHandler = (evt) => {
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
  createCard(orders.find((el) => {
    if (orderAddress === el.offer.address) {
      return true;
    }
    return false;
  }));
};

const renderPins = (currentOrders) => {
  const pinFragment = document.createDocumentFragment();
  let maxCountPins = MAX_PINS < currentOrders.length ? MAX_PINS : currentOrders.length;

  for (let i = 0; i < maxCountPins; i++) {
    pinFragment.appendChild(createPin(currentOrders[i]));
  }
  mapContainer.appendChild(pinFragment);
};

const removePins = () => {
  const pins = userMap.querySelectorAll(`.map__pin:not(.map__pin--main)`);
  for (let pin of pins) {
    pin.remove();
  }
};

const changeFilterHandler = () => {
  const filteredOrders = filterAllOptions(orders);
  removeCards();
  removePins();
  renderPins(filteredOrders);
};

const successLoadHandler = (data) => {
  orders = data;
  renderPins(orders);
  mapFilter.addEventListener(`change`, setDebounce(changeFilterHandler));
};

const activatePins = () => {
  mapContainer.addEventListener(`click`, pinOpenCardHandler);
};

const deactivatePins = () => {
  mapContainer.removeEventListener(`click`, pinOpenCardHandler);
  mapFilter.removeEventListener(`change`, setDebounce(changeFilterHandler));
};

window.pin = {
  Size,
  userMap,
  removePins,
  successLoadHandler,
  activatePins,
  deactivatePins
};
