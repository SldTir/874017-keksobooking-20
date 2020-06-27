'use strict';
(function () {
  var Key = {
    ENTER: 'Enter',
    ESCAPE: 'Escape'
  };

  var LEFT_MOUSE_BUTTON = 1;

  var isEscPressed = function (key) {
    return key === Key.ESCAPE;
  };

  var isEnterPressed = function (key) {
    return key === Key.ENTER;
  };

  var isLeftMouseButtonClicked = function (which) {
    return which === LEFT_MOUSE_BUTTON;
  };

  window.utils = {
    isEscPressed: isEscPressed,
    isEnterPressed: isEnterPressed,
    isLeftMouseButtonClicked: isLeftMouseButtonClicked,
  };
})();
