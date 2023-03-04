import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
		super(popupSelector);
		this._handleFormSubmit = handleFormSubmit;
		this._form  = this._popup.querySelector('popup__form')
	}

	_getInputValues() {
    this._formValues = {};
		this._formValues = this._form.querySelectorAll('.popup__input').forEach( (input) => { this._formValues[input.name] = input.value
	});
}

	setEventListeners() {
		super.setEventListeners();
		this._form.addEventListener('submit', this._handleFormSubmit.bind(this));
	}

	close() {
		super.close();
		this._form.reset();
	}
}