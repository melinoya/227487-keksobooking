'use strict';

(function () {
  var pinsPlace = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();

  window.makePins = function (arr) {
    for (var i = 0; i < arr.length; i++) {
      var newPin = window.createPin(arr[i]);
      newPin.addEventListener('click', function () {
        window.onRequestCard(arr[i]);
        newPin.classList.add('map__pin--active');
      });
      fragment.appendChild(newPin);
    }
    pinsPlace.appendChild(fragment);
  };
})();
