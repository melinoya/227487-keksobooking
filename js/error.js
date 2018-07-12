'use strict';

(function () {
  var addHidden = function () {
    document.querySelector('.error-popup').classList.add('hidden');
  };

  window.showError = function (error) {
    document.querySelector('.error-popup').classList.remove('hidden');
    document.querySelector('.error-popup__fill').innerHTML = error;

    setTimeout(addHidden, 3000);
  };
})();
