'use strict';

(function () {
  var template = document.querySelector('template');
  var pin = template.content.querySelector('.map__pin');

  // ----- Создание метки на карте (шаблон) -------
  window.createPin = function (arr) {
    var pinClone = pin.cloneNode(true);
    pinClone.style = 'left: ' + (arr.location.x - 25) + 'px; top: ' + (arr.location.y - 70) + 'px;';
    var img = pinClone.querySelector('img');
    img.src = arr.author.avatar;
    img.textContent = arr.offer.title;
    pinClone.classList.add('map__pin--clone');
    img.classList.add('map__pin-img--clone');
    return pinClone;
  };
})();
