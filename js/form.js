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
  var typeSelect = document.querySelector('#housing-type');
  var priceSelect = document.querySelector('#housing-price');
  var roomSelect = document.querySelector('#housing-rooms');
  var guestSelect = document.querySelector('#housing-guests');
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
    for (var i = 0; i < 5; i++) {
      guests.options[i].disabled = true;
    }
    guests.setCustomValidity('');
    var selectedValues = roomToGuest[selectedRoom];
    for (var j = 0; j < selectedValues.length; j++) {
      var k = selectedValues[j];
      guests.options[k].disabled = false;
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
      map.querySelector('.map__card');
    }
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

  form.addEventListener('submit', function (evt) {
    window.backend.save('https://js.dump.academy/keksobooking', new FormData(form), function () {
      success.classList.remove('hidden');
      resetAll();
      form.querySelector('#title').value = '';
      form.querySelector('#price').value = '';
      form.querySelector('#description').value = '';
      housingTypeSelect.options[0].selected = true;
      timeOut.options[0].selected = true;
      timeIn.options[0].selected = true;
      roomNumber.options[0].disabled = false;
      guests.options[0].disabled = false;
      roomNumber.options[0].selected = true;
      guests.options[0].selected = true;
      roomNumber.options[0].disabled = true;
      guests.options[0].disabled = true;
      typeSelect.options[0].selected = true;
      priceSelect.options[0].selected = true;
      roomSelect.options[0].selected = true;
      guestSelect.options[0].selected = true;

      var selectedFeatures = featureSelect.querySelectorAll('input[type = checkbox]:checked');
      selectedFeatures.forEach(function (it) {
        it.checked = false;
      });

      document.addEventListener('keydown', closeOnSuccess);
    }, window.showError);
    evt.preventDefault();
  });
})();
