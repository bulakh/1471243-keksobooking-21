'use strict';

const DEFAULT_SELECT_HOUSES = `any`;

const HousePriceLimit = {
  MIN: 10000,
  MAX: 50000
};

const HousePriceType = {
  LOW: `low`,
  MIDDLE: `middle`,
  HIGH: `high`
};

const map = document.querySelector(`.map__filters`);
const housingType = map.querySelector(`#housing-type`);
const housingPrice = map.querySelector(`#housing-price`);
const housingRooms = map.querySelector(`#housing-rooms`);
const housingGuests = map.querySelector(`#housing-guests`);
const housingFeatures = map.querySelector(`#housing-features`);

const filterTypes = (orders) => {
  return orders.filter((order) => {
    if (housingType.value === DEFAULT_SELECT_HOUSES) {
      return true;
    }
    return order.offer.type === housingType.value;
  });
};

const filterPrice = (orders) => {
  return orders.filter((order) => {
    switch (housingPrice.value) {
      case DEFAULT_SELECT_HOUSES:
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

const filterRooms = (orders) => {
  return orders.filter((order) => {
    if (housingRooms.value === DEFAULT_SELECT_HOUSES) {
      return true;
    }
    return order.offer.rooms === parseInt(housingRooms.value, 10);
  });
};

const filterGuests = (orders) => {
  return orders.filter((order) => {
    if (housingGuests.value === DEFAULT_SELECT_HOUSES) {
      return true;
    }
    return order.offer.guests === parseInt(housingGuests.value, 10);
  });
};

const filterFeatures = (orders) => {
  const features = housingFeatures.querySelectorAll(`.map__checkbox`);
  for (let feature of features) {
    if (feature.checked) {
      orders = orders.filter((order) => {
        return order.offer.features.includes(feature.value);
      });
    }
  }
  return orders;
};

const allOptions = (orders) => {
  orders = filterTypes(orders);
  orders = filterPrice(orders);
  orders = filterRooms(orders);
  orders = filterGuests(orders);
  orders = filterFeatures(orders);

  return orders;
};


window.filter = {
  allOptions,
  map
};
