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

  window.fillPin = function (arr, key) {
    var cardCopy = card.cloneNode(true);
    cardCopy.querySelector('.popup__title').textContent = arr[key].offer.title;
    cardCopy.querySelector('.popup__text--address').textContent = arr[key].offer.address;
    cardCopy.querySelector('.popup__text--price').textContent = '' + arr[key].offer.price + '₽/ночь';
    cardCopy.querySelector('.popup__type').textContent = translation[arr[key].offer.type];
    cardCopy.querySelector('.popup__text--capacity').textContent = '' + arr[key].offer.rooms + ' комнаты для ' + arr[key].offer.guests + ' гостей';
    cardCopy.querySelector('.popup__text--time').textContent = 'Заезд после ' + arr[key].offer.checkin + ', выезд до ' + arr[key].offer.checkout;
    cardCopy.querySelector('.popup__features').textContent = arr[key].offer.features;
    cardCopy.querySelector('.popup__description').textContent = arr[key].offer.description;

    for (var i = 0; i < arr[key].offer.photos.length; i++) {
      var imgHousing = card.querySelector('.popup__photo');
      var copyImg = imgHousing.cloneNode();
      copyImg.src = arr[key].offer.photos[i];

      fragment.appendChild(copyImg);
      cardCopy.querySelector('.popup__photos').appendChild(fragment);
    }
    var imgDelete = cardCopy.querySelector('.popup__photo');
    cardCopy.querySelector('.popup__photos').removeChild(imgDelete);
    cardCopy.querySelector('.popup__avatar').src = arr[key].author.avatar;
    return cardCopy;
  };
})();
