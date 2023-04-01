export default class Card {
  constructor(
    { name, link, likes, _id },
    isCardLikeOwner,
    isOwnerCard,
    templateSelector,
    handleLikeCard,
    handleClickImage,
    handleDeleteCard
  ) {
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
    this._cardLikeButton.addEventListener("click", () => {
      this._handleLike(this._id, this);
    });

    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteCard(this._id, this);
    });

    this._image.addEventListener("click", () => {
      this._handleClickImage(this._link, this._name);
    });
  }

  _getTemplate() {
    const card = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return card;
  }

  _renderLikeState() {
    if (this.isCardLikeOwner) {
      this._activateLikeState();
    }
  }

  _renderDeleteButtonState(isOwnerCard) {
    if (!isOwnerCard) {
      this._deleteButton.remove();
    }
  }

  _activateLikeState() {
    this._cardLikeButton.classList.add("card__like_active");
  }

  _deactivateLikeState() {
    this._cardLikeButton.classList.remove("card__like_active");
  }

  _updateCardLikeCounter(count) {
    this._likeCounter = this._card.querySelector(".card__like-counter");
    this._likeCounter.textContent = count;
  }

  updateLikes(count) {
    this._updateCardLikeCounter(count);
    if (this.isCardLikeOwner) {
      this._deactivateLikeState();
      this.isCardLikeOwner = false;
    } else {
      this._activateLikeState();
      this.isCardLikeOwner = true;
    }
  }

  createCard() {
    this._card = this._getTemplate();

    this._card.querySelector(".card__title").textContent = this._name;
    this._image = this._card.querySelector(".card__image");
    this._image.src = this._link;
    this._image.alt = this._name;

    this._updateCardLikeCounter(this._numbersOfLikes);
    this._cardLikeButton = this._card.querySelector(".card__like");
    this._renderLikeState();

    this._deleteButton = this._card.querySelector(".card__delete");
    this._renderDeleteButtonState(this._isOwnerCard);

    this._addEventListeners();

    return this._card;
  }

  removeCard() {
    this._card.remove();
    this._card = null;
  }
}
