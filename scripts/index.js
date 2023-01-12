const popupEdit = document.querySelector('#popup-edit');
const popupAdd = document.querySelector('#popup-add');
const popupOpenImage = document.querySelector('#popup-open-image');

function popupOpen(popup) {
  popup.classList.add('popup_opened');
}

function popupClose(popup) {
  popup.classList.remove('popup_opened');
}

const editButton = document.querySelector('.profile__edit-button');
const closePopupEditButton = popupEdit.querySelector('.popup__close');
const formElementEdit = popupEdit.querySelector('.popup__form');
let nameInput = popupEdit.querySelector('.popup__input_type_name');
let jobInput = popupEdit.querySelector('.popup__input_type_job');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');

editButton.addEventListener('click', function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  popupOpen(popupEdit);
});

closePopupEditButton.addEventListener('click', function () {
  popupClose(popupEdit);
});

function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  popupClose(popupEdit);
}

formElementEdit.addEventListener('submit', handleFormSubmit);


const addButton = document.querySelector('.profile__add-button');
const closePopupAddButton = popupAdd.querySelector('.popup__close');
const formElementAdd = popupAdd.querySelector('.popup__form');
let titleInput = popupAdd.querySelector('.popup__input_type_title');
let linkInput = popupAdd.querySelector('.popup__input_type_link');

addButton.addEventListener('click', function () {
  titleInput.value = '';
  linkInput.value= '';
  popupOpen(popupAdd);
});

closePopupAddButton.addEventListener('click', function() {
  popupClose(popupAdd);
});

const cards = document.querySelector('.cards');

function addCard (evt) {
  evt.preventDefault();
  const cardTemplate = document.querySelector('#card-template').content;
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  cardTitle = card.querySelector('.card__title');
  cardImage = card.querySelector('.card__image');
  cardTitle.textContent = titleInput.value;
  cardImage.src = linkInput.value;
  cardImage.alt = titleInput.value;
  const cardLikeButton = card.querySelector('.card__like');
  cardLikeButton.addEventListener('click', function (evt){
  evt.target.classList.toggle('.card__like_active');
  });
  cards.append(card);
}

formElementAdd.addEventListener('submit', addCard);

