'use strict';

(function () {
  window.pinsFromServer = [];

  var getFromServer = function (arr) {
    window.pinsFromServer = arr.slice();
    return window.pinsFromServer;
  };

  window.backend.load('https://js.dump.academy/keksobooking/data', getFromServer, window.showError);
})();
