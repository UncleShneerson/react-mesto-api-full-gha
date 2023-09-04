class Auth {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _request(endpoit, options) {
    return fetch(`${this._baseUrl}${endpoit}`, options).then(this._isItOk);
  }

  signUp(userData) {
    return this._request(`/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        password: userData.password,
        email: userData.email,
      }),
    });
  }

  signIn(userData) {
    return this._request(`/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        password: userData.password,
        email: userData.email,
      }),
    });
  }

  checkToken(token) {
    return this._request(`/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }

  _isItOk(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res.status);
    }
  }
}

export const auth = new Auth({
  baseUrl: "https://api.uncles.fp.nomoredomainsicu.ru",
  headers: {
    "Content-Type": "application/json",
  },
});
