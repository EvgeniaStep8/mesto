export default class Card {
  constructor({ name, link, likes }, templateSelector,  handleClickImage, handleDeleteCard) {
    this._name = name;
    this._link = link;
    this._numbersOfLikes = likes.length;
    this._templateSelector = templateSelector;
    this._handleClickImage = handleClickImage;
    this._handleDeleteCard = handleDeleteCard;
  }

  _handleLike() {
    this._cardLikeButton
    .classList
    .toggle('card__like_active');
  }

  _addEventListeners() {
    this._cardLikeButton = this._card.querySelector('.card__like');

    this._cardLikeButton
    .addEventListener('click', () => {
      this._handleLike();
    });

    this._card
    .querySelector('.card__delete')
    .addEventListener('click', () => {
      this._handleDeleteCard(this._card);
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
    this._card.querySelector('.card__like-counter').textContent = this._numbersOfLikes;

    this. _addEventListeners();

    return this._card;
  }

  removeCard(card) {
    card.remove();
    card = null;
  }
}