import  {initialCards, settingsValidation} from './constans.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';

const poupEditProfile = new PopupWithForm('#popup-edit', handleEditFormSubmit);

const editProfileButton = document.querySelector('.profile__edit-button');
const formEditProfile = document.forms.popupEditForm;
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const nameInput =formEditProfile.querySelector('.popup__input_type_name');
const jobInput = formEditProfile.querySelector('.popup__input_type_job');
const editFormValidator = new FormValidator(settingsValidation, formEditProfile);

const popupAddCard = document.querySelector('#popup-add');
const addCardButton = document.querySelector('.profile__add-button');
const formAddCard = popupAddCard.querySelector('.popup__form');
const titleCardInput = popupAddCard.querySelector('.popup__input_type_title');
const linkCardImageInput = popupAddCard.querySelector('.popup__input_type_link');
const cardsContainer = document.querySelector('.cards');
const addFormValidator = new FormValidator(settingsValidation, formAddCard);

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscUp);
  popup.removeEventListener('click', handleOverlayClick);
}

function handleEscUp(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

function handleOverlayClick(evt) {
  if (evt.target === evt.currentTarget) {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscUp);
  popup.addEventListener('click', handleOverlayClick);
}

function handleClosePopupButtonClick() {
  const closeButtonList = Array.from(document.querySelectorAll('.popup__close'));
  closeButtonList.forEach( (closeButton) => {
    closeButton.addEventListener ('click', () => {
      const popup = closeButton.closest('.popup');
      closePopup(popup);
    }); 
  });
}

function handleEditProfileButtonClick() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  editFormValidator.resetValidation();
  poupEditProfile.open();
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  poupEditProfile.close();
}

function handleAddCardButtonClick() {
  formAddCard.reset();
  addFormValidator.resetValidation();
  openPopup(popupAddCard);
}

function handleClickCardImage(link, name) {
  const popupZoomImage = new PopupWithImage('#popup-open-image', link, name);
  popupZoomImage.open();
}

function getCardElement(name, link) {
  const card = new Card(name, link, '#card-template', handleClickCardImage);
  const cardElement = card.createCard();
  return cardElement;
}

function addCard(name, link) {
  const cardElement = getCardElement(name, link);
  cardsContainer.prepend(cardElement);
}

function handleAddFormSubmit(evt) {
  evt.preventDefault();
  addCard(titleCardInput.value, linkCardImageInput.value);
  closePopup(popupAddCard);
}

initialCards.forEach((item) => {
  const cardElement = getCardElement(item.name, item.link);
  cardsContainer.append(cardElement);
});

handleClosePopupButtonClick();

editFormValidator.enableValidation();
addFormValidator.enableValidation();

editProfileButton.addEventListener('click', handleEditProfileButtonClick);
formEditProfile.addEventListener('submit', handleEditFormSubmit);
addCardButton.addEventListener('click', handleAddCardButtonClick);
formAddCard.addEventListener('submit', handleAddFormSubmit);