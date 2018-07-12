'use strict';

(function () {
  var PIN_WIDTH = 64;
  var PIN_HEIGHT = 64;
  var PIN_TAIL = 20;
  var MIN_X = 0;
  var MAX_X = 1135;
  var MIN_Y = 80;
  var MAX_Y = 630;
  var map = document.querySelector('.map');
  var mapContainer = map.querySelector('.map__filters-container');
  var mainPin = map.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var addressInput = document.querySelector('#address');
  var pinsPlace = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();

  // ----- Создание меток на карте ----------
  var makePins = function (arr) {
    for (var i = 0; i < arr.length; i++) {
      var newPin = window.createPin(arr[i]);
      fragment.appendChild(newPin);
    }
    pinsPlace.appendChild(fragment);
  };

  // ---- Установка границ на карте для метки --------
  var setBorders = function (min, max, current) {
    if (current < min) {
      var value = min + 'px';
    } else if (current > max) {
      value = max + 'px';
    }
    return value;
  };

  //  ------------- Определение адреса для записи в input ------------
  var calcAddressValue = function (height) {
    addressInput.value = parseInt(mainPin.style.left, 10) + ', ' + (parseInt(mainPin.style.top, 10) + height);
  };

  // ----------- Запись координаты метки до нажатия на нее --------
  calcAddressValue(PIN_HEIGHT / 2);

  // ---- Нажатие на метку для активации карты
  mainPin.addEventListener('click', function () {
    window.backend.load('https://js.dump.academy/keksobooking/data', makePins, window.showError);
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
  });

  // ---- Взаимодействие с меткой на карте после нажатия на нее ---------
  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    //  ----- Запись стартовых координат метки ------
    var startCoord = {
      x: parseInt(mainPin.style.left, 10) + (PIN_WIDTH / 2),
      y: parseInt(mainPin.style.top, 10) + (PIN_HEIGHT / 2)
    };

    // ---- Запись координат метки в input с учетом ее хвоста ----
    calcAddressValue(PIN_HEIGHT + PIN_TAIL);

    // --- Функция при перемещении метки -----
    var onMouseMove = function (evtMove) {
      evtMove.preventDefault();

      // --- На сколько метка переместилась ----
      var shift = {
        x: startCoord.x - (evtMove.clientX - map.offsetLeft),
        y: startCoord.y - evtMove.clientY
      };

      // --- Замена стартовых координат на новые
      startCoord = {
        x: evtMove.clientX - map.offsetLeft,
        y: evtMove.clientY
      };

      // ---- Новые координаты задаются метке через вычитание сдвига метки ---
      mainPin.style.left = parseInt(mainPin.style.left, 10) - shift.x + 'px';
      mainPin.style.top = parseInt(mainPin.style.top, 10) - shift.y + 'px';

      calcAddressValue(PIN_HEIGHT + PIN_TAIL);

      // ----- Установка границ для метки -----

      mainPin.style.left = setBorders(MIN_X, MAX_X, parseInt(mainPin.style.left, 10));

      mainPin.style.top = setBorders(MIN_Y, MAX_Y, parseInt(mainPin.style.top, 10));
    };

    // ----- События, при отпускании клавиши мыши -----
    var onMouseUp = function (evtUp) {
      evtUp.preventDefault();

      calcAddressValue(PIN_HEIGHT + PIN_TAIL);

      // ----- Удаление отслеживателей событий -----
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    // -----Добавление отслеживаний событий -------
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  // ---- Создание карточки с описанием -----
  var onRequestCard = function (arr) {
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

  // ----- Вызов карточки с описанием при нажатии на метку ------
  pinsPlace.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('map__pin--clone')) {
      window.backend.load('https://js.dump.academy/keksobooking/data', onRequestCard, window.showError);
    }
  });
})();
