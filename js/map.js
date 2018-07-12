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

  var makePins = function (arr) {
    for (var i = 0; i < arr.length; i++) {
      var newPin = window.createPin(arr[i]);
      fragment.appendChild(newPin);
    }
    pinsPlace.appendChild(fragment);
  };

  var setBorders = function (min, max, current) {
    if (current < min) {
      var value = min + 'px';
    } else if (current > max) {
      value = max + 'px';
    }
    return value;
  };

  var calcAddressValue = function (height) {
    var addressValue = parseInt(mainPin.style.left, 10) + ', ' + (parseInt(mainPin.style.top, 10) + height);
    return addressValue;
  };

  addressInput.value = calcAddressValue(PIN_HEIGHT / 2);


  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoord = {
      x: parseInt(mainPin.style.left, 10) + (PIN_WIDTH / 2),
      y: parseInt(mainPin.style.top, 10) + (PIN_HEIGHT / 2)
    };

    addressInput.value = calcAddressValue(PIN_HEIGHT + PIN_TAIL);

    var onMouseMove = function (evtMove) {
      evtMove.preventDefault();

      var shift = {
        x: startCoord.x - (evtMove.clientX - map.offsetLeft),
        y: startCoord.y - evtMove.clientY
      };

      startCoord = {
        x: evtMove.clientX - map.offsetLeft,
        y: evtMove.clientY
      };

      mainPin.style.left = parseInt(mainPin.style.left, 10) - shift.x + 'px';
      mainPin.style.top = parseInt(mainPin.style.top, 10) - shift.y + 'px';
      addressInput.value = calcAddressValue(PIN_HEIGHT + PIN_TAIL);

      mainPin.style.left = setBorders(MIN_X, MAX_X, parseInt(mainPin.style.left, 10));

      mainPin.style.top = setBorders(MIN_Y, MAX_Y, parseInt(mainPin.style.top, 10));
    };

    var onMouseUp = function (evtUp) {
      evtUp.preventDefault();

      addressInput.value = calcAddressValue(PIN_HEIGHT + PIN_TAIL);

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  mainPin.addEventListener('click', function () {
    window.backend.load('https://js.dump.academy/keksobooking/data', makePins, window.showError);
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
  });


  var onRequestCard = function (arr) {
    var newCard = window.fillPin(arr);
    var close = newCard.querySelector('.popup__close');
    map.insertBefore(newCard, mapContainer);

    var cardHere = map.querySelector('.map__card');
    if (map.querySelectorAll('.map__card').length > 1) {
      cardHere.remove();
    }
    close.addEventListener('click', function () {
      cardHere.remove();
    });
  };

  pinsPlace.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('map__pin--clone')) {
      window.backend.load('https://js.dump.academy/keksobooking/data', onRequestCard, window.showError);
    }
  });
})();
