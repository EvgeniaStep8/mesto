export default class Popup {
	constructor(popupSelector) {
		this._popup = document.querySelector(popupSelector);
	}

	open() {
		this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscUp.bind(this));
    this._popup.addEventListener('click', (evt) => {
      this._handleOverlayClick(evt);
		});
	}

	close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscUp.bind(this));
    this._popup.removeEventListener('click', this._handleOverlayClick.bind(this));
	}

	setEventListeners() {
		this._popup
		.querySelector('.popup__close')
		.addEventListener('click', close)
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

