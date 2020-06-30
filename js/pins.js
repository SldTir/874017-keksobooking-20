'use strict';
(function () {
  // Здесь я созда метки на карте
  var PinSize = {
    WIDTH: 50,
    HEIGHT: 70,
  };

  var Length = {
    MIN: 0,
    MAX: 5,
  };

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var map = document.querySelector('.map');
  var mapPinsElement = document.querySelector('.map__pins');

  var createPin = function (x, y, src, alt) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.setAttribute('style', 'left: ' + x + 'px;' + ' top: ' + y + 'px;');
    pinElement.querySelector('img').src = src;
    pinElement.querySelector('img').alt = alt;

    return pinElement;
  };

  var createPins = function (offers) {
    var fragment = document.createDocumentFragment();
    offers.slice(Length.MIN, Length.MAX).forEach(function (offer) {
      var x = offer.location.x - PinSize.WIDTH / 2;
      var y = offer.location.y - PinSize.HEIGHT;
      var src = offer.author.avatar;
      var alt = offer.offer.title;
      var pin = createPin(x, y, src, alt);
      fragment.appendChild(pin);
      pin.addEventListener('click', function () {
        var currentCard = document.querySelector('.popup');
        var pinActive = mapPinsElement.querySelector('.map__pin--active');
        if (currentCard) {
          currentCard.remove();
          pinActive.classList.remove('map__pin--active');
        }
        pin.classList.add('map__pin--active');
        var card = window.card.create(offer);
        map.appendChild(card);
      });
    });
    return fragment;
  };

  var removePins = function () {
    var pins = document.querySelectorAll('.map__pin' + '[type="button"]');
    pins.forEach(function (pin) {
      pin.remove();
    });
    if (map.querySelector('.popup')) {
      map.querySelector('.popup').remove();
    }
  };

  var renderPins = function (offers) {
    removePins();
    var pinsFragment = createPins(offers);
    mapPinsElement.appendChild(pinsFragment);
  };

  window.successHandler = function (offers) {
    var filteredOffers = offers.filter(function (offer) {
      return 'offer' in offer;
    });
    window.offers = filteredOffers;
    renderPins(window.offers);
  };

  window.pins = {
    render: renderPins,
    remove: removePins,
  };
})();
