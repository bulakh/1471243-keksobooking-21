'use strict';

(function () {
  const onEscPress = window.main.onEscPress;

  const ZERO_COORDINATES = {
    X: 0,
    Y: 0
  };

  const cardTemplate = document.querySelector(`#card`)
    .content
    .querySelector(`.map__card`);
  const mapFilterContainer = document.querySelector(`.map__filters-container`);

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

  const makeFeatures = function (features, cardCloneFeatures) {
    const featuresFragment = document.createDocumentFragment();
    cardCloneFeatures.innerHTML = ``;

    for (let i = 0; i < features.length; i++) {
      const feature = document.createElement(`li`);
      const featureClass = `popup__feature`;
      const featureClassSpecial = `${featureClass}--${features[i]}`;

      feature.textContent = features[i];
      feature.classList.add(featureClass, featureClassSpecial);

      featuresFragment.appendChild(feature);
    }

    cardCloneFeatures.appendChild(featuresFragment);
  };

  const makePhotos = function (photos, cardClonePhotos) {
    const photoFragment = document.createDocumentFragment();
    cardClonePhotos.innerHTML = ``;

    for (let i = 0; i < photos.length; i++) {
      const photo = document.createElement(`img`);
      const photoClass = `popup__photo`;
      photo.alt = `Фотография жилья`;
      photo.src = photos[i];
      photo.style.width = 45;
      photo.style.height = 40;
      photo.classList.add(photoClass);

      photoFragment.appendChild(photo);
    }
    cardClonePhotos.appendChild(photoFragment);
  };

  const deactivatePin = function () {
    const mapActivePin = document.querySelector(`.map__pin--active`);
    if (mapActivePin) {
      mapActivePin.classList.remove(`map__pin--active`);
    }
  };

  const createCard = function (advert) {
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
      cardElement.style = `left: ` + ZERO_COORDINATES.X + `px; top: ` + ZERO_COORDINATES.Y + `px;`;
    }

    mapFilterContainer.insertAdjacentElement(`beforebegin`, cardElement);

    const onCardEscPress = function (evt) {
      onEscPress(evt, closeCard);
    };

    const closeCard = function () {
      deactivatePin();
      cardElement.remove();
      document.removeEventListener(`keydown`, onCardEscPress);
    };

    const onCardCrossClickClose = function () {
      closeCard();
    };

    const cardCrossClose = document.querySelector(`.popup__close`);
    cardCrossClose.addEventListener(`click`, onCardCrossClickClose);
    document.addEventListener(`keydown`, onCardEscPress);

    return cardElement;
  };

  const removeCards = function () {
    const popups = document.querySelectorAll(`.popup`);
    for (let popup of popups) {
      popup.remove();
    }
  };


  window.card = {
    createCard,
    deactivatePin,
    removeCards,
    HouseType
  };
})();
