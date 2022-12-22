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
a = querySelector('.pp');
console.log(a);
/*let formElement = querySelector('.popup__save-button');
let nameInput = querySelector('.popup__input_name');
let jobInput = querySelector('.popup__input_job')
function handleFormSubmit (evt) {
    evt.preventDefault(); 
    // Получите значение полей jobInput и nameInput из свойства value 
    // Выберите элементы, куда должны быть вставлены значения полей
    profileName = querySelector('.profile__name');
    // Вставьте новые значения с помощью textContent
    profileName.textContent = nameInput.value;
}
formElement.addEventListener('submit', handleFormSubmit);*/

