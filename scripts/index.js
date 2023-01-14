const popupEditProfile = document.querySelector('#popup-edit');
const editProfileButton = document.querySelector('.profile__edit-button');
const closePopupEditProfileButton = popupEditProfile.querySelector('.popup__close');
const formEditProfile = popupEditProfile.querySelector('.popup__form');
const nameInput = popupEditProfile.querySelector('.popup__input_type_name');
const jobInput = popupEditProfile.querySelector('.popup__input_type_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

editProfileButton.addEventListener('click', function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupEditProfile);
});

closePopupEditProfileButton.addEventListener('click', function () {
  closePopup(popupEditProfile);
});

function handleEditFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

formEditProfile.addEventListener('submit', handleEditFormSubmit);

const popupAddCard = document.querySelector('#popup-add');
const addCardButton = document.querySelector('.profile__add-button');
const closePopupAddCardButton = popupAddCard.querySelector('.popup__close');
const formAddCard = popupAddCard.querySelector('.popup__form');
const titleCardInput = popupAddCard.querySelector('.popup__input_type_title');
const linkCardImageInput = popupAddCard.querySelector('.popup__input_type_link');

addCardButton.addEventListener('click', function () {
  formAddCard.reset();
  openPopup(popupAddCard);
});

closePopupAddCardButton.addEventListener('click', function() {
  closePopup(popupAddCard);
});

const cardsContainer = document.querySelector('.cards');
const popupZoomImage = document.querySelector('#popup-open-image');
const popupImage = popupZoomImage.querySelector('.popup__image');
const popupCaption = popupZoomImage.querySelector('.popup__caption');

function createCard(title, link) {
  const cardTemplate = document.querySelector('#card-template').content;
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitle = card.querySelector('.card__title');
  const cardImage = card.querySelector('.card__image');
  cardTitle.textContent = title;
  cardImage.src = link;
  cardImage.alt = title;
  const cardLikeButton = card.querySelector('.card__like');
  cardLikeButton.addEventListener('click', function(evt) {
    evt.target.classList.toggle('card__like_active');
  });
  const cardDeleteButton = card.querySelector('.card__delete');
  cardDeleteButton.addEventListener('click', function(evt) {
    card.remove();
  });
  cardImage.addEventListener('click', function(evt) {
    openPopup(popupZoomImage);
    popupImage.src = evt.target.src;
    popupImage.alt = evt.target.alt;
    popupCaption.textContent = evt.target.alt;
  });
  return card;
}

function addCard() {
  const newCard = createCard(titleCardInput.value, linkCardImageInput.value);
  cardsContainer.prepend(newCard);
}

const closePopupZoomImageButton = popupZoomImage.querySelector('.popup__close');
closePopupZoomImageButton.addEventListener('click', function() {
  closePopup(popupZoomImage);
})

formAddCard.addEventListener('submit', function(evt){
  evt.preventDefault();
  addCard();
  closePopup(popupAddCard);
});


initialCards.forEach(function (item){
  const newCard = createCard(item.name, item.link);
  cardsContainer.prepend(newCard);
});