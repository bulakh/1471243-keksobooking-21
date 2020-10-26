'use strict';

(function () {

  const housingType = document.querySelector(`#housing-type`);

  let defaultSelectHouses = `any`;

  const filterOrders = function (orders) {
    return orders.filter(function (order) {
      if (housingType.value === defaultSelectHouses) {
        return true;
      } else {
        return order.offer.type === housingType.value;
      }
    });
  };

  window.filter = {
    filterOrders,
    housingType
  };

})();
