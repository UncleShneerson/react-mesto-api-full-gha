class Auth {
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

  signUp(userData) {
    return this._request(`/signup`, {
      method: "POST",
      body: JSON.stringify({
        password: userData.password,
        email: userData.email,
      }),
    });
  }

  signIn(userData) {
    return this._request(`/signin`, {
      method: "POST",
      body: JSON.stringify({
        password: userData.password,
        email: userData.email,
      }),
    });
  }

  signOut() {
    return this._request('/signout');
  }

  checkToken() {
    return this._request(`/users/me`, {
      method: "GET",
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
  // baseUrl: "http://localhost:3000",
});
