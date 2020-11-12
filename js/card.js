'use strict';

const ZeroCoordinates = {
  X: 0,
  Y: 0
};

const HouseType = {
  FLAT: `flat`,
  BUNGALOW: `bungalow`,
  HOUSE: `house`,
  PALACE: `palace`,
};

const HouseTypeTitle = {
  [HouseType.FLAT]: `Квартира`,
  [HouseType.BUNGALOW]: `Бунгало`,
  [HouseType.HOUSE]: `Дом`,
  [HouseType.PALACE]: `Дворец`
};

const escPressHandler = window.util.escPressHandler;

const cardTemplate = document.querySelector(`#card`)
  .content
  .querySelector(`.map__card`);
const mapFilterContainer = document.querySelector(`.map__filters-container`);

const makeFeatures = (features, cardCloneFeatures) => {
  const featuresFragment = document.createDocumentFragment();
  cardCloneFeatures.innerHTML = ``;

  features.forEach((feature) => {
    const featuresElement = document.createElement(`li`);
    const featuresElementClass = `popup__feature`;
    const featuresElementClassSpecial = `${featuresElementClass}--${feature}`;
    featuresElement.textContent = feature;
    featuresElement.classList.add(featuresElementClass, featuresElementClassSpecial);
    featuresFragment.appendChild(featuresElement);
  });
  cardCloneFeatures.appendChild(featuresFragment);
};

const makePhotos = (photos, cardClonePhotos) => {
  const photoFragment = document.createDocumentFragment();
  cardClonePhotos.innerHTML = ``;

  photos.forEach((photo) => {
    const picture = document.createElement(`img`);
    const pictureClass = `popup__photo`;
    picture.alt = `Фотография жилья`;
    picture.src = photo;
    picture.style.width = 45;
    picture.style.height = 40;
    picture.classList.add(pictureClass);
    photoFragment.appendChild(picture);
  });
  cardClonePhotos.appendChild(photoFragment);
};

const deactivatePin = () => {
  const mapActivePin = document.querySelector(`.map__pin--active`);
  if (mapActivePin) {
    mapActivePin.classList.remove(`map__pin--active`);
  }
};

const create = (advert) => {
  const cardElement = cardTemplate.cloneNode(true);

  const cardTitle = cardElement.querySelector(`.popup__title`);
  if (advert.offer.title) {
    cardTitle.textContent = advert.offer.title;
  } else {
    cardTitle.remove();
  }

  const cardAddress = cardElement.querySelector(`.popup__text--address`);
  if (advert.offer.address) {
    cardAddress.textContent = advert.offer.address;
  } else {
    cardAddress.remove();
  }

  const cardPrice = cardElement.querySelector(`.popup__text--price`);
  if (advert.offer.price) {
    cardPrice.textContent = advert.offer.price + ` руб/ночь`;
  } else {
    cardPrice.remove();
  }

  const cardTypeHouses = cardElement.querySelector(`.popup__type`);
  if (advert.offer.type) {
    cardTypeHouses.textContent = HouseTypeTitle[advert.offer.type];
  } else {
    cardTypeHouses.remove();
  }

  const cardCountRoomsAndGuests = cardElement.querySelector(`.popup__text--capacity`);
  if (advert.offer.rooms && advert.offer.guests) {
    cardCountRoomsAndGuests.textContent = advert.offer.rooms + ` комнаты для ` + advert.offer.guests + ` гостей`;
  } else {
    cardCountRoomsAndGuests.remove();
  }

  const cardCheckTime = cardElement.querySelector(`.popup__text--time`);
  if (advert.offer.checkin && advert.offer.checkout) {
    cardCheckTime.textContent = `Заезд после: ` + advert.offer.checkin + `, выезд до ` + advert.offer.checkout;
  } else {
    cardCheckTime.remove();
  }

  const cardFeatures = cardElement.querySelector(`.popup__features`);
  if (advert.offer.features.length) {
    makeFeatures(advert.offer.features, cardFeatures);
  } else {
    cardFeatures.remove();
  }

  const cardPhotos = cardElement.querySelector(`.popup__photos`);
  if (advert.offer.photos.length) {
    makePhotos(advert.offer.photos, cardPhotos);
  } else {
    cardPhotos.remove();
  }

  const cardDescription = cardElement.querySelector(`.popup__description`);
  if (advert.offer.description) {
    cardDescription.textContent = advert.offer.description;
  } else {
    cardDescription.remove();
  }

  const cardAvatar = cardElement.querySelector(`.popup__avatar`);
  if (advert.author.avatar) {
    cardAvatar.src = advert.author.avatar;
  } else {
    cardAvatar.remove();
  }

  if (advert.location.x && advert.location.y) {
    cardElement.style = `left: ` + advert.location.x + `px; top: ` + advert.location.y + `px;`;
  } else {
    cardElement.style = `left: ` + ZeroCoordinates.X + `px; top: ` + ZeroCoordinates.Y + `px;`;
  }

  mapFilterContainer.insertAdjacentElement(`beforebegin`, cardElement);

  const cardEscPressHandler = (evt) => {
    escPressHandler(evt, closeCard);
  };

  const closeCard = () => {
    deactivatePin();
    cardElement.remove();
    document.removeEventListener(`keydown`, cardEscPressHandler);
    cardCrossClose.removeEventListener(`click`, cardCrossClickCloseHandler);
  };

  const cardCrossClickCloseHandler = () => {
    closeCard();
  };

  const cardCrossClose = document.querySelector(`.popup__close`);
  cardCrossClose.addEventListener(`click`, cardCrossClickCloseHandler);
  document.addEventListener(`keydown`, cardEscPressHandler);

  return cardElement;
};

const removeCards = () => {
  const popups = document.querySelectorAll(`.popup`);
  for (let popup of popups) {
    popup.remove();
  }
};


window.card = {
  create,
  deactivatePin,
  removeCards,
  HouseType
};
