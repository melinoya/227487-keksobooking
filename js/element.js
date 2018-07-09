'use strict';

(function () {
  var titlesList = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var typesList = ['palace', 'flat', 'house', 'bungalo'];
  var checkinsList = ['12:00', '13:00', '14:00'];
  var checkoutsList = ['12:00', '13:00', '14:00'];
  var featuresList = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var photosList = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];


  window.makeElement = function () {
    var adsList = [];
    for (var i = 0; i < 8; i++) {
      var coordinateX = window.randoms.createRandom(20, 1180);
      var coordinateY = window.randoms.createRandom(130, 630);
      var adElement = {
        author: {
          avatar: 'img/avatars/user0' + (i + 1) + '.png'
        },
        offer: {
          title: titlesList[i],
          address: coordinateX + ', ' + coordinateY,
          price: window.randoms.createRandom(1000, 1000000),
          type: typesList[window.randoms.createRandom(0, typesList.length - 1)],
          rooms: window.randoms.createRandom(1, 5),
          guests: window.randoms.createRandom(0, 3),
          checkin: checkinsList[window.randoms.createRandom(0, checkinsList.length - 1)],
          checkout: checkoutsList[window.randoms.createRandom(0, checkoutsList.length - 1)],
          features: window.randoms.randomArrQuantity(featuresList),
          description: '',
          photos: window.randoms.generateArr(photosList)
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
})();
