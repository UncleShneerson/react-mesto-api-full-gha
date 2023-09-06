class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  _request(endpoit, options = {}) {
    return fetch(`${this._baseUrl}${endpoit}`, {
      ...options,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      }
    })
    .then(this._isItOk);
  }

  getInitialCards() {
    return this._request('/cards');
  }

  postCard(newCardData) {
    return this._request('/cards', {
      method: "POST",
      body: JSON.stringify({
        name: newCardData.name,
        link: newCardData.link,
      }),
    });
  }

  deleteCard(cardId) {
    return this._request(`/cards/${cardId}`, {
      method: "DELETE",
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
    });
  }

  _deleteLike(cardId) {
    return this._request(`/cards/${cardId}/likes`, {
      method: "DELETE",
    });
  }

  getUserInfo() {
    return this._request('/users/me');
  }

  editUserInfo(data) {
    return this._request('/users/me', {
      method: "PATCH",
      body: JSON.stringify({
        name: data.name,
        about: data.about,
        avatar: data.avatar,
      }),
    });
  }

  editUserAvatar(data) {
    return this._request('/users/me/avatar', {
      method: "PATCH",
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
  baseUrl: "https://api.uncles.fp.nomoredomainsicu.ru",
  // baseUrl: "http://localhost:3000",
});
