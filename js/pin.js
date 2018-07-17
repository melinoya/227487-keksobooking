'use strict';

(function () {
  var pin = document.querySelector('.map__pin');
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
