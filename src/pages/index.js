import './index.css';
import  {initialCards, editProfileButton, formEditProfile, nameInput, jobInput, addCardButton, formAddCard, settingsValidation} from '../utils/constants.js';
import Section from '../components/Section.js'
import Card from '../components/Card.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js'
import FormValidator from '../components/FormValidator.js';

function renderCard(item) {
  const card = new Card(item, '#card-template', handleClickCardImage);
  const cardElement = card.createCard();
    cardList.addItem(cardElement);
}

function handleEditProfileButtonClick() {
  const {name, job} = userInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = job;
  editFormValidator.resetValidation();
  popupEditProfile.open();
}

function getInputValues(popup) {
  return popup.getInputValues();
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  const inputValues = getInputValues(popupEditProfile);
  popupEditProfile.close();
  userInfo.setUserInfo(inputValues);
}

function handleAddCardButtonClick() {
  addFormValidator.resetValidation();
  popupAddCard.open();
}

function handleClickCardImage(link, title) {
  const popupZoomImage = new PopupWithImage('#popup-open-image', link, title);
  popupZoomImage.setEventListeners();
  popupZoomImage.open();
}

function handleAddFormSubmit(evt) {
  evt.preventDefault();
  const inputs = getInputValues(popupAddCard);
  const {title: name, link} = inputs;
  renderCard({ name, link });
  popupAddCard.close();
}

const cardList = new Section(initialCards.reverse(), renderCard, '.cards');
cardList.renderItems();

const popupEditProfile = new PopupWithForm('#popup-edit', handleEditFormSubmit);
popupEditProfile.setEventListeners();
const userInfo = new UserInfo('.profile__name', '.profile__job');
const editFormValidator = new FormValidator(settingsValidation, formEditProfile);
editFormValidator.enableValidation();

const popupAddCard = new PopupWithForm('#popup-add', handleAddFormSubmit)
popupAddCard.setEventListeners();
const addFormValidator = new FormValidator(settingsValidation, formAddCard);
addFormValidator.enableValidation();

editProfileButton.addEventListener('click', handleEditProfileButtonClick);
addCardButton.addEventListener('click', handleAddCardButtonClick);