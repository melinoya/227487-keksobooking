'use strict';

(function () {
  window.randoms = {
    // ------- Вычисление рандомного числа -------
    createRandom: function (min, max) {
      var randomNumber = Math.round(Math.random() * (max - min) + min);
      return randomNumber;
    },

    // ------ Создание нового массива ----------
    generateArr: function (arr) {
      var copy = arr.slice(0);
      var newArr = [];
      for (var j = 0; j < arr.length; j++) {
        var randomNum = this.createRandom(0, copy.length - 1);
        newArr[j] = copy[randomNum];
        copy.splice(randomNum, 1);
      }
      return newArr;
    }
  };
})();
