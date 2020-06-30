'use strict';
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fileChooser = document.querySelector('.ad-form-header__input');
  var previewUser = document.querySelector('.ad-form-header__preview').querySelector('img');
  var fileHousing = document.querySelector('.ad-form__input');
  var photoContainer = document.querySelector('.ad-form__photo-container');

  var downloadUserAvatar = function (evt) {
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

  var downloadImageHousing = function (evt) {
    var previewHousing = document.querySelector('.ad-form__photo');
    if (!previewHousing.firstChild) {
      previewHousing.remove();
    }
    var file = evt.target.files[0];
    var fileName = file.name.toLowerCase();
    var elementImg = previewUser.cloneNode(true);
    elementImg.setAttribute('width', '70px');
    elementImg.setAttribute('height', '70px');
    var imgContainer = document.createElement('div');
    imgContainer.setAttribute('class', 'ad-form__photo');
    imgContainer.appendChild(elementImg);
    photoContainer.appendChild(imgContainer);

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

  fileChooser.addEventListener('change', downloadUserAvatar);
  fileHousing.addEventListener('change', downloadImageHousing);
})();
