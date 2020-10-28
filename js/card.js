'use strict';

(function () {
  const userMap = window.pin.userMap;

  const cardTemplate = document.querySelector(`#card`)
    .content
    .querySelector(`.map__card`);
  const cardTitle = cardTemplate.querySelector(`.popup__title`);
  const cardAddress = cardTemplate.querySelector(`.popup__text--address`);
  const cardPrice = cardTemplate.querySelector(`.popup__text--price`);
  const cardTypeHouses = cardTemplate.querySelector(`.popup__type`);
  const cardCountRoomsAndGuests = cardTemplate.querySelector(`.popup__text--capacity`);
  const cardCheckTime = cardTemplate.querySelector(`.popup__text--time`);
  const cardFeatures = cardTemplate.querySelector(`.popup__features`);
  const cardDescription = cardTemplate.querySelector(`.popup__description`);
  const cardPhotos = cardTemplate.querySelector(`.popup__photos`);
  const cardAvatar = cardTemplate.querySelector(`.popup__avatar`);
  const mapFilterContainer = document.querySelector(`.map__filters-container`);


  const choseTypeHouses = function (house) {
    switch (house) {
      case `flat`:
        return `Квартира`;
      case `bungalow`:
        return `Бунгало`;
      case `house`:
        return `Дом`;
      case `palace`:
        return `Дворец`;
      default:
        return `Жилье`;
    }
  };

  const makeFeatures = function (features) {
    const featuresFragment = document.createDocumentFragment();
    cardFeatures.innerHTML = ``;

    for (let i = 0; i < features.length; i++) {
      const feature = document.createElement(`li`);
      const featureClass = `popup__feature`;
      const featureClassSpecial = `${featureClass}--${features[i]}`;

      feature.textContent = features[i];
      feature.classList.add(featureClass, featureClassSpecial);

      featuresFragment.appendChild(feature);
    }

    cardFeatures.appendChild(featuresFragment);
  };

  const makePhotos = function (photos) {
    const photoFragment = document.createDocumentFragment();
    cardPhotos.innerHTML = ``;

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
    cardPhotos.appendChild(photoFragment);
  };

  const createCard = function (advert) {
    const cardElement = cardTemplate.cloneNode(true);

    cardTitle.textContent = advert.offer.title;
    cardAddress.textContent = advert.offer.address;
    cardPrice.textContent = advert.offer.price + ` руб/ночь`;
    cardTypeHouses.textContent = choseTypeHouses(advert.offer.type);
    cardCountRoomsAndGuests.textContent = advert.offer.rooms + ` комнаты для ` + advert.offer.guests + ` гостей`;
    cardCheckTime.textContent = `Заезд после: ` + advert.offer.checkin + `, выезд до ` + advert.offer.checkout;
    makeFeatures(advert.offer.features);
    cardDescription.textContent = advert.offer.description;
    makePhotos(advert.offer.photos);
    cardAvatar.src = advert.author.avatar;

    return cardElement;
  };

  const renderCards = function (orders) {
    const cardFragment = document.createDocumentFragment();

    for (let i = 0; i < orders.length; i++) {
      cardFragment.appendChild(createCard(orders[i]));
    }
    userMap.insertBefore(cardFragment, mapFilterContainer);
  };

  const successHandler = function (orders) {
    renderCards(orders);
  };


  window.card = {
    successHandler
  };
})();
