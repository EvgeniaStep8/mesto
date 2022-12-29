let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-button');
let closePopupButton = popup.querySelector('.popup__close');
let formElement = popup.querySelector('.popup__form');
let nameInput = popup.querySelector('.popup__input_type_name');
let jobInput = popup.querySelector('.popup__input_type_job');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
function popupOpen() {
  popup.classList.add('popup_opened');
}
function popupClose() {
    popup.classList.remove('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}
editButton.addEventListener('click', popupOpen);
closePopupButton.addEventListener('click', popupClose);
function handleFormSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    popupClose();
}
formElement.addEventListener('submit', handleFormSubmit);

