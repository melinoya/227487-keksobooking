'use strict';

(function () {
  var template = document.querySelector('template');
  var card = template.content.querySelector('.map__card');
  var fragment = document.createDocumentFragment();
  var translation = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец'
  };

  window.fillPin = function (arr) {
    var cardCopy = card.cloneNode(true);
    cardCopy.querySelector('.popup__title').textContent = arr[0].offer.title;
    cardCopy.querySelector('.popup__text--address').textContent = arr[0].offer.address;
    cardCopy.querySelector('.popup__text--price').textContent = '' + arr[0].offer.price + '₽/ночь';
    cardCopy.querySelector('.popup__type').textContent = translation[arr[0].offer.type];
    cardCopy.querySelector('.popup__text--capacity').textContent = '' + arr[0].offer.rooms + ' комнаты для ' + arr[0].offer.guests + ' гостей';
    cardCopy.querySelector('.popup__text--time').textContent = 'Заезд после ' + arr[0].offer.checkin + ', выезд до ' + arr[0].offer.checkout;
    cardCopy.querySelector('.popup__features').textContent = arr[0].offer.features;
    cardCopy.querySelector('.popup__description').textContent = arr[0].offer.description;

    for (var i = 0; i < arr[0].offer.photos.length; i++) {
      var imgHousing = card.querySelector('.popup__photo');
      var copyImg = imgHousing.cloneNode();
      copyImg.src = arr[0].offer.photos[i];

      fragment.appendChild(copyImg);
      cardCopy.querySelector('.popup__photos').appendChild(fragment);
    }
    var imgDelete = cardCopy.querySelector('.popup__photo');
    cardCopy.querySelector('.popup__photos').removeChild(imgDelete);
    cardCopy.querySelector('.popup__avatar').src = arr[0].author.avatar;
    return cardCopy;
  };
})();
