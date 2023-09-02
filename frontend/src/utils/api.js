class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._token = headers["authorization"];
  }

  _request(endpoit, options) {
    return fetch(`${this._baseUrl}${endpoit}`, options).then(this._isItOk);
  }

  getInitialCards() {
    return this._request(`/cards`, {
      headers: this._headers,
    });
  }

  postCard(newCardData) {
    return this._request(`/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: newCardData.name,
        link: newCardData.link,
      }),
    });
  }

  deleteCard(cardId) {
    return this._request(`/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this._addLike(cardId);
    } else {
      return this._deleteLike(cardId);
    }
  }

  _addLike(cardId) {
    return this._request(`/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    });
  }

  _deleteLike(cardId) {
    return this._request(`/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  getUserInfo() {
    return this._request(`/users/me`, {
      headers: this._headers,
    });
  }

  editUserInfo(data) {
    return this._request(`/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
        avatar: data.avatar,
      }),
    });
  }

  editUserAvatar(data) {
    return this._request(`/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    });
  }

  _isItOk(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }
}

export const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-66",
  headers: {
    authorization: "d1a94a05-476b-47ad-bf8b-c677840ac343",
    "Content-Type": "application/json",
  },
});
