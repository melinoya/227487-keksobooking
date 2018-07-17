'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var DEBOUNCE_TIME = 500;

  window.util = {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },

    debounce: function (action) {
      var lastTimeout = null;

      return function () {
        var args = arguments;
        if (lastTimeout) {
          window.clearTimeout(lastTimeout);
        }
        lastTimeout = window.setTimeout(function () {
          action.apply(null, args);
        }, DEBOUNCE_TIME);
      };
    }
  };
})();
