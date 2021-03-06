'use strict';

(function () {
  var PRICE = {
    MIN: 10000,
    MAX: 50000
  };
  var type = document.querySelector('#housing-type');
  var price = document.querySelector('#housing-price');
  var room = document.querySelector('#housing-rooms');
  var guest = document.querySelector('#housing-guests');
  var feature = document.querySelector('#housing-features');

  var pinsData = [];

  var checkSelect = function () {
    if (type.options[type.selectedIndex].value !== 'any') {
      pinsData = pinsData.filter(function (pin) {
        return pin.offer.type === type.options[type.selectedIndex].value;
      });
    }

    if (room.options[room.selectedIndex].value !== 'any') {
      pinsData = pinsData.filter(function (pin) {
        return pin.offer.rooms.toString() === room.options[room.selectedIndex].value;
      });
    }

    if (guest.options[guest.selectedIndex].value !== 'any') {
      pinsData = pinsData.filter(function (pin) {
        return pin.offer.guests.toString() === guest.options[guest.selectedIndex].value;
      });
    }

    return pinsData;
  };

  var checkPrice = function () {
    pinsData = pinsData.filter(function (pin) {
      switch (price.options[price.selectedIndex].value) {
        case 'low':
          return pin.offer.price < PRICE.MIN;
        case 'middle':
          return pin.offer.price >= PRICE.MIN && pin.offer.price <= PRICE.MAX;
        case 'high':
          return pin.offer.price > PRICE.MAX;
        case 'any':
          return pinsData;
      }
      return pinsData;
    });
  };

  var checkFilters = function () {
    var featureFilters = feature.querySelectorAll('input[type = checkbox]:checked');
    if (featureFilters.length !== 0) {
      featureFilters.forEach(function (item) {
        pinsData = pinsData.filter(function (pin) {
          return pin.offer.features.indexOf(item.value) >= 0;
        });
      });
    }
  };

  var updatePins = function (arr) {
    var pinInfo = document.querySelector('.map__card');
    if (pinInfo) {
      pinInfo.remove();
    }

    pinsData = arr.slice();

    checkSelect();
    checkPrice();
    checkFilters();

    window.makePins(pinsData);
  };
  window.updatePins = window.util.debounce(updatePins);
})();
