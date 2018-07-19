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
  var guestsOptions = guests.querySelectorAll('option');
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

  var testValue = function (select, value) {
    var options = select.options;
    for (var i = 0; i < options.length; i++) {
      if (options[i].value === value) {
        return i;
      }
    }
    return i;
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
    var selectedTime = timeIn.options[timeIn.selectedIndex].value;
    timeOut.options[testValue(timeOut, selectedTime)].selected = true;
  });

  timeOut.addEventListener('click', function () {
    var selectedTime = timeOut.options[timeOut.selectedIndex].value;
    timeIn.options[testValue(timeIn, selectedTime)].selected = true;
  });

  // ----------------- Зависимость кол-ва гостей от кол-ва комнат -------
  guests.setCustomValidity('Введено неверное количество гостей');
  roomNumber.addEventListener('click', function () {
    var selectedRoom = roomNumber.options[roomNumber.selectedIndex].value;
    for (var i = 0; i < guestsOptions.length; i++) {
      guests.options[i].disabled = true;
    }
    guests.setCustomValidity('');

    if (roomToGuest[selectedRoom]) {
      var selectedValues = roomToGuest[selectedRoom];
      for (var j = 0; j < selectedValues.length; j++) {
        var k = selectedValues[j];
        guests.options[k].disabled = false;
      }
    }
  });

  // ------------------------ Сброс формы при нажатии на кнопку Reset -------
  var resetAll = function () {
    var pinClones = pinsPlace.querySelectorAll('.map__pin--clone');
    for (var i = 0; i < pinClones.length; i++) {
      pinClones[i].remove();
    }
    map.classList.add('map--faded');

    if (map.querySelector('.map__card')) {
      map.querySelector('.map__card').remove();
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
