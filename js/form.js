'use strict';

const MinHousePrice = {
  BUNGALOW: 0,
  FLAT: 1000,
  HOUSE: 5000,
  PALACE: 10000
};

const GuestsAndRooms = {
  ONE: `1`,
  TWO: `2`,
  THREE: `3`,
  NO_GUESTS: `0`
};

const HouseType = window.card.HouseType;

const adForm = window.upload.adForm;

const roomNumber = adForm.querySelector(`#room_number`);
const capacityNumber = adForm.querySelector(`#capacity`);
const typeHouse = adForm.querySelector(`#type`);
const priceNumber = adForm.querySelector(`#price`);
const timeIn = adForm.querySelector(`#timein`);
const timeOut = adForm.querySelector(`#timeout`);

const guestsToRoomsJoinHandler = () => {
  if (roomNumber.value === GuestsAndRooms.ONE) {
    capacityNumber.value = parseInt(GuestsAndRooms.ONE, 10);
    capacityNumber.options[1].setAttribute(`disabled`, `disabled`);
  } else if (roomNumber.value === GuestsAndRooms.TWO) {
    capacityNumber.value = parseInt(GuestsAndRooms.TWO, 10);
    capacityNumber.options[0].setAttribute(`disabled`, `disabled`);
    capacityNumber.options[3].setAttribute(`disabled`, `disabled`);
    capacityNumber.options[2].removeAttribute(`disabled`, `disabled`);
    capacityNumber.options[1].removeAttribute(`disabled`, `disabled`);
  } else if (roomNumber.value === GuestsAndRooms.THREE) {
    capacityNumber.value = parseInt(GuestsAndRooms.THREE, 10);
    capacityNumber.options[3].setAttribute(`disabled`, `disabled`);
    capacityNumber.options[1].removeAttribute(`disabled`, `disabled`);
    capacityNumber.options[2].removeAttribute(`disabled`, `disabled`);
    capacityNumber.options[0].removeAttribute(`disabled`, `disabled`);
  } else {
    capacityNumber.value = parseInt(GuestsAndRooms.NO_GUESTS, 10);
    capacityNumber.options[0].setAttribute(`disabled`, `disabled`);
    capacityNumber.options[2].setAttribute(`disabled`, `disabled`);
    capacityNumber.options[1].setAttribute(`disabled`, `disabled`);
    capacityNumber.options[3].setAttribute(`disabled`, `disabled`);
  }
};

const typeHouseChangeHandler = () => {
  if (typeHouse.value === HouseType.BUNGALOW) {
    priceNumber.min = MinHousePrice.BUNGALOW;
    priceNumber.placeholder = MinHousePrice.BUNGALOW;
  } else if (typeHouse.value === HouseType.FLAT) {
    priceNumber.min = MinHousePrice.FLAT;
    priceNumber.placeholder = MinHousePrice.FLAT;
  } else if (typeHouse.value === HouseType.HOUSE) {
    priceNumber.min = MinHousePrice.HOUSE;
    priceNumber.placeholder = MinHousePrice.HOUSE;
  } else if (typeHouse.value === HouseType.PALACE) {
    priceNumber.min = MinHousePrice.PALACE;
    priceNumber.placeholder = MinHousePrice.PALACE;
  }
};

const timeOutSyncHandler = () => {
  timeOut.value = timeIn.value;
};

const timeInSyncHandler = () => {
  timeIn.value = timeOut.value;
};

const resetCapacity = () => {
  capacityNumber.options[0].setAttribute(`disabled`, `disabled`);
  capacityNumber.options[1].setAttribute(`disabled`, `disabled`);
};

const resetPrice = () => {
  priceNumber.placeholder = MinHousePrice.FLAT;
};

const activateValidation = () => {
  roomNumber.addEventListener(`change`, guestsToRoomsJoinHandler);
  typeHouse.addEventListener(`change`, typeHouseChangeHandler);
  timeIn.addEventListener(`change`, timeOutSyncHandler);
  timeOut.addEventListener(`change`, timeInSyncHandler);
};

const deactivateValidation = () => {
  roomNumber.removeEventListener(`change`, guestsToRoomsJoinHandler);
  typeHouse.removeEventListener(`change`, typeHouseChangeHandler);
  timeIn.removeEventListener(`change`, timeOutSyncHandler);
  timeOut.removeEventListener(`change`, timeInSyncHandler);
  resetCapacity();
  resetPrice();
  adForm.reset();
};

window.form = {
  activateValidation,
  deactivateValidation
};

