import  {initialCards, settingsValidation} from './constans.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';


const popupEditProfile = document.querySelector('#popup-edit');
const editProfileButton = document.querySelector('.profile__edit-button');
const formEditProfile = popupEditProfile.querySelector('.popup__form');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const nameInput = popupEditProfile.querySelector('.popup__input_type_name');
const jobInput = popupEditProfile.querySelector('.popup__input_type_job');
const editFormValidator = new FormValidator(settingsValidation, formEditProfile);

const popupAddCard = document.querySelector('#popup-add');
const addCardButton = document.querySelector('.profile__add-button');
const formAddCard = popupAddCard.querySelector('.popup__form');
const titleCardInput = popupAddCard.querySelector('.popup__input_type_title');
const linkCardImageInput = popupAddCard.querySelector('.popup__input_type_link');
const cardsContainer = document.querySelector('.cards');
const addFormValidator = new FormValidator(settingsValidation, formAddCard);

const popupZoomImage = document.querySelector('#popup-open-image');

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
  popup.removeEventListener('click', closePopupByOverlayClick);
}

function closePopupByEsc(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

function closePopupByOverlayClick(evt) {
  if (evt.target === evt.currentTarget) {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
  popup.addEventListener('click', closePopupByOverlayClick);
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
  openPopup(popupEditProfile);
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

function handleAddCardButtonClick() {
  formAddCard.reset();
  addFormValidator.resetValidation();
  openPopup(popupAddCard);
}

function addCard(name, link) {
  const cardData = {};
  cardData.name = name;
  cardData.link = link;
  const card = new Card(cardData, '#card-template', popupZoomImage, openPopup);
  const cardElement = card.createCard();
  cardsContainer.prepend(cardElement);
}

function handleAddFormSubmit(evt) {
  evt.preventDefault();
  addCard(titleCardInput.value, linkCardImageInput.value);
  closePopup(popupAddCard);
}

initialCards.forEach(function (item){
  const card = new Card(item, '#card-template', popupZoomImage, openPopup);
  const cardElement = card.createCard();
  cardsContainer.append(cardElement);
});

handleClosePopupButtonClick();

editFormValidator.enableValidation();
addFormValidator.enableValidation();

editProfileButton.addEventListener('click', handleEditProfileButtonClick);
formEditProfile.addEventListener('submit', handleEditFormSubmit);
addCardButton.addEventListener('click', handleAddCardButtonClick);
formAddCard.addEventListener('submit', handleAddFormSubmit);