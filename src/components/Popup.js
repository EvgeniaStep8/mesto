export default class Popup {
	constructor(popupSelector) {
		this._popup = document.querySelector(popupSelector);
		this._handleEscUp = this._handleEscUp.bind(this);
    this._handleOverlayClick = this._handleOverlayClick.bind(this);
	}

	open() {
		this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscUp);
    this._popup.addEventListener('click', this._handleOverlayClick);
	}

	close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscUp);
    this._popup.removeEventListener('click', this._handleOverlayClick);
	}

	setEventListeners() {
		this._popup
		.querySelector('.popup__close')
		.addEventListener('click', this.close.bind(this));
	}

	_handleEscUp(evt) {
    if (evt.key === 'Escape') {
			this.close();
		}
	}

	_handleOverlayClick(evt) {
    if (evt.target === evt.currentTarget) {
			this.close();
		}
	}
}

