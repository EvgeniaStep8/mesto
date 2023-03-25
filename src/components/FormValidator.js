export default class FormValidator {
  constructor(settings, formName) {
    this._inputSelector = settings.inputSelector;
    this._buttonSubmitSelector = settings.buttonSubmitSelector;
    this._buttonSubmitDisabledClass = settings.buttonSubmitDisabledClass;
    this._inputErrorActiveClass = settings.inputErrorActiveClass;
    this._inputTypeErrorClass = settings.inputTypeErrorClass;
    this._form = document.forms[formName];
  }

  enableValidation() {
    this._setEventListeners();
    this._toggleButtonState();
  }

  resetValidation() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
    this._deactivateButtonSubmit();
  }

  _toggleButtonState() {
    if (this._isInvalidInput()) {
      this._deactivateButtonSubmit();
    } else {
      this._activateButtonSubmit();
    }
  }

  _setEventListeners() {
    this._inputList = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  _isInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _deactivateButtonSubmit() {
    const buttonSubmit = this._form.querySelector(this._buttonSubmitSelector);
    buttonSubmit.classList.add(this._buttonSubmitDisabledClass);
    buttonSubmit.disabled = true;
  }

  _activateButtonSubmit() {
    const buttonSubmit = this._form.querySelector(this._buttonSubmitSelector);
    buttonSubmit.classList.remove(this._buttonSubmitDisabledClass);
    buttonSubmit.disabled = false;
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _showInputError(inputElement) {
    this._errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    this._errorElement.textContent = inputElement.validationMessage;
    this._errorElement.classList.add(this._inputErrorActiveClass);
    inputElement.classList.add(this._inputTypeErrorClass);
  }

  _hideInputError(inputElement) {
    this._errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    this._errorElement.textContent = "";
    this._errorElement.classList.remove(this._inputErrorActiveClass);
    inputElement.classList.remove(this._inputTypeErrorClass);
  }
}
