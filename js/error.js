'use strict';

(function () {
  var errorWindow = document.querySelector('.error-popup');
  var addHidden = function () {
    errorWindow.classList.add('hidden');
  };

  window.showError = function (error) {
    errorWindow.classList.remove('hidden');
    errorWindow.querySelector('.error-popup__fill').innerHTML = error;

    setTimeout(addHidden, 3000);
  };
})();
