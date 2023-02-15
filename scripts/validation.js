const settingValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  buttonSubmitSelector: '.popup__save-button',
  buttonSubmitDisabledClass: 'popup__save-button_disabled',
  inputErrorActiveClass: 'popup__input-error_active',
  inputTypeErrorClass: 'popup__input_type_error',
}


function showInputError(settings, formElement, inputElement, errormMessage) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = errormMessage;
  errorElement.classList.add(settings.inputErrorActiveClass);
  inputElement.classList.add(settings.inputTypeErrorClass);
}

function hideInputError(settings, formElement, inputElement) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = '';
    errorElement.classList.remove(settings.inputErrorActiveClass);
    inputElement.classList.remove(settings.inputTypeErrorClass);
}

function checkInputValidity (settings, formElement, inputElement) {
    if (!inputElement.validity.valid) {
      showInputError(settings, formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(settings, formElement, inputElement);
    }
}

function isInvalidInput(inputList) {
  return inputList.some( (inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(settings, formElement, inputList) {
  const buttonElement = formElement.querySelector(settings.buttonSubmitSelector);
  if (isInvalidInput(inputList)) {
    buttonElement.classList.add(settings.buttonSubmitDisabledClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(settings.buttonSubmitDisabledClass);
    buttonElement.disabled = false;
  }
}

function addInputListeners (settings, formElement) {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  toggleButtonState(settings, formElement, inputList);
  inputList.forEach ((inputElement) => {
    inputElement.addEventListener('input', () => {
    checkInputValidity (settings, formElement, inputElement);
    toggleButtonState(settings, formElement, inputList);
    });
  });
}
  

function enableValidation(settings) {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach( (formElement) => {
    addInputListeners(settings, formElement);
  });
}

function resetValidation (settings, formElement) {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  inputList.forEach ((inputElement) => {
    hideInputError(settings, formElement, inputElement);
  });
  const buttonElement = formElement.querySelector(settings.buttonSubmitSelector);
  buttonElement.classList.add(settings.buttonSubmitDisabledClass);
  buttonElement.disabled = true;
}

enableValidation(settingValidation);

