'use strict';

const ENTER = `Enter`;
const ESC = `Escape`;
const LEFT_BUTTON_MOUSE = 1;

const enterPressHandler = (evt, action) => {
  if (evt.key === ENTER) {
    action();
  }
};

const mouseClickHandler = (evt, action) => {
  if (evt.which === LEFT_BUTTON_MOUSE) {
    action();
  }
};

const escPressHandler = (evt, action) => {
  if (evt.key === ESC) {
    evt.preventDefault();
    action();
  }
};

window.util = {
  enterPressHandler,
  mouseClickHandler,
  escPressHandler
};

