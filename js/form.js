'use strict';

(function () {
  var map = document.querySelector('.map');
  var pinsPlace = document.querySelector('.map__pins');
  var price = document.querySelector('#price');
  var housingTypeSelect = document.querySelector('#type');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var roomNumber = document.querySelector('#room_number');
  var guests = document.querySelector('#capacity');
  var form = document.querySelector('.ad-form');
  var reset = document.querySelector('.ad-form__reset');
  var success = document.querySelector('.success');
  var formFilter = document.querySelector('.map__filters');
  var allSelects = formFilter.querySelectorAll('select');
  var featureSelect = document.querySelector('#housing-features');
  var typeToPrice = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };
  var roomToGuest = {
    1: [3],
    2: [2, 3],
    3: [1, 2, 3],
    100: [4]
  };

  var changeTime = function (shift, choice) {
    shift.options[choice.selectedIndex].selected = true;
  };

  // ----- Сброс всех select при отправке/ресета формы
  var resetSelect = function (arr) {
    arr.forEach(function (it) {
      it.options[0].selected = true;
    });
  };

  // ----------------- Зависимость цены от типа жилья -----------------
  housingTypeSelect.addEventListener('click', function () {
    var selected = housingTypeSelect.options[housingTypeSelect.selectedIndex].value;
    price.min = typeToPrice[selected];
    price.placeholder = typeToPrice[selected];
  });

  // ----------------- Время заезда и выезда - зависимость --------------
  timeIn.addEventListener('click', function () {
    changeTime(timeOut, timeIn);
  });

  timeOut.addEventListener('click', function () {
    changeTime(timeIn, timeOut);
  });

  // ----------------- Зависимость кол-ва гостей от кол-ва комнат -------
  guests.setCustomValidity('Введено неверное количество гостей');
  roomNumber.addEventListener('click', function () {
    var selectedRoom = roomNumber.options[roomNumber.selectedIndex].value;
    Array.from(guests.options).forEach(function (it) {
      it.disabled = true;
    });
    guests.setCustomValidity('');

    if (roomToGuest[selectedRoom]) {
      var selectedValues = roomToGuest[selectedRoom];
      selectedValues.forEach(function (it) {
        guests.options[it].disabled = false;
      });
    }
  });

  // ------------------------ Сброс формы при нажатии на кнопку Reset -------
  var resetAll = function () {
    var pinClones = pinsPlace.querySelectorAll('.map__pin--clone');
    pinClones.forEach(function (it) {
      it.remove();
    });
    map.classList.add('map--faded');

    var card = map.querySelector('.map__card');
    if (card) {
      card.remove();
    }

    resetSelect(allSelects);

    var selectedFeatures = featureSelect.querySelectorAll('input[type = checkbox]:checked');
    selectedFeatures.forEach(function (it) {
      it.checked = false;
    });
  };

  reset.addEventListener('click', resetAll);

  // --------- Сброс формы на дефолтные значения при удачной
  //  отправке формы --------------------
  var closeOnSuccess = function (evtDown) {
    window.util.isEscEvent(evtDown, function () {
      success.classList.add('hidden');
      document.removeEventListener('keydown', closeOnSuccess);
    });
  };

  var makeSelected = function (element) {
    element.options[0].disabled = false;
    element.options[0].selected = true;
    element.options[0].disabled = true;
  };

  form.addEventListener('submit', function (evt) {
    window.backend.save('https://js.dump.academy/keksobooking', new FormData(form), function () {
      success.classList.remove('hidden');
      resetAll();

      var inputs = form.querySelectorAll('input');
      inputs.forEach(function (it) {
        it.value = '';
      });

      var adSelects = form.querySelectorAll('select');
      resetSelect(adSelects);

      form.querySelector('#description').value = '';
      makeSelected(roomNumber);
      makeSelected(guests);

      document.addEventListener('keydown', closeOnSuccess);
    }, window.showError);
    evt.preventDefault();
  });
})();
