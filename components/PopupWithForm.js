import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
		super(popupSelector);
		this._handleFormSubmit = handleFormSubmit;
		this._form  = this._popup.querySelector('.popup__form');
	}

getInputValues() {
  const formValues = {};
	this._inputs = this._form.querySelectorAll('.popup__input')
	this._inputs.forEach( (input) => { 
		formValues[input.name] = input.value;
	});
	return formValues;
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