'use strict';
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fileChooser = document.querySelector('.ad-form-header__input');
  var previewUser = document.querySelector('.ad-form-header__preview').querySelector('img');
  var previewHousing = document.querySelector('.ad-form__photo');
  var fileHousing = document.querySelector('.ad-form__input');

  var userAvatar = function (evt) {
    var file = evt.target.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        previewUser.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  };

  var imageHousing = function (evt) {
    var file = evt.target.files[0];
    var fileName = file.name.toLowerCase();
    var elementImg = previewUser.cloneNode(true)
    previewHousing.appendChild(elementImg);

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        elementImg.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  };

  fileChooser.addEventListener('change', userAvatar);
  fileHousing.addEventListener('change', imageHousing);
})();
