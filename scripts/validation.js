function showInputError(formElement, inputElement, errormMessage) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = errormMessage;
  errorElement.classList.add('popup__input-error_active');
  inputElement.classList.add('popup__input_type_error');
}

function hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = '';
    errorElement.classList.remove('popup__input-error_active');
    inputElement.classList.remove('popup__input_type_error');
}

function checkInputValidity (formElement, inputElement) {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
}

function hasInvalidInput(inputList) {
  return inputList.some( (inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(formElement, inputList) {
  const buttonElement = formElement.querySelector('.popup__save-button');
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__save-button_disabled');
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove('popup__save-button_disabled');
    buttonElement.disabled = false;
  }
}

function addInputListeners (formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  toggleButtonState(formElement, inputList);
  inputList.forEach ((inputElement) => {
    inputElement.addEventListener('input', () => {
    checkInputValidity (formElement, inputElement);
    toggleButtonState(formElement, inputList);
    });
  });
}
  

function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach( (formElement) => {
    addInputListeners(formElement);
  })
}

enableValidation();

