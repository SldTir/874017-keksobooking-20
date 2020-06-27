'use strict';
(function () {
  var main = document.querySelector('main');

  var onError = function (errorMessage) {

    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorElement = errorTemplate.cloneNode(true);
    var buttonReset = errorElement.querySelector('.error__button');
    errorElement.querySelector('p').textContent = errorMessage;
    main.appendChild(errorElement);

    var onEscKeyDown = function (evt) {
      if (window.utils.isEscPressed(evt.key)) {
        onDeleteMassage();
      }
    };

    var onDeleteMassage = function () {
      var errorMain = main.querySelector('.error');
      errorMain.remove();
      buttonReset.removeEventListener('click', onDeleteMassage);
      document.removeEventListener('click', onDeleteMassage);
      document.removeEventListener('keydown', onEscKeyDown);
    };

    buttonReset.addEventListener('click', onDeleteMassage);
    document.addEventListener('click', onDeleteMassage);

    document.addEventListener('keydown', onEscKeyDown);
  };

  var onSuccess = function () {
    var success = document.querySelector('#success');
    var successElement = success.content.querySelector('div').cloneNode(true);
    main.appendChild(successElement);


    var onEscKeyDown = function (evt) {
      if (window.utils.isEscPressed(evt.key)) {
        onDeleteMassage();
      }
    };

    var onDeleteMassage = function () {
      var successMain = main.querySelector('.success');
      successMain.remove();
      document.removeEventListener('click', onDeleteMassage);
      document.removeEventListener('keydown', onEscKeyDown);
    };

    document.addEventListener('click', onDeleteMassage);
    document.addEventListener('keydown', onEscKeyDown);
  };

  window.serverResponse = {
    onError: onError,
    onSuccess: onSuccess
  };
})();
