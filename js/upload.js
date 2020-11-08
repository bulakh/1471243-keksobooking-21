'use strict';

const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];

const adForm = document.querySelector(`.ad-form`);
const inputAvatar = adForm.querySelector(`.ad-form-header__input`);
const previewAvatar = adForm.querySelector(`.ad-form-header__avatar`);

const inputPhoto = adForm.querySelector(`.ad-form__input`);
const previewPhoto = adForm.querySelector(`.ad-form__photo-preview`);

const showPreview = function (input, preview) {
  const file = input.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some(function (it) {
    return fileName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener(`load`, function () {
      preview.src = reader.result;

      if (preview.matches(`.hidden`)) {
        preview.classList.remove(`hidden`);
      }
    });

    reader.readAsDataURL(file);
  }
};

const showAvatar = function () {
  showPreview(inputAvatar, previewAvatar);
};

const showPhoto = function () {
  showPreview(inputPhoto, previewPhoto);
};

const activatePreviewInputs = function () {
  inputPhoto.addEventListener(`change`, showPhoto);
  inputAvatar.addEventListener(`change`, showAvatar);
};

const resetPreviewInputs = function () {
  inputPhoto.removeEventListener(`change`, showPhoto);
  inputAvatar.removeEventListener(`change`, showAvatar);
  previewAvatar.src = `img/muffin-grey.svg`;
  previewPhoto.src = `#`;
  previewPhoto.classList.add(`hidden`);
};

window.upload = {
  adForm,
  resetPreviewInputs,
  activatePreviewInputs
};
