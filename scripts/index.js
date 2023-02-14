const popupEditProfile = document.querySelector('#popup-edit');
const editProfileButton = document.querySelector('.profile__edit-button');
const formEditProfile = popupEditProfile.querySelector('.popup__form');
const nameInput = popupEditProfile.querySelector('.popup__input_type_name');
const jobInput = popupEditProfile.querySelector('.popup__input_type_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const cardTemplate = document.querySelector('#card-template').content;

const popupAddCard = document.querySelector('#popup-add');
const addCardButton = document.querySelector('.profile__add-button');
const formAddCard = popupAddCard.querySelector('.popup__form');
const titleCardInput = popupAddCard.querySelector('.popup__input_type_title');
const linkCardImageInput = popupAddCard.querySelector('.popup__input_type_link');
const cardsContainer = document.querySelector('.cards');

const popupZoomImage = document.querySelector('#popup-open-image');
const popupImage = popupZoomImage.querySelector('.popup__image');
const popupCaption = popupZoomImage.querySelector('.popup__caption');

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', сlosePopupByEsc);
  popup.removeEventListener('click', closePopupByOverlayClick);
}

function сlosePopupByEsc(evt) {
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
  document.addEventListener('keydown', сlosePopupByEsc);
  popup.addEventListener('click', closePopupByOverlayClick);
}

function handleClosePopupButtonClick() {
  const closeButtonList = Array.from(document.querySelectorAll('.popup__close'));
  closeButtonList.forEach( (closeButton) => {
    closeButton.addEventListener ('click', () => {
      const popup = closeButton.closest('.popup');
      closePopup(popup);
      console.log(popup);
    }); 
  });
}

function handleEditProfileButtonClick() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  removeValidationErrors (settingValidation, formEditProfile);
  deactivateButtonSubmit(settingValidation, formEditProfile);
  openPopup(popupEditProfile);
}

function handleEditFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

function handleAddCardButtonClick() {
  formAddCard.reset();
  removeValidationErrors(settingValidation, formAddCard);
  deactivateButtonSubmit(settingValidation, formAddCard);
  openPopup(popupAddCard);
}

function likeCard(card) {
  const cardLikeButton = card.querySelector('.card__like');
  cardLikeButton.addEventListener('click', function(evt) {
    evt.target.classList.toggle('card__like_active');
  });
}

function deleteCard(card) {
  const cardDeleteButton = card.querySelector('.card__delete');
  cardDeleteButton.addEventListener('click', function(evt) {
    evt.target.closest('.card').remove();
  });
}

function zoomImage(cardImage) {
  cardImage.addEventListener('click', function(evt) {
    openPopup(popupZoomImage);
    popupImage.src = evt.target.src;
    popupImage.alt = evt.target.alt;
    popupCaption.textContent = evt.target.alt;
  });
}

function createCard(title, link) {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitle = card.querySelector('.card__title');
  const cardImage = card.querySelector('.card__image');
  cardTitle.textContent = title;
  cardImage.src = link;
  cardImage.alt = title;
  likeCard (card);
  deleteCard(card);
  zoomImage(cardImage);
  return card;
}

function addCard(title, link) {
  const newCard = createCard(title, link);
  cardsContainer.prepend(newCard);
}

function handleAddFormSubmit(evt) {
  evt.preventDefault();
  addCard(titleCardInput.value, linkCardImageInput.value);
  closePopup(popupAddCard);
}

initialCards.forEach(function (item){
  const card = createCard(item.name, item.link);
  cardsContainer.append(card);
});

handleClosePopupButtonClick();

editProfileButton.addEventListener('click', handleEditProfileButtonClick);
formEditProfile.addEventListener('submit', handleEditFormSubmit);
addCardButton.addEventListener('click', handleAddCardButtonClick);
formAddCard.addEventListener('submit', handleAddFormSubmit);