'use strict';

(function () {

  const adForm = window.activation.adForm;

  const roomNumber = adForm.querySelector(`#room_number`);
  const capacityNumber = adForm.querySelector(`#capacity`);
  const typeHouse = adForm.querySelector(`#type`);
  const priceNumber = adForm.querySelector(`#price`);
  const timeIn = adForm.querySelector(`#timein`);
  const timeOut = adForm.querySelector(`#timeout`);

  const joinGuestsToRooms = function () {
    if (roomNumber.value === `1`) {
      capacityNumber.value = 1;
      capacityNumber.options[1].setAttribute(`disabled`, `disabled`);
    } else if (roomNumber.value === `2`) {
      capacityNumber.value = 2;
      capacityNumber.options[0].setAttribute(`disabled`, `disabled`);
      capacityNumber.options[3].setAttribute(`disabled`, `disabled`);
      capacityNumber.options[2].removeAttribute(`disabled`, `disabled`);
      capacityNumber.options[1].removeAttribute(`disabled`, `disabled`);
    } else if (roomNumber.value === `3`) {
      capacityNumber.value = 3;
      capacityNumber.options[3].setAttribute(`disabled`, `disabled`);
      capacityNumber.options[1].removeAttribute(`disabled`, `disabled`);
      capacityNumber.options[2].removeAttribute(`disabled`, `disabled`);
      capacityNumber.options[0].removeAttribute(`disabled`, `disabled`);
    } else {
      capacityNumber.value = 0;
      capacityNumber.options[0].setAttribute(`disabled`, `disabled`);
      capacityNumber.options[2].setAttribute(`disabled`, `disabled`);
      capacityNumber.options[1].setAttribute(`disabled`, `disabled`);
      capacityNumber.options[3].setAttribute(`disabled`, `disabled`);
    }
  };

  roomNumber.addEventListener(`change`, joinGuestsToRooms);

  const changeTypeHouse = function () {
    if (typeHouse.value === `bungalow`) {
      priceNumber.min = 0;
      priceNumber.placeholder = 0;
    } else if (typeHouse.value === `flat`) {
      priceNumber.min = 1000;
      priceNumber.placeholder = 1000;
    } else if (typeHouse.value === `house`) {
      priceNumber.min = 5000;
      priceNumber.placeholder = 5000;
    } else if (typeHouse.value === `palace`) {
      priceNumber.min = 10000;
      priceNumber.placeholder = 10000;
    }
  };

  typeHouse.addEventListener(`change`, changeTypeHouse);

  const syncTimeOut = function () {
    timeOut.value = timeIn.value;
  };

  const syncTimeIn = function () {
    timeIn.value = timeOut.value;
  };

  timeIn.addEventListener(`change`, syncTimeOut);
  timeOut.addEventListener(`change`, syncTimeIn);
})();
