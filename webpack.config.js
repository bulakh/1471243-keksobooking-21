const path = require("path");

module.exports = {
  entry: [
    "./js/util.js",
    "./js/backend.js",
    "./js/data.js",
    "./js/debounce.js",
    "./js/filter.js",
    "./js/card.js",
    "./js/pin.js",
    "./js/modals.js",
    "./js/upload.js",
    "./js/map.js",
    "./js/move.js",
    "./js/form.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};
