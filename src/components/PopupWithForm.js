import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
		super(popupSelector);
		this._handleFormSubmit = handleFormSubmit;
		this._form  = this._popup.querySelector('.popup__form');
		this._inputs = this._form.querySelectorAll('.popup__input');
		this._submitButton = this._form.querySelector('.popup__save-button');
	}

_getInputValues() {
  const formValues = {};
	this._inputs.forEach( (input) => { 
		formValues[input.name] = input.value;
	});
	return formValues;
}

setEventListeners() {
	super.setEventListeners();
	this._form.addEventListener('submit',(evt) => {
    evt.preventDefault();
		this._handleFormSubmit(this._getInputValues());
	});
}

close() {
	super.close();
	this._form.reset();
}

renderPending(isPending) {
  if(isPending) {
		this._submitButton.textContent += '...';
	} else {
		this._submitButton.textContent = this._submitButton.textContent.replace('...', '');
	}
}
}