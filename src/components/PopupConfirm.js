import Popup from './Popup.js';

export default class PopupConfirm extends Popup {
  constructor(popupSelector, handleConfirm, card){
    super(popupSelector);
    this._handleConfirm = handleConfirm;
    this._button = this._popup.querySelector('.popup__save-button');
    this._card = card;
  }

  setEventListeners() {
    super.setEventListeners();
    this._button.addEventListener('click', () => {
      this._handleConfirm(this._card);
      this.close();
    });
  }
}