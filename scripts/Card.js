export default class Card {
  constructor(data, templateSelector, popup, openPopup) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._popup = popup;
    this._openPopup = openPopup;
  }

  _handleLike() {
    this._card
    .querySelector('.card__like')
    .classList
    .toggle('card__like_active');
  }

  _handleDelete() {
    this._card
    .querySelector('.card__delete')
    .closest('.card')
    .remove();
  }

  _handleZoomImage() {
    this._openPopup(this._popup);
    this._popup
    .querySelector('.popup__image')
    .src = this._link;
    this._popup
    .querySelector('.popup__image')
    .alt = this._name;
    this._popup
    .querySelector('.popup__caption')
    .textContent = this._name;
  }

  _addEventListeners() {
    this._card
    .querySelector('.card__like')
    .addEventListener('click', () => {
      this._handleLike();
    });

    this._card
    .querySelector('.card__delete')
    .addEventListener('click', () => {
      this._handleDelete();
    })

    this._card
    .querySelector('.card__image')
    .addEventListener('click', () => {
      this._handleZoomImage();
    })
  }
  
  _getTemplate() {
    const card = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);
    return card;
  }

  createCard() {
    this._card = this._getTemplate();

    this._card.querySelector('.card__title').textContent = this._name;
    this._card.querySelector('.card__image').src = this._link;
    this._card.querySelector('.card__image').alt = this._name;

    this. _addEventListeners();

    return this._card;
  }
}