const apiOptions = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-62',
  authorization: '6c5b9d14-85b6-40ab-839b-e140f1872a35',
}

const editProfileButton = document.querySelector('.profile__edit-button');
const formEditProfile = document.forms.popupEditForm;
const nameInput =formEditProfile.querySelector('.popup__input_type_name');
const jobInput = formEditProfile.querySelector('.popup__input_type_job');
const changeAvatarButton = document.querySelector('.profile__change-avatar-button');
const formUpdateAvatar = document.forms.popupUpdateAvatarForm;
const addCardButton = document.querySelector('.profile__add-button');
const formAddCard =document.forms.popupAddForm;

  const settingsValidation = {
    inputSelector: '.popup__input',
    buttonSubmitSelector: '.popup__save-button',
    buttonSubmitDisabledClass: 'popup__save-button_disabled',
    inputErrorActiveClass: 'popup__input-error_active',
    inputTypeErrorClass: 'popup__input_type_error',
  }

  export {apiOptions, editProfileButton, formEditProfile, nameInput, jobInput, changeAvatarButton, formUpdateAvatar, addCardButton, formAddCard, settingsValidation}
  