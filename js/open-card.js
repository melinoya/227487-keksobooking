'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapContainer = map.querySelector('.map__filters-container');
  var currentCard;

  var closeStandart = function () {
    document.querySelector('.map__pin--active').classList.remove('map__pin--active');
    currentCard.remove();
    document.removeEventListener('keydown', closeCard);
    close.removeEventListener('click', closeStandart);
  };

  var closeCard = function (evt) {
    window.util.isEscEvent(evt, function () {
      closeStandart();
    });
  };

  // ------ Создание карточки ----------
  window.onRequestCard = function (arr) {
    var pressed = document.querySelector('.map__pin--active');
    if (currentCard) {
      currentCard.remove();
    }

    var newCard = window.fillPin(arr);
    currentCard = newCard;
    var close = currentCard.querySelector('.popup__close');
    map.insertBefore(currentCard, mapContainer);

    // ----- Подчищаем лишние карточки и классы ------
    if (pressed) {
      pressed.classList.remove('map__pin--active');
    }

    // ------ Закрытие карточки разными способами ------
    document.addEventListener('keydown', closeCard);
    close.addEventListener('click', closeStandart);
  };
})();
