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
  const hasInputElementInvalid = !inputElement.validity.valid;
    if (hasInputElementInvalid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
}

function addInputListeners (formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  inputList.forEach ((inputElement) => {
    inputElement.addEventListener('input', () => {
    checkInputValidity (formElement, inputElement);
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

