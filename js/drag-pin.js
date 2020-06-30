'use strict';
(function () {
  // Здесь я создаю функционал для перетаскивания главного пина.
  var MapRestriction = {
    TOP: 130,
    BOTTOM: 630,
  };
  var PX_UNIT = 'px';
  var HALF_ELEMENT = 2;
  var START_ELEMENT = 0;
  var mainPin = document.querySelector('.map__pin--main');
  var MAP_WIDTH = document.querySelector('.map').offsetWidth;

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var HEIGHT_ADJUSTMENT = window.map.MainPinSize.HEIGHT + window.map.MainPinSize.TIP_HEIGHT;

    if (window.utils.isLeftMouseButtonClicked(evt.which)) {
      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY,
        };

        var pinY = mainPin.offsetTop - shift.y;
        var pinX = mainPin.offsetLeft - shift.x;

        if (pinY >= MapRestriction.TOP - HEIGHT_ADJUSTMENT && pinY <= MapRestriction.BOTTOM - HEIGHT_ADJUSTMENT &&
          pinX < MAP_WIDTH - window.map.MainPinSize.WIDTH / HALF_ELEMENT && pinX > START_ELEMENT - window.map.MainPinSize.WIDTH / HALF_ELEMENT) {
          mainPin.style.top = pinY + PX_UNIT;
          mainPin.style.left = pinX + PX_UNIT;
        }
        window.map.enableAddressInput();
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);

        
    window.map.activate();    
    window.map.enableAddressInput();
      };

      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    }
  });
})();
