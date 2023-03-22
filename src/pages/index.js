import './index.css';
import  {apiOptions, editProfileButton, formEditProfile, nameInput, jobInput, changeAvatarButton, formUpdateAvatar, addCardButton, formAddCard, settingsValidation} from '../utils/constants.js';
import Api from '../components/Api'
import Section from '../components/Section.js'
import Card from '../components/Card.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupConfirm from '../components/PopupConfirm';
import UserInfo from '../components/UserInfo.js'
import FormValidator from '../components/FormValidator.js';

function getCardElement(item) {
  const card = new Card(item, '#card-template', handleClickCardImage, handleDeleteCard);
  const cardElement = card.createCard();
  return cardElement;
}

function renderCard(item) {
  const cardElement = getCardElement(item);
  cardList.addItem(cardElement);
}

function handleEditProfileButtonClick() {
  const {name, about} = userInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = about;
  editFormValidator.resetValidation();
  popupEditProfile.open();
}

function handleEditFormSubmit(inputsValues) {
  api.editUserInfo(inputsValues)
    .then(res => {
      if(res.ok) {
        return res.json();
      }
    })
    .then(user => {
      userInfo.setUserInfo(user);
      popupEditProfile.close();
    })
    .catch(err => console.log(err))
    .finally(() => {
    });
}

function handleUpdateAvatarButtonClick() {
  updateAvatarFormValidator.resetValidation();
  popupUpdateAvatar.open();
}

function handleUpdateAvatarFormSubmit(inputsValues) {
  popupUpdateAvatar.close();

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

function handleDeleteCard(card) {
  const popupConfirm = new PopupConfirm('#popup-confirm', handleConfirm, card);
  popupConfirm.setEventListeners();
  popupConfirm.open();
}

function handleConfirm(card) {
  Card.removeCard(card);
}

const api = new Api(apiOptions);
const userInfo = new UserInfo('.profile__name', '.profile__job', '.profile__avatar');
api.getUserInfo()
  .then( res => {
    if (res.ok) {
      return res.json();
    }
  })
  .then(user => {
    userInfo.setUserInfo(user);
    userInfo.setUserAvatar(user);
  })
  .catch(err => console.log(err));


const cardList = new Section(renderCard, '.cards');
api.getInitialCards()
  .then(res => { 
    if(res.ok) {
      return res.json();
    }
  })
  .then(cards => cardList.renderItems(cards.reverse()))
  .catch(err => console.log(err));

const popupEditProfile = new PopupWithForm('#popup-edit', handleEditFormSubmit);
popupEditProfile.setEventListeners();

const editFormValidator = new FormValidator(settingsValidation, formEditProfile);
editFormValidator.enableValidation();

const popupUpdateAvatar = new PopupWithForm('#popup-update-avatar', handleUpdateAvatarFormSubmit);
popupUpdateAvatar.setEventListeners();
const updateAvatarFormValidator = new FormValidator(settingsValidation, formUpdateAvatar);
updateAvatarFormValidator.enableValidation();


const popupAddCard = new PopupWithForm('#popup-add', handleAddFormSubmit)
popupAddCard.setEventListeners();
const addFormValidator = new FormValidator(settingsValidation, formAddCard);
addFormValidator.enableValidation();

const popupZoomImage = new PopupWithImage('#popup-open-image', '.popup__image', '.popup__caption');
popupZoomImage.setEventListeners();

editProfileButton.addEventListener('click', handleEditProfileButtonClick);
changeAvatarButton.addEventListener('click', handleUpdateAvatarButtonClick);
addCardButton.addEventListener('click', handleAddCardButtonClick);