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

addButton.addEventListener('click', function () {
  popupOpen(popupAdd);
});

closePopupAddButton.addEventListener('click', function() {
  popupClose(popupAdd);
})
/*




const titleInput = 
function addCard(link, name) {
  const cardTemplate = document.querySelector('#card-template').content;
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  card.querySelector('card__title').textContent = 

}




let card = document.querySelector('.card');
let cardLikeButton = card.querySelector('.card__like');
cardLikeButton.addEventListener('click', function (evt){
  evt.target.classList.toggle('.card__like_active');
}); */
