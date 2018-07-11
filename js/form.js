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
  var reset = document.querySelector('.ad-form__reset');
  var dependencePrice = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };
  var dependenceGuests = {
    1: [3],
    2: [2, 3],
    3: [1, 2, 3],
    100: [4]
  };

  var testedValue = function (select, value) {
    var options = select.options;
    for (var i = 0; i < options.length; i++) {
      if (options[i].value === value) {
        return i;
      }
    }
    return i;
  };

  housingTypeSelect.addEventListener('click', function () {
    var selected = housingTypeSelect.options[housingTypeSelect.selectedIndex].value;
    price.min = dependencePrice[selected];
    price.placeholder = dependencePrice[selected];
  });


  timeIn.addEventListener('click', function () {
    var selectedTime = timeIn.options[timeIn.selectedIndex].value;
    timeOut.options[testedValue(timeOut, selectedTime)].selected = true;
  });

  timeOut.addEventListener('click', function () {
    var selectedTime = timeOut.options[timeOut.selectedIndex].value;
    timeIn.options[testedValue(timeIn, selectedTime)].selected = true;
  });

  guests.setCustomValidity('Введено неверное количество гостей');
  roomNumber.addEventListener('click', function () {
    var selectedRoom = roomNumber.options[roomNumber.selectedIndex].value;
    for (var i = 0; i < 5; i++) {
      guests.options[i].disabled = true;
    }
    guests.setCustomValidity('');
    var selectedValues = dependenceGuests[selectedRoom];
    for (var j = 0; j < selectedValues.length; j++) {
      var k = selectedValues[j];
      guests.options[k].disabled = false;
    }
  });

  reset.addEventListener('click', function () {
    var pinClones = pinsPlace.querySelectorAll('.map__pin--clone');
    for (var i = 0; i < pinClones.length; i++) {
      pinClones[i].remove();
    }
    map.classList.add('map--faded');
    document.querySelector('.map__card').remove();
  });

  var showError = function (error) {
    document.querySelector('.error-popup').classList.remove('hidden');
    document.querySelector('.error-popup__fill').innerHTML = error;
  };

  var form = document.querySelector('.map__filters');

  form.addEventListener('submit', function (evt) {
    window.backend.save('https://js.dump.academy/keksobooking', new FormData(form), function () {
      map.classList.add('map--faded');
    }, showError);
    evt.preventDefault();
  });
})();
