'use strict';
(function () {
  // Здесь я создаю объявления на карте
  var Type = {
    FLAT: 'Квартира',
    BUNGALO: 'Бунгало',
    HOUSE: 'Дом',
    PALACE: 'Дворец'
  };

  var map = document.querySelector('.map');
  var cardTemplate = document.querySelector('#card').content.querySelector('.popup');

  var createCard = function (offer) {
    var cardElement = cardTemplate.cloneNode(true);
    var popupAvatar = cardElement.querySelector('.popup__avatar');
    var popupTitle = cardElement.querySelector('.popup__title');
    var popupAddress = cardElement.querySelector('.popup__text--address');
    var popupPrice = cardElement.querySelector('.popup__text--price');
    var popupType = cardElement.querySelector('.popup__type');
    var popupCapacity = cardElement.querySelector('.popup__text--capacity');
    var popupTime = cardElement.querySelector('.popup__text--time');
    var popupFeatures = cardElement.querySelector('.popup__features');
    var popupDescription = cardElement.querySelector('.popup__description');
    var popupPhotos = cardElement.querySelector('.popup__photos');
    var popupClose = cardElement.querySelector('.popup__close');

    popupAvatar.src = offer.author.avatar;
    popupTitle.textContent = offer.offer.title;
    popupAddress.textContent = offer.offer.address;
    popupPrice.textContent = offer.offer.price + '₽/ночь';
    popupType.textContent = Type[offer.offer.type.toUpperCase()];
    popupCapacity.textContent = offer.offer.rooms + ' комнаты для ' + offer.offer.guests + ' гостей';
    popupTime.textContent = 'Заезд после ' + offer.offer.checkin + ',' + ' выезд до ' + offer.offer.checkout;
    if (offer.offer.features.length === 0) {
      popupFeatures.remove();
    }
    popupFeatures.innerHTML = '';

    offer.offer.features.forEach(function (element) {
      var liClone = document.createElement('li');
      liClone.setAttribute('class', 'popup__feature popup__feature--' + element);
      liClone.textContent = element;
      popupFeatures.appendChild(liClone);
    });

    popupDescription.textContent = offer.offer.description;

    if (offer.offer.photos.length === 0) {
      popupPhotos.remove();
    }
    offer.offer.photos.forEach(function (photo) {
      var photoNode = popupPhotos.querySelector('img').cloneNode(true);
      popupPhotos.appendChild(photoNode);
      photoNode.src = photo;
    });
    popupPhotos.querySelector('img:first-child').remove();

    var onEscKeyDown = function (evt) {
      if (window.utils.isEscPressed(evt.key)) {
        removeCard();
      }
    };

    var removeCard = function () {
      cardElement.remove();
      var active = map.querySelector('.map__pin--active');
      if (active) {
        active.classList.remove('map__pin--active');
      }
      document.removeEventListener('keydown', onEscKeyDown);
    };

    popupClose.addEventListener('click', function () {
      removeCard();
    });

    popupClose.addEventListener('keydown', function (evt) {
      if (window.utils.isEnterPressed(evt.key)) {
        removeCard();
      }
    });

    popupClose.addEventListener('click', function () {
      removeCard();
    });

    document.addEventListener('keydown', onEscKeyDown);

    return cardElement;
  };

  window.card = {
    create: createCard
  };
})();
