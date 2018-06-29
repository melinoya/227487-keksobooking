'use strict';

var titlesList = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var typesList = ['palace', 'flat', 'house', 'bungalo'];
var checkinsList = ['12:00', '13:00', '14:00'];
var checkoutsList = ['12:00', '13:00', '14:00'];
var featuresList = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photosList = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var random = function (min, max) {
  var randomNumber = Math.round(Math.random() * (max - min) + min);
  return randomNumber;
};

var cloneArr = function (copyArr, arr) {
  for (var k = 0; k < arr.length; k++) {
    copyArr[k] = arr[k];
  }
  return copyArr;
};

var makeElement = function () {
  var adsList = [];

  for (var i = 0; i < 8; i++) {
    var adElement = {};

    adElement.author = {};
    adElement.author.avatar = 'img/avatars/user0' + (i + 1) + '.png';

    adElement.offer = {};
    var elementOffer = adElement.offer;

    elementOffer.title = titlesList[i];

    elementOffer.address = random(1, 1000) + ', ' + random(1, 1000);

    elementOffer.price = random(1000, 1000000);

    elementOffer.type = typesList[random(0, typesList.length - 1)];

    elementOffer.rooms = random(1, 5);

    elementOffer.guests = random(0, 100);

    elementOffer.checkin = checkinsList[random(0, checkinsList.length - 1)];

    elementOffer.checkout = checkoutsList[random(0, checkoutsList.length - 1)];

    var featuresQuantity = random(1, featuresList.length);

    elementOffer.features = [];

    var featuresCopy = [];
    featuresCopy = cloneArr(featuresCopy, featuresList);

    for (var j = 0; j < featuresQuantity - 1; j++) {
      var randomFeature = random(0, featuresCopy.length - 1);
      elementOffer.features[j] = featuresCopy[randomFeature];
      featuresCopy.splice(randomFeature, 1);
    }

    elementOffer.description = '';

    elementOffer.photos = [];

    var photosListCopy = [];
    photosListCopy = cloneArr(photosListCopy, photosList);

    var photosQuantity = photosListCopy.length;

    for (var k = 0; k < photosQuantity; k++) {
      var randomPhoto = random(0, photosListCopy.length - 1);
      elementOffer.photos[k] = photosListCopy[randomPhoto];
      photosListCopy.splice(randomPhoto, 1);
    }

    adElement.location = {};
    adElement.location.x = random(20, document.body.clientWidth - 20);
    adElement.location.y = random(170, 630);

    adsList.push(adElement);
  }
  return adsList;
};
var newList = makeElement();

// ------------------------------ второе задание ----------------------------------

var map = document.querySelector('.map');
map.classList.remove('map--faded');

// ----------------------------- третье задание -------------------------------------
// var template = document.querySelector('template');
var pin = document.querySelector('.map__pin');
var createPin = function (locationX, locationY, avatar, title) {
  var pinClone = pin.cloneNode(true);

  pinClone.style = 'left: ' + (locationX - 25) + 'px; top: ' + (locationY - 70) + 'px;';

  var img = pinClone.querySelector('img');
  img.src = avatar;
  img.textContent = title;

  return pinClone;
};


// ------------------------------- четвертое задание ---------------------------------

var pinsPlace = document.querySelector('.map__pins');
var fragment = document.createDocumentFragment();

var makePins = function (arr) {
  for (var i = 0; i < arr.length; i++) {
    var newPin = createPin(arr[i].location.x, arr[i].location.y, arr[i].author.avatar, arr[i].offer.title);
    fragment.appendChild(newPin);
  }
  pinsPlace.appendChild(fragment);
};
makePins(newList);

// ------------------------------------ пятое задание ------------------------------------
var translation = {
  'flat': 'Квартира',
  'bungalo': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец'
};

var template = document.querySelector('template');
var card = template.content.querySelector('.map__card');

var fillPin = function (arr, key) {
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

var newCard = fillPin(newList, 0);
var mapContainer = map.querySelector('.map__filters-container');
map.insertBefore(newCard, mapContainer);
