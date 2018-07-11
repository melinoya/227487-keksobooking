'use strict';

(function () {
  window.showError = function (error) {
    document.querySelector('.error-popup').classList.remove('hidden');
    document.querySelector('.error-popup__fill').innerHTML = error;
  };
})();
