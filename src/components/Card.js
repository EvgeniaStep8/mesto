export default class Card {
  constructor({ name, link, likes, _id }, templateSelector, handleLikeCard, handleClickImage,handleDeleteCard) {
    this._name = name;
    this._link = link;
    this._id = _id;
    this._numbersOfLikes = likes.length;
    this._templateSelector = templateSelector;
    this._handleLike = handleLikeCard;
    this._handleClickImage = handleClickImage;
    this._handleDeleteCard = handleDeleteCard;
  }

  _addEventListeners() {
    this._cardLikeButton = this._card.querySelector('.card__like');

    this._cardLikeButton
    .addEventListener('click', () => {
      this._handleLike(this._id, this._cardLikeButton, this._likeCounter);
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
    this._likeCounter = this._card.querySelector('.card__like-counter')
    this._likeCounter.textContent = this._numbersOfLikes;

    this. _addEventListeners();

    return this._card;
  }

  removeCard(card) {
    card.remove();
    card = null;
  }
}