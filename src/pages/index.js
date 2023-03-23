import './index.css';
import  {apiOptions, editProfileButton, changeAvatarButton, addCardButton, settingsValidation} from '../utils/constants.js';
import Api from '../components/Api';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupConfirm from '../components/PopupConfirm';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';

function getCardElement(item) {
  const card = new Card(item, '#card-template', handleLikeCard, handleClickCardImage, handleDeleteCard);
  const cardElement = card.createCard();
  return cardElement;
}

function renderCard(item) {
  const cardElement = getCardElement(item);
  cardList.addItem(cardElement);
}

function handleEditProfileButtonClick() {
  popupEditProfile.updateInputValue(userInfo.getUserInfo())
  editFormValidator.resetValidation();
  popupEditProfile.open();
}

function handleEditFormSubmit(inputsValues) {
  popupEditProfile.renderPending(true);
  api.editUserInfo(inputsValues)
    .then(user => {
      userInfo.setUserInfo(user);
      popupEditProfile.close();
    })
    .catch(err => console.log(err))
    .finally(() => popupEditProfile.renderPending(false));
}

function handleUpdateAvatarButtonClick() {
  updateAvatarFormValidator.resetValidation();
  popupUpdateAvatar.open();
}

function handleUpdateAvatarFormSubmit(inputsValues) {
  popupUpdateAvatar.renderPending(true);
  api.editUserAvatar(inputsValues)
    .then( user => {
      userInfo.setUserAvatar(user);
      popupUpdateAvatar.close();
    })
    .catch(err => console.log(err))
    .finally(() => popupUpdateAvatar.renderPending(false));
}

function handleAddCardButtonClick() {
  addFormValidator.resetValidation();
  popupAddCard.open();
}

function handleClickCardImage(link, title) {
  popupZoomImage.open(link, title);
}

function handleLikeCard(cardId, likeButton, likeCounter) {
  if (!likeButton.classList.contains('card__like_active')) {
    api.putCardLike(cardId)
      .then(({likes}) => {
        likeButton.classList.add('card__like_active');
        likeCounter.textContent = likes.length;
      })
      .catch(err => console.log(err));
  } else {
    api.deleteCardLike(cardId)
      .then(res => {
        likeButton.classList.remove('card__like_active');
        //likeCounter.textContent = likes.length;
        console.log(res);
      })
      .catch(err => console.log(err));
  }
}

function handleAddFormSubmit(inputsValues) {
  popupAddCard.renderPending(true);
  const {title: name, link} = inputsValues;
  api.createCard(name, link)
    .then(item => {
      renderCard(item);
      popupAddCard.close();
    })
    .catch(err => console.log(err))
    .finally(() => popupAddCard.renderPending(false));
  
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
  .then(user => {
    userInfo.setUserInfo(user);
    userInfo.setUserAvatar(user);
  })
  .catch(err => console.log(err));


const cardList = new Section(renderCard, '.cards');
api.getInitialCards()
  .then(cards => cardList.renderItems(cards.reverse()))
  .catch(err => console.log(err));

const popupEditProfile = new PopupWithForm('#popup-edit', handleEditFormSubmit);
popupEditProfile.setEventListeners();

const editFormValidator = new FormValidator(settingsValidation, 'popupEditForm');
editFormValidator.enableValidation();

const popupUpdateAvatar = new PopupWithForm('#popup-update-avatar', handleUpdateAvatarFormSubmit);
popupUpdateAvatar.setEventListeners();
const updateAvatarFormValidator = new FormValidator(settingsValidation, 'popupUpdateAvatarForm');
updateAvatarFormValidator.enableValidation();


const popupAddCard = new PopupWithForm('#popup-add', handleAddFormSubmit)
popupAddCard.setEventListeners();
const addFormValidator = new FormValidator(settingsValidation, 'popupAddForm');
addFormValidator.enableValidation();

const popupZoomImage = new PopupWithImage('#popup-open-image', '.popup__image', '.popup__caption');
popupZoomImage.setEventListeners();

editProfileButton.addEventListener('click', handleEditProfileButtonClick);
changeAvatarButton.addEventListener('click', handleUpdateAvatarButtonClick);
addCardButton.addEventListener('click', handleAddCardButtonClick);