export default class Card {
  constructor(name, link, templateSelector, handleClickImage) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleClickImage = handleClickImage;
  }

  _handleLike() {
    this._card
    .querySelector('.card__like')
    .classList
    .toggle('card__like_active');
  }

  _handleDelete() {
    this._card.remove();
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

    this._image
    .addEventListener('click', () => {
      this._handleClickImage(this._link, this._name);
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
    this._image = this._card.querySelector('.card__image');
    this._image.src = this._link;
    this._image.alt = this._name;

    this. _addEventListeners();

    return this._card;
  }
}