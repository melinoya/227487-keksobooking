'use strict';

(function () {
  var PINS_QUANTITY = 5;
  var pinsPlace = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();

  window.makePins = function (arr) {
    arr.slice(0, PINS_QUANTITY).forEach(function (data) {
      var newPin = window.createPin(data);
      newPin.addEventListener('click', function () {
        window.onRequestCard(data);
        newPin.classList.add('map__pin--active');
      });
      fragment.appendChild(newPin);
    });
    pinsPlace.appendChild(fragment);
  };
})();
