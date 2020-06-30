'use strict';
(function () {
  // Здесь я управля картой.
  var MainPinSize = {
    WIDTH: 65,
    HEIGHT: 65,
    TIP_HEIGHT: 22,
  };

  var adForm = document.querySelector('.ad-form');
  var buttonPublish = adForm.querySelector('.ad-form__submit');
  var descriptionTextarea = adForm.querySelector('#description');
  var mapFiltersElement = document.querySelector('.map__filters');
  var map = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');
  var adFormInputs = adForm.querySelectorAll('input');
  var adFormSelects = adForm.querySelectorAll('select');
  var featureInputs = adForm.querySelector('.features').querySelectorAll('input');
  var addressInput = adForm.querySelector('#address');
  var buttonReset = adForm.querySelector('.ad-form__reset');
  var PIN_LOCATION_X = parseInt(mapPinMain.style.left, 10);
  var PIN_LOCATION_Y = parseInt(mapPinMain.style.top, 10);

  var disableAddressInput = function () {
    mapPinMain.style.left = PIN_LOCATION_X + 'px';
    mapPinMain.style.top = PIN_LOCATION_Y + 'px';
    var left = PIN_LOCATION_X + MainPinSize.WIDTH / 2;
    var top = PIN_LOCATION_Y + MainPinSize.HEIGHT / 2;
    addressInput.setAttribute('value', Math.floor(left) + ', ' + Math.floor(top));
  };

  disableAddressInput();

  var disableNameField = function (inputs) {
    Array.from(inputs).forEach(function (input) {
      input.setAttribute('disabled', '');
    });
  };

  var enableNameFields = function (inputs) {
    Array.from(inputs).forEach(function (input) {
      input.removeAttribute('disabled');
    });
  };

  var enableAddressInput = function () {
    var left = parseInt(mapPinMain.style.left, 10) + MainPinSize.WIDTH / 2;
    var top = parseInt(mapPinMain.style.top, 10) + (MainPinSize.HEIGHT + MainPinSize.TIP_HEIGHT);
    addressInput.setAttribute('value', Math.floor(left) + ', ' + Math.floor(top));
    addressInput.setAttribute('readonly', '');
  };

  var disableMap = function () {
    disableNameField(adFormInputs);
    disableNameField(adFormSelects);
    disableNameField(mapFiltersElement);
    disableNameField(featureInputs);
    mapFiltersElement.classList.add('map__filters--disabled');
    adForm.classList.add('ad-form--disabled');
    buttonReset.setAttribute('disabled', '');
    buttonPublish.setAttribute('disabled', '');
    descriptionTextarea.setAttribute('disabled', '');
    adForm.classList.add('ad-form--disabled');
    mapFiltersElement.setAttribute('disabled', '');
    map.classList.add('map--faded');
    window.backend.load(window.successHandler, window.serverResponse.onError);
    disableAddressInput();
    window.pins.remove();
  };

  disableMap();

  var activateMap = function () {
    adForm.classList.remove('ad-form--disabled');
    enableNameFields(adFormInputs);
    enableNameFields(adFormSelects);
    enableNameFields(mapFiltersElement);
    enableNameFields(featureInputs);
    mapFiltersElement.classList.remove('map__filters--disabled');
    adForm.classList.remove('ad-form--disabled');
    buttonReset.removeAttribute('disabled', '');
    buttonPublish.removeAttribute('disabled', '');
    descriptionTextarea.removeAttribute('disabled', '');
    mapFiltersElement.removeAttribute('disabled', '');
    map.classList.remove('map--faded');
    window.pins.render(window.offers);
  };

  mapPinMain.addEventListener('keydown', function (evt) {
    if (window.utils.isEnterPressed(evt.key)) {
      activateMap();
      enableAddressInput();
    }
  });

  buttonReset.addEventListener('click', function (evtReset) {
    evtReset.preventDefault();
    window.form.configures();
    disableMap();
  });

  adForm.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(adForm), function () {
      window.serverResponse.onSuccess();
      disableMap();
    }, window.serverResponse.onError);
    evt.preventDefault();
    window.form.configures();
  });

  window.map = {
    activate: activateMap,
    enableAddressInput: enableAddressInput,
    MainPinSize: MainPinSize,
    disableAddressInput: disableAddressInput,
  };
})();
