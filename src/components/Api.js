export default class Api {
  constructor({ baseUrl, authorization }) {
    this._baseUrl = baseUrl;
    this._authorization = authorization;
  }

  getUserInfo() {
    return fetch(`${this._baseUrl + "/users/me"}`, {
      headers: {
        authorization: this._authorization,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  getInitialCards() {
    return fetch(`${this._baseUrl + "/cards"}`, {
      headers: {
        authorization: this._authorization,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  editUserInfo({ name, about }) {
    return fetch(`${this._baseUrl + "/users/me"}`, {
      method: "PATCH",
      headers: {
        authorization: this._authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  editUserAvatar({ avatar }) {
    return fetch(`${this._baseUrl + "/users/me/avatar"}`, {
      method: "PATCH",
      headers: {
        authorization: this._authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  createCard(name, link) {
    return fetch(`${this._baseUrl + "/cards"}`, {
      method: "POST",
      headers: {
        authorization: this._authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl + "/cards/" + cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._authorization,
      },
    });
  }

  likeCard(cardId) {
    return fetch(`${this._baseUrl + "/cards/" + cardId + "/likes"}`, {
      method: "PUT",
      headers: {
        authorization: this._authorization,
      },
    });
  }

  deleteLikeCard(cardId) {
    return fetch(`${this._baseUrl + "/cards/" + cardId + "/likes"}`, {
      method: "DELETE",
      headers: {
        authorization: this._authorization,
      },
    });
  }
}
