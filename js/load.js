'use strict';

(function () {
  const load = window.backend.load;

  const showFormWithLoad = window.activation.showFormWithLoad;

  const errorHandler = function (errorMessage) {
    const node = document.createElement(`div`);
    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red; color: white`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `30px`;

    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  load(function (orders) {
    window.pin.successHandler(orders);
    window.data.successHandler(orders);
    showFormWithLoad(orders);
  }, errorHandler);

})();
