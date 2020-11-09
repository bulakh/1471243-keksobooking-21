'use strict';

const mapFilter = document.querySelector(`.map__filters`);
const housingType = mapFilter.querySelector(`#housing-type`);
const housingPrice = mapFilter.querySelector(`#housing-price`);
const housingRooms = mapFilter.querySelector(`#housing-rooms`);
const housingGuests = mapFilter.querySelector(`#housing-guests`);
const housingFeatures = mapFilter.querySelector(`#housing-features`);

let defaultSelectHouses = `any`;

const HousePriceLimit = {
  MIN: 10000,
  MAX: 50000
};

const HousePriceType = {
  LOW: `low`,
  MIDDLE: `middle`,
  HIGH: `high`
};

const filterTypes = function (orders) {
  return orders.filter(function (order) {
    if (housingType.value === defaultSelectHouses) {
      return true;
    } else {
      return order.offer.type === housingType.value;
    }
  });
};

const filterPrice = function (orders) {
  return orders.filter(function (order) {
    switch (housingPrice.value) {
      case defaultSelectHouses:
        return true;
      case HousePriceType.LOW:
        return (order.offer.price < HousePriceLimit.MIN);
      case HousePriceType.MIDDLE:
        return order.offer.price >= HousePriceLimit.MIN && order.offer.price < HousePriceLimit.MAX;
      case HousePriceType.HIGH:
        return order.offer.price >= HousePriceLimit.MAX;
    }
    return false;
  });
};

const filterRooms = function (orders) {
  return orders.filter(function (order) {
    if (housingRooms.value === defaultSelectHouses) {
      return true;
    } else {
      return order.offer.rooms === parseInt(housingRooms.value, 10);
    }
  });
};

const filterGuests = function (orders) {
  return orders.filter(function (order) {
    if (housingGuests.value === defaultSelectHouses) {
      return true;
    } else {
      return order.offer.guests === parseInt(housingGuests.value, 10);
    }
  });
};

const filterFeatures = function (orders) {
  const features = housingFeatures.querySelectorAll(`.map__checkbox`);
  for (let feature of features) {
    if (feature.checked) {
      orders = orders.filter(function (order) {
        return order.offer.features.includes(feature.value);
      });
    }
  }
  return orders;
};

const filterAllOptions = function (orders) {
  orders = filterTypes(orders);
  orders = filterPrice(orders);
  orders = filterRooms(orders);
  orders = filterGuests(orders);
  orders = filterFeatures(orders);

  return orders;
};


window.filter = {
  filterAllOptions,
  mapFilter
};
