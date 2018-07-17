'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapContainer = map.querySelector('.map__filters-container');

  var closeCard = function (evt) {
    window.util.isEscEvent(evt, function () {
      document.querySelector('.map__pin--active').classList.remove('map__pin--active');
      map.querySelector('.map__card').remove();
      document.removeEventListener('keydown', closeCard);
    });
  };

  // ------ Создание карточки ----------
  window.onRequestCard = function (arr) {
    var pressed = document.querySelector('.map__pin--active');
    var newCard = window.fillPin(arr);
    var close = newCard.querySelector('.popup__close');
    map.insertBefore(newCard, mapContainer);

    // ----- Подчищаем лишние карточки и классы ------
    var cardHere = map.querySelector('.map__card');
    if (map.querySelectorAll('.map__card').length > 1) {
      cardHere.remove();
    }
    if (pressed) {
      pressed.classList.remove('map__pin--active');
    }

    // ------ Закрытие карточки разными способами ------
    document.addEventListener('keydown', closeCard);

    close.addEventListener('click', function () {
      map.querySelector('.map__card').remove();
      document.querySelector('.map__pin--active').classList.remove('map__pin--active');
    });
  };
})();
