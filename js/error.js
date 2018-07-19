'use strict';

(function () {
  var errorWindow = document.querySelector('.error-popup');
  var errorText = errorWindow.querySelector('.error-popup__fill');
  var addHidden = function () {
    errorWindow.classList.add('hidden');
  };

  window.showError = function (error) {
    errorWindow.classList.remove('hidden');
    errorText.innerHTML = error;

    setTimeout(addHidden, 3000);
  };
})();
