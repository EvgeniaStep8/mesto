import Popup from './Popup.js';

export default class PopupConfirm extends Popup{
  constructor(popupSelector, handleConfirm){
    super(popupSelector);
    this._handleConfirm = handleConfirm;
    this._button = this._popup.querySelector('.popup__save-button');
  }
  setEventListeners() {
    super.setEventListeners();
    this._button.addEventListener('click', () => this._handleConfirm());
  }

}