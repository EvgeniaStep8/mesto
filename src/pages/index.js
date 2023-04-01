import "./index.css";
import {
  apiOptions,
  editProfileButton,
  changeAvatarButton,
  addCardButton,
  settingsValidation,
} from "../utils/constants.js";
import Api from "../components/Api";
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupConfirm from "../components/PopupConfirm";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";

function getCardElement(item) {
  const isCardLikeOwner = item.likes.some((like) => like._id === userInfo.getUserId());
  const isOwnerCard = item.owner._id === userInfo.getUserId();
  const card = new Card(
    item,
    isCardLikeOwner,
    isOwnerCard,
    "#card-template",
    handleLikeCard,
    handleClickCardImage,
    handleDeleteCard
  );
  const cardElement = card.createCard();
  return cardElement;
}

function renderCard(item) {
  const cardElement = getCardElement(item);
  cardList.addItem(cardElement);
}

function handleEditProfileButtonClick() {
  popupEditProfile.updateInputValue(userInfo.getUserInfo());
  editFormValidator.resetValidation();
  popupEditProfile.open();
}

function handleEditFormSubmit(inputsValues) {
  return api.patchUserInfo(inputsValues)
    .then((user) => {
      userInfo.setUserInfo(user);
      userInfo.renderUserInfo();
    })
}

function handleUpdateAvatarButtonClick() {
  updateAvatarFormValidator.resetValidation();
  popupUpdateAvatar.open();
}

function handleUpdateAvatarFormSubmit(inputsValues) {
  return api.patchUserAvatar(inputsValues)
    .then((user) => {
      userInfo.setUserInfo(user);
      userInfo.renderUserAvatar();
    });
}

function handleAddCardButtonClick() {
  addFormValidator.resetValidation();
  popupAddCard.open();
}

function handleClickCardImage(link, title) {
  popupZoomImage.open(link, title);
}

function handleLikeCard(cardId, card) {
  if (!card.isCardLikeOwner) {
    api.putCardLike(cardId)
      .then(({ likes }) => {
        card.updateLikes(likes.length);
      })
      .catch((err) => console.log(err));
  } else {
    api.deleteCardLike(cardId)
      .then(({ likes }) => {
        card.updateLikes(likes.length);
      })
      .catch((err) => console.log(err));
  }
}

function handleDeleteCard(cardId, card) {
  popupConfirm.open({ cardId, card });
}

function handleAddFormSubmit(inputsValues) {
  const { title: name, link } = inputsValues;
  return api.postCard(name, link)
    .then((item) => {
      renderCard(item);
    });
}

function handleConfirm({ cardId, card }) {
  api.deleteCard(cardId)
    .then(() => {
      card.removeCard();
      popupConfirm.close();
    })
    .catch((err) => console.log(err));
}

const api = new Api(apiOptions);
const userInfo = new UserInfo(
  ".profile__name",
  ".profile__job",
  ".profile__avatar"
);
const cardList = new Section(renderCard, ".cards");

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, initialCards]) => {
    userInfo.setUserInfo(userData);
    userInfo.renderUserInfo();
    userInfo.renderUserAvatar();
    cardList.renderItems(initialCards.reverse())
  })
  .catch(err => console.log(err));

const popupEditProfile = new PopupWithForm("#popup-edit", handleEditFormSubmit);
popupEditProfile.setEventListeners();

const editFormValidator = new FormValidator(
  settingsValidation,
  "popupEditForm"
);
editFormValidator.enableValidation();

const popupUpdateAvatar = new PopupWithForm(
  "#popup-update-avatar",
  handleUpdateAvatarFormSubmit
);
popupUpdateAvatar.setEventListeners();
const updateAvatarFormValidator = new FormValidator(
  settingsValidation,
  "popupUpdateAvatarForm"
);
updateAvatarFormValidator.enableValidation();

const popupAddCard = new PopupWithForm("#popup-add", handleAddFormSubmit);
popupAddCard.setEventListeners();
const addFormValidator = new FormValidator(settingsValidation, "popupAddForm");
addFormValidator.enableValidation();

const popupConfirm = new PopupConfirm("#popup-confirm", handleConfirm);
popupConfirm.setEventListeners();

const popupZoomImage = new PopupWithImage(
  "#popup-open-image",
  ".popup__image",
  ".popup__caption"
);
popupZoomImage.setEventListeners();

editProfileButton.addEventListener("click", handleEditProfileButtonClick);
changeAvatarButton.addEventListener("click", handleUpdateAvatarButtonClick);
addCardButton.addEventListener("click", handleAddCardButtonClick);
