import  {initialCards, settingsValidation} from '../utils/constans.js';
import Section from '../components/Section.js'
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';

const popupEditProfile = new PopupWithForm('#popup-edit', handleEditFormSubmit);
popupEditProfile.setEventListeners();
const popupAddCard =new PopupWithForm('#popup-add', handleAddFormSubmit)
popupAddCard.setEventListeners();

const editProfileButton = document.querySelector('.profile__edit-button');
const formEditProfile = document.forms.popupEditForm;
const nameInput =formEditProfile.querySelector('.popup__input_type_name');
const jobInput = formEditProfile.querySelector('.popup__input_type_job');
const editFormValidator = new FormValidator(settingsValidation, formEditProfile);
const userInfo = new UserInfo('.profile__name', '.profile__job');

const addCardButton = document.querySelector('.profile__add-button');
const formAddCard =document.forms.popupAddForm;
const cardsContainer = document.querySelector('.cards');
const addFormValidator = new FormValidator(settingsValidation, formAddCard);

function handleEditProfileButtonClick() {
  const {name, job} = userInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = job;
  editFormValidator.resetValidation();
  popupEditProfile.open();
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  const inputValues = popupEditProfile.getInputValues();
  popupEditProfile.close();
  userInfo.setUserInfo(inputValues);
}

function handleAddCardButtonClick() {
  addFormValidator.resetValidation();
  popupAddCard.open();
}

function handleClickCardImage(link, title) {
  const popupZoomImage = new PopupWithImage('#popup-open-image', link, title);
  popupZoomImage.open();
}

const cardList = new Section(initialCards, renderer, '.cards');

function renderer(item) {
  const card = new Card(item, '#card-template', handleClickCardImage);
  const cardElement = card.createCard();
    cardList.addItem(cardElement);
}

cardList.renderItems();

function getCardElement(name, link) {
  const card = new Card({ name, link }, '#card-template', handleClickCardImage);
  const cardElement = card.createCard();
  return cardElement;
}

function addCard(name, link) {
  const cardElement = getCardElement(name, link);
  cardsContainer.prepend(cardElement);
}

function handleAddFormSubmit(evt) {
  evt.preventDefault();
  const inputs= popupAddCard.getInputValues();
  const {title: name, link} = inputs;
  addCard(name, link);
  popupAddCard.close();
}

editFormValidator.enableValidation();
addFormValidator.enableValidation();

editProfileButton.addEventListener('click', handleEditProfileButtonClick);
addCardButton.addEventListener('click', handleAddCardButtonClick);