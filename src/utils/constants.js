const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ]; 

const editProfileButton = document.querySelector('.profile__edit-button');
const formEditProfile = document.forms.popupEditForm;
const nameInput =formEditProfile.querySelector('.popup__input_type_name');
const jobInput = formEditProfile.querySelector('.popup__input_type_job');
const addCardButton = document.querySelector('.profile__add-button');
const formAddCard =document.forms.popupAddForm;

  const settingsValidation = {
    inputSelector: '.popup__input',
    buttonSubmitSelector: '.popup__save-button',
    buttonSubmitDisabledClass: 'popup__save-button_disabled',
    inputErrorActiveClass: 'popup__input-error_active',
    inputTypeErrorClass: 'popup__input_type_error',
  }

  export {initialCards, editProfileButton, formEditProfile, nameInput, jobInput, addCardButton, formAddCard, settingsValidation}
  