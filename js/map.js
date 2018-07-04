'use strict';

var titlesList = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var typesList = ['palace', 'flat', 'house', 'bungalo'];
var checkinsList = ['12:00', '13:00', '14:00'];
var checkoutsList = ['12:00', '13:00', '14:00'];
var featuresList = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photosList = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];


var createRandom = function (min, max) {
  var randomNumber = Math.round(Math.random() * (max - min) + min);
  return randomNumber;
};

var generateArr = function (arr) {
  var copy = arr.slice(0);
  var newArr = [];

  for (var j = 0; j < arr.length; j++) {
    var randomNum = createRandom(0, copy.length - 1);
    newArr[j] = copy[randomNum];
    copy.splice(randomNum, 1);
  }
  return newArr;
};

var randomArrQuantity = function (arr) {
  var newArr = generateArr(arr).slice(0, createRandom(1, arr.length));
  return newArr;
};

var makeElement = function () {
  var adsList = [];

  for (var i = 0; i < 8; i++) {
    var coordinateX = createRandom(300, 900);
    var coordinateY = createRandom(170, 630);
    var adElement = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        title: titlesList[i],
        address: coordinateX + ', ' + coordinateY,
        price: createRandom(1000, 1000000),
        type: typesList[createRandom(0, typesList.length - 1)],
        rooms: createRandom(1, 5),
        guests: createRandom(0, 3),
        checkin: checkinsList[createRandom(0, checkinsList.length - 1)],
        checkout: checkoutsList[createRandom(0, checkoutsList.length - 1)],
        features: randomArrQuantity(featuresList),
        description: '',
        photos: generateArr(photosList)
      },
      location: {
        x: coordinateX,
        y: coordinateY
      }
    };
    adsList.push(adElement);
  }
  return adsList;
};


var newList = makeElement();

var pin = document.querySelector('.map__pin');

var createPin = function (arr) {
  var pinClone = pin.cloneNode(true);

  pinClone.style = 'left: ' + (arr.location.x - 25) + 'px; top: ' + (arr.location.y - 70) + 'px;';

  var img = pinClone.querySelector('img');
  img.src = arr.author.avatar;
  img.textContent = arr.offer.title;
  pinClone.classList.add('map__pin--clone');
  img.classList.add('map__pin--clone');

  return pinClone;
};


var pinsPlace = document.querySelector('.map__pins');
var fragment = document.createDocumentFragment();

var makePins = function (arr) {
  for (var i = 0; i < arr.length; i++) {
    var newPin = createPin(arr[i]);
    fragment.appendChild(newPin);
  }
  pinsPlace.appendChild(fragment);
};

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

// ---------------------- module4-task1 ---------------------------
var map = document.querySelector('.map');
var mapContainer = map.querySelector('.map__filters-container');
var mainPin = map.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var addressInput = document.querySelector('#address');
var PIN_WIDTH = 65;
var PIN_HEIGHT = 65;
var PIN_TAIL = 22;

addressInput.value = '' + (parseInt(mainPin.style.left, 10) + (PIN_WIDTH / 2)) + ', ' + (parseInt(mainPin.style.top, 10) + (PIN_HEIGHT / 2));

mainPin.addEventListener('mouseup', function () {
  map.classList.remove('map--faded');
  makePins(newList);
  adForm.classList.remove('ad-form--disabled');
  var coordX = parseInt(mainPin.style.left, 10) + (PIN_WIDTH / 2);
  var coordY = parseInt(mainPin.style.top, 10) + PIN_HEIGHT + PIN_TAIL;
  addressInput.value = '' + coordX + ', ' + coordY;
});

pinsPlace.addEventListener('click', function (evt) {
  if (evt.target.classList.contains('map__pin--clone')) {
    var newCard = fillPin(newList, 0);
    map.insertBefore(newCard, mapContainer);
  }
});

// ------------------------- module4-task2 ----------------------------------
var price = document.querySelector('#price');
var housingTypeSelect = document.querySelector('#type');
var dependencePrice = {
  'bungalo': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000
};
var timeIn = document.querySelector('#timein');
var timeOut = document.querySelector('#timeout');
var roomNumber = document.querySelector('#room_number');
var guests = document.querySelector('#capacity');
var reset = document.querySelector('.ad-form__reset');
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
