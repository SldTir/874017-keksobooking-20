'use strict';
(function () {
  var TIMEOUT = 500;
  var SEPARATOR = 'housing-';
  var DEFAULT_VALUE = 'any';
  var FEATURES = 'features';
  var Price = {
    MIN: 10000,
    MAX: 50000,
  };

  var priceComparer = {
    low: function (price) {
      return price < Price.MIN;
    },
    middle: function (price) {
      return price >= Price.MIN && price <= Price.MAX;
    },
    high: function (price) {
      return price > Price.MAX;
    }
  };

  var form = document.querySelector('.map__filters');

  var filter = {
    type: DEFAULT_VALUE,
    price: DEFAULT_VALUE,
    rooms: DEFAULT_VALUE,
    guests: DEFAULT_VALUE,
    features: []
  };

  var filterType = function (offerType) {
    if (filter.type === DEFAULT_VALUE) {
      return true;
    }
    return offerType === filter.type;
  };

  var getValue = function (offerValue, filterValue) {
    if (filterValue === DEFAULT_VALUE) {
      return true;
    }
    return +offerValue === +filterValue;
  };

  var lastTimeout;
  form.addEventListener('change', function (evt) {
    var target = evt.target;
    var value = target.value;
    var name = target.name;
    if (name === FEATURES) {
      if (filter.features.includes(value)) {
        filter.features = filter.features.filter(function (feature) {
          return feature !== value;
        });
      } else {
        filter.features.push(value);
      }
    }
    filter[name.split(SEPARATOR)[1]] = value;
    var filteredOffers = filterOffers(window.offers);
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      window.pins.render(filteredOffers);
    }, TIMEOUT);
  });

  var filterByFeatures = function (offersFeatures) {
    if (filter.features.length === 0) {
      return true;
    }
    if (offersFeatures.length === 0) {
      return false;
    }
    return filter.features.every(function (value) {
      return (offersFeatures.indexOf(value) >= 0);
    });
  };

  var filterByPrice = function (price) {
    if (filter.price === DEFAULT_VALUE) {
      return true;
    }
    return priceComparer[filter.price](price);
  };

  var filterOffers = function (offers) {
    var filteredOffers = offers.filter(function (offer) {
      var isValidByType = filterType(offer.offer.type);
      if (!isValidByType) {
        return false;
      }
      var isValidByPrices = filterByPrice(offer.offer.price);
      if (!isValidByPrices) {
        return false;
      }
      var isValidByRooms = getValue(offer.offer.rooms, filter.rooms);
      if (!isValidByRooms) {
        return false;
      }
      var isValidByGuests = getValue(offer.offer.guests, filter.guests);
      if (!isValidByGuests) {
        return false;
      }
      var isValidByFeatures = filterByFeatures(offer.offer.features, filter.features);
      if (!isValidByFeatures) {
        return false;
      }
      return offer;
    });
    return filteredOffers;
  };
  window.filter = {
    get: filter
  };
})();
