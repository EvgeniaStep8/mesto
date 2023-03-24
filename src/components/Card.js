export default class Card {
  constructor({ name, link, likes, _id }, isCardLikeOwner, isOwnerCard, templateSelector, handleLikeCard, handleClickImage,handleDeleteCard) {
    this._name = name;
    this._link = link;
    this._id = _id;
    this.isCardLikeOwner = isCardLikeOwner;
    this._isOwnerCard = isOwnerCard;
    this._numbersOfLikes = likes.length;
    this._templateSelector = templateSelector;
    this._handleLike = handleLikeCard;
    this._handleClickImage = handleClickImage;
    this._handleDeleteCard = handleDeleteCard;
  }

  _addEventListeners() {
    this._cardLikeButton
    .addEventListener('click', () => {
      this._handleLike(this._id, this);
    });

    this._deleteButton
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

  _renderLikeState(isCardLikeOwner) {
    if(isCardLikeOwner) {
      this.activateLikeState();
    }
  }

  activateLikeState() {
    this._cardLikeButton.classList.add('card__like_active');
  }

  deactivateLikeState() {
    this._cardLikeButton.classList.remove('card__like_active');
  }

  _hideDeleteButton(isOwnerCard) {
    if(!isOwnerCard) {
      this._deleteButton.remove();
    }
  }

  updateCardLikeCounter(count) {
    this._likeCounter = this._card.querySelector('.card__like-counter');
    this._likeCounter.textContent = count;
  }

  createCard() {
    this._card = this._getTemplate();

    this._card.querySelector('.card__title').textContent = this._name;
    this._image = this._card.querySelector('.card__image');
    this._image.src = this._link;
    this._image.alt = this._name;

    this.updateCardLikeCounter(this._numbersOfLikes);
    this._cardLikeButton = this._card.querySelector('.card__like');
    this._renderLikeState(this.isCardLikeOwner);

    this._deleteButton = this._card.querySelector('.card__delete');
    this._hideDeleteButton(this._isOwnerCard);
    
    this. _addEventListeners();

    return this._card;
  }

  removeCard(card) {
    card.remove();
    card = null;
  }
}