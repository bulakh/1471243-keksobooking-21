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

const avatarShowHandler = function () {
  showPreview(inputAvatar, previewAvatar);
};

const photoShowHandler = function () {
  showPreview(inputPhoto, previewPhoto);
};

const activatePreviewInputs = function () {
  inputPhoto.addEventListener(`change`, photoShowHandler);
  inputAvatar.addEventListener(`change`, avatarShowHandler);
};

const resetPreviewInputs = function () {
  inputPhoto.removeEventListener(`change`, photoShowHandler);
  inputAvatar.removeEventListener(`change`, avatarShowHandler);
  previewAvatar.src = `img/muffin-grey.svg`;
  previewPhoto.src = `#`;
  previewPhoto.classList.add(`hidden`);
};

window.upload = {
  adForm,
  resetPreviewInputs,
  activatePreviewInputs
};
