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
    var photos = cardCopy.querySelector('.popup__photos');
    cardCopy.querySelector('.popup__title').textContent = arr.offer.title;
    cardCopy.querySelector('.popup__text--address').textContent = arr.offer.address;
    cardCopy.querySelector('.popup__text--price').textContent = '' + arr.offer.price + '₽/ночь';
    cardCopy.querySelector('.popup__type').textContent = translation[arr.offer.type];
    cardCopy.querySelector('.popup__text--capacity').textContent = '' + arr.offer.rooms + ' комнаты для ' + arr.offer.guests + ' гостей';
    cardCopy.querySelector('.popup__text--time').textContent = 'Заезд после ' + arr.offer.checkin + ', выезд до ' + arr.offer.checkout;
    cardCopy.querySelector('.popup__features').textContent = arr.offer.features;
    cardCopy.querySelector('.popup__description').textContent = arr.offer.description;

    var imgHousing = card.querySelector('.popup__photo');

    arr.offer.photos.forEach(function (it) {
      var copyImg = imgHousing.cloneNode();
      copyImg.src = it;
      fragment.appendChild(copyImg);
    });

    photos.appendChild(fragment);
    var imgDelete = cardCopy.querySelector('.popup__photo');
    photos.removeChild(imgDelete);
    cardCopy.querySelector('.popup__avatar').src = arr.author.avatar;
    return cardCopy;
  };
})();
