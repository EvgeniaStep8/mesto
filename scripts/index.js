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
      console.log(popup);
    }); 
  });
}

function handleEditProfileButtonClick() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  resetValidation(settingValidation, formEditProfile);
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
  resetValidation(settingValidation, formAddCard);
  openPopup(popupAddCard);
}

class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  _handleLike() {
    this._card
    .querySelector('.card__like').classList.toggle('card__like_active');
  }

  _handleDelete() {
    this._card
    .querySelector('.card__delete')
    .closest('.card')
    .remove();
  }

  _openPopup() {
    popupZoomImage.classList.add('popup_opened');
  }

  _handleZoomImage() {
    this._openPopup();
    popupImage.src = this._link;
    popupImage.alt = this._name;
    popupCaption.textContent = this._name;
  }

  _addEventListeners() {
    this._card
    .querySelector('.card__like')
    .addEventListener('click', () => {
      this._handleLike();
    });

    this._card
    .querySelector('.card__delete')
    .addEventListener('click', () => {
      this._handleDelete();
    })

    this._card
    .querySelector('.card__image')
    .addEventListener('click', () => {
      this._handleZoomImage();
    })
  }
  
  _getTemplate() {
    const card = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);
    return card;
  }

  createCard() {
    this._card = this._getTemplate();

    this._card.querySelector('.card__title').textContent = this._name;
    this._card.querySelector('.card__image').src = this._link;
    this._card.querySelector('.card__image').alt = this._name;

    this. _addEventListeners();

    return this._card;
  }

}


function addCard(name, link) {
  const cardData = {};
  cardData.name = name;
  cardData.link = link;
  const card = new Card(cardData, '#card-template');
  const cardElement = card.createCard();
  cardsContainer.prepend(cardElement);
}

function handleAddFormSubmit(evt) {
  evt.preventDefault();
  addCard(titleCardInput.value, linkCardImageInput.value);
  closePopup(popupAddCard);
}

initialCards.forEach(function (item){
  const card = new Card(item, '#card-template');
  const cardElement = card.createCard();
  cardsContainer.append(cardElement);
});

handleClosePopupButtonClick();

editProfileButton.addEventListener('click', handleEditProfileButtonClick);
formEditProfile.addEventListener('submit', handleEditFormSubmit);
addCardButton.addEventListener('click', handleAddCardButtonClick);
formAddCard.addEventListener('submit', handleAddFormSubmit);