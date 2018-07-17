'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapContainer = map.querySelector('.map__filters-container');

  window.onRequestCard = function (arr) {
    var newCard = window.fillPin(arr);
    var close = newCard.querySelector('.popup__close');
    map.insertBefore(newCard, mapContainer);

    var cardHere = map.querySelector('.map__card');
    if (map.querySelectorAll('.map__card').length > 1) {
      cardHere.remove();
    }
    close.addEventListener('click', function () {
      map.querySelector('.map__card').remove();
    });
  };
})();
