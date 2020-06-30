'use strict';
(function () {
  // Здесь я делаю валидацию.
  var SRC_DEFAULT = 'img/muffin-grey.svg';
  var LENGTH = 0;
  var Price = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000,
  };

  var RoomCount = {
    ONE: '1',
    TWO: '2',
    THREE: '3',
    HUNDRED: '100',
  };

  var FILTER_VALUE = 'any';
  var adForm = document.querySelector('.ad-form');
  var titleInput = adForm.querySelector('#title');
  var priceInput = adForm.querySelector('#price');
  var typeSelect = adForm.querySelector('#type');
  var timeinInput = adForm.querySelector('#timein');
  var timeoutInput = adForm.querySelector('#timeout');
  var roomsElementInput = adForm.querySelector('#room_number');
  var capacityInput = adForm.querySelector('#capacity');
  var description = adForm.querySelector('#description');
  var checkboxes = document.querySelectorAll('[type="checkbox"]');
  var mapFilters = document.querySelector('.map__filters').querySelectorAll('select');
  var inputAvatar = document.querySelector('#avatar');
  var formPreview = document.querySelector('.ad-form-header__preview').querySelector('img');
  var inputPhoto = document.querySelector('.ad-form__upload').querySelector('input');
  var formPhoto = document.querySelector('.ad-form__photo');
  var photoContainer = document.querySelector('.ad-form__photo-container');

  titleInput.addEventListener('invalid', function () {
    titleInput.setAttribute('style', 'border: 2px solid red');
  });

  priceInput.addEventListener('invalid', function () {
    priceInput.setAttribute('style', 'border: 2px solid red');
  });

  var validateRoomCapacity = function (room) {
    var value = room;
    if (+room === +RoomCount.HUNDRED) {
      value = 0;
    }
    var capacityOptions = Array.from(capacityInput.children);
    var notForGuests = capacityOptions.find(function (option) {
      return +option.value === 0;
    });

    capacityOptions.forEach(function (option) {
      if (+value < +option.value) {
        option.setAttribute('disabled', '');
      } else {
        option.removeAttribute('disabled', '');
      }
    });

    notForGuests.setAttribute('disabled', '');
    if (value === 0) {
      notForGuests.removeAttribute('disabled', '');
    }
  };

  validateRoomCapacity(capacityInput.querySelector('[value="1"]').value);

  roomsElementInput.addEventListener('change', function (evt) {
    var target = evt.target;
    var value = target.value;
    if (value !== RoomCount.HUNDRED) {
      capacityInput.value = value;
    } else {
      capacityInput.value = capacityInput.querySelector('[value="0"]').value;
    }
    validateRoomCapacity(value);
  });

  capacityInput.value = capacityInput.querySelector('[value="1"]').value;

  timeinInput.addEventListener('change', function (evt) {
    timeoutInput.value = evt.target.value;
  });

  timeoutInput.addEventListener('change', function (evt) {
    timeinInput.value = evt.target.value;
  });

  typeSelect.addEventListener('change', function () {
    var value = typeSelect.value;
    var price = Price[value.toUpperCase()];
    priceInput.setAttribute('min', price);
    priceInput.setAttribute('placeholder', price);
  });

  var removeContainerImg = function ()  {
    var containersImg = photoContainer.querySelectorAll('.ad-form__photo');
    containersImg.forEach(function (element) {
      element.remove();
    });
    var templateImage = document.createElement('div');
    templateImage.setAttribute('class', 'ad-form__photo');
    photoContainer.appendChild(templateImage);
  }
  
  var selectOption = typeSelect.querySelector('[selected]');
  priceInput.setAttribute('min', Price[selectOption.value.toUpperCase()]);
  priceInput.setAttribute('placeholder', Price[selectOption.value.toUpperCase()]);

  var resetForm = function () {
    window.pins.render(window.offers);
    typeSelect.value = selectOption.value;
    priceInput.value = '';
    priceInput.placeholder = Price[selectOption.value.toUpperCase()];
    titleInput.value = '';
    timeinInput.value = timeinInput.querySelector('[selected]').value;
    timeoutInput.value = timeoutInput.querySelector('[selected]').value;
    roomsElementInput.value = roomsElementInput.querySelector('[selected]').value;
    capacityInput.value = roomsElementInput.querySelector('[selected]').value;
    description.value = '';
    window.map.disableAddressInput();
    window.filter.get.features.length = LENGTH;
    checkboxes.forEach(function (elementCheckbox) {
      elementCheckbox.checked = false;
    });
    mapFilters.forEach(function (elementFilter) {
      elementFilter.value = FILTER_VALUE;
    });
    inputAvatar.value = '';
    formPreview.src = SRC_DEFAULT;
    inputPhoto.value = '';
    formPhoto.innerHTML = '';
    titleInput.removeAttribute('style');
    priceInput.removeAttribute('style');
    validateRoomCapacity(capacityInput.querySelector('[value="1"]').value);
    removeContainerImg();
  };

  window.form = {
    configures: resetForm
  };
})();

