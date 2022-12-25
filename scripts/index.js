let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-button');
let closePopupButton = popup.querySelector('.popup__close');
function popupOpen() {
  popup.classList.add('popup_opened');
}
function popupClose() {
    popup.classList.remove('popup_opened');
}
editButton.addEventListener('click', popupOpen);
closePopupButton.addEventListener('click', popupClose);

let formElement = popup.querySelector('.popup__form');
let nameInput = popup.querySelector('.popup__input_name');
let jobInput = popup.querySelector('.popup__input_job');
function handleFormSubmit (evt) {
    evt.preventDefault();
    profileName = document.querySelector('.profile__name');
    profileName.textContent = nameInput.value;
    profileJob = document.querySelector('.profile__job');
    profileJob.textContent = jobInput.value;
}
formElement.addEventListener('submit', handleFormSubmit);

