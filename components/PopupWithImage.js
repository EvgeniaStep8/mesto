import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor(popupSelector, link, name) {
		super(popupSelector);
		this._link = link;
		this._name = name;
	}

	open() {
		super.open();
		this._popupImage = this._popup.querySelector('.popup__image');
		this._popupImage.src = this._link;
    this._popupImage.alt = this._name;
    this._popup.querySelector('.popup__caption').textContent = this._name;
	}
}