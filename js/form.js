'use strict';

(function () {

  const adForm = window.activation.adForm;

  const roomNumber = adForm.querySelector(`#room_number`);
  const capacityNumber = adForm.querySelector(`#capacity`);

  const joinGuestsToRooms = function () {
    if (roomNumber.value === `1`) {
      capacityNumber.value = 1;
      capacityNumber.options[1].setAttribute(`disabled`, `disabled`);
    } else if (roomNumber.value === `2`) {
      capacityNumber.value = 2;
      capacityNumber.options[0].setAttribute(`disabled`, `disabled`);
      capacityNumber.options[3].setAttribute(`disabled`, `disabled`);
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

})();
