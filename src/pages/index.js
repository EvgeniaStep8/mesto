import './index.css';
import  {initialCards, editProfileButton, formEditProfile, nameInput, jobInput, addCardButton, formAddCard, settingsValidation} from '../utils/constants.js';
import Section from '../components/Section.js'
import Card from '../components/Card.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js'
import FormValidator from '../components/FormValidator.js';

function getCardElement(item) {
  const card = new Card(item, '#card-template', handleClickCardImage);
  const cardElement = card.createCard();
  return cardElement;
}

function renderCard(item) {
  const cardElement = getCardElement(item);
  cardList.addItem(cardElement);
}

function handleEditProfileButtonClick() {
  const {name, job} = userInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = job;
  editFormValidator.resetValidation();
  popupEditProfile.open();
}

function handleEditFormSubmit(inputsValues) {
  popupEditProfile.close();
  userInfo.setUserInfo(inputsValues);
}

function handleAddCardButtonClick() {
  addFormValidator.resetValidation();
  popupAddCard.open();
}

function handleClickCardImage(link, title) {
  popupZoomImage.open(link, title);
}

function handleAddFormSubmit(inputsValues) {
  const {title: name, link} = inputsValues;
  renderCard({ name, link });
  popupAddCard.close();
}

const cardList = new Section(renderCard, '.cards');
cardList.renderItems(initialCards.reverse());

const popupEditProfile = new PopupWithForm('#popup-edit', handleEditFormSubmit);
popupEditProfile.setEventListeners();
const userInfo = new UserInfo('.profile__name', '.profile__job');
const editFormValidator = new FormValidator(settingsValidation, formEditProfile);
editFormValidator.enableValidation();

const popupAddCard = new PopupWithForm('#popup-add', handleAddFormSubmit)
popupAddCard.setEventListeners();
const addFormValidator = new FormValidator(settingsValidation, formAddCard);
addFormValidator.enableValidation();

const popupZoomImage = new PopupWithImage('#popup-open-image', '.popup__image', '.popup__caption');
popupZoomImage.setEventListeners();

editProfileButton.addEventListener('click', handleEditProfileButtonClick);
addCardButton.addEventListener('click', handleAddCardButtonClick);