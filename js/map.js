'use strict';
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
var newList = window.makeElement();

var makePins = function (arr) {
  for (var i = 0; i < arr.length; i++) {
    var newPin = window.createPin(arr[i]);
    fragment.appendChild(newPin);
  }
  pinsPlace.appendChild(fragment);
};

var calcAddressValue = function (height) {
  var addressValue = parseInt(mainPin.style.left, 10) + (PIN_WIDTH * 2) + ', ' + (parseInt(mainPin.style.top, 10) + height);
  return addressValue;
};

addressInput.value = calcAddressValue((PIN_HEIGHT / 2));


mainPin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoord = {
    x: parseInt(mainPin.style.left, 10) + PIN_WIDTH,
    y: parseInt(mainPin.style.top, 10) + (PIN_HEIGHT / 2)
  };

  addressInput.value = calcAddressValue((PIN_HEIGHT + PIN_TAIL));

  var onMouseMove = function (evtMove) {
    evtMove.preventDefault();

    var shift = {
      x: startCoord.x - evtMove.clientX,
      y: startCoord.y - evtMove.clientY
    };

    startCoord = {
      x: evtMove.clientX,
      y: evtMove.clientY
    };

    mainPin.style.left = parseInt(mainPin.style.left, 10) - shift.x + 'px';
    mainPin.style.top = parseInt(mainPin.style.top, 10) - shift.y + 'px';
    addressInput.value = calcAddressValue((PIN_HEIGHT + PIN_TAIL));

    if (parseInt(mainPin.style.left, 10) < MIN_X) {
      mainPin.style.left = MIN_X + 'px';
    } else if (parseInt(mainPin.style.left, 10) > MAX_X) {
      mainPin.style.left = MAX_X + 'px';
    }

    if (parseInt(mainPin.style.top, 10) < MIN_Y) {
      mainPin.style.top = MIN_Y + 'px';
    } else if (parseInt(mainPin.style.top, 10) > MAX_Y) {
      mainPin.style.top = MAX_Y + 'px';
    }

  };

  var onMouseUp = function (evtUp) {
    evtUp.preventDefault();

    addressInput.value = calcAddressValue((PIN_HEIGHT + PIN_TAIL));

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

mainPin.addEventListener('click', function () {
  map.classList.remove('map--faded');
  makePins(newList);
  adForm.classList.remove('ad-form--disabled');
});

pinsPlace.addEventListener('click', function (evt) {
  if (evt.target.classList.contains('map__pin--clone')) {
    var newCard = window.fillPin(newList, 0);
    map.insertBefore(newCard, mapContainer);
  }
});
