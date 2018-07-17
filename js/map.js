'use strict';

(function () {
  var PIN = {
    WIDTH: 64,
    HEIGHT: 64,
    TAIL: 20
  };

  var MIN = {
    X: 0,
    Y: 80
  };

  var MAX = {
    X: 1135,
    Y: 630
  };

  var map = document.querySelector('.map');
  var mapFilters = map.querySelector('.map__filters');
  var mainPin = map.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var addressInput = document.querySelector('#address');
  var pinsPlace = document.querySelector('.map__pins');


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
  calcAddressValue(PIN.HEIGHT / 2);

  // ---- Нажатие на метку для активации карты
  mainPin.addEventListener('click', function () {
    window.backend.load('https://js.dump.academy/keksobooking/data', window.makePins, window.showError);

    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
  });

  // ---- Взаимодействие с меткой на карте после нажатия на нее ---------
  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    //  ----- Запись стартовых координат метки ------
    var startCoord = {
      x: parseInt(mainPin.style.left, 10) + (PIN.WIDTH / 2),
      y: parseInt(mainPin.style.top, 10) + (PIN.HEIGHT / 2)
    };

    // ---- Запись координат метки в input с учетом ее хвоста ----
    calcAddressValue(PIN.HEIGHT + PIN.TAIL);

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

      calcAddressValue(PIN.HEIGHT + PIN.TAIL);

      // ----- Установка границ для метки -----

      mainPin.style.left = setBorders(MIN.X, MAX.X, parseInt(mainPin.style.left, 10));
      mainPin.style.top = setBorders(MIN.Y, MAX.Y, parseInt(mainPin.style.top, 10));
    };

    // ----- События, при отпускании клавиши мыши -----
    var onMouseUp = function (evtUp) {
      evtUp.preventDefault();

      calcAddressValue(PIN.HEIGHT + PIN.TAIL);

      // ----- Удаление отслеживателей событий -----
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    // -----Добавление отслеживаний событий -------
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  // ------- Вызов применения фильтров на странице ----------
  mapFilters.addEventListener('change', function () {
    var all = pinsPlace.querySelectorAll('.map__pin--clone');
    for (var i = 0; i < all.length; i++) {
      all[i].remove();
    }

    window.onSuccess();
  });
})();
