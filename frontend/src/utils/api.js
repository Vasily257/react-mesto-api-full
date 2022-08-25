class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
  }

  _handleResponse(res, errorText) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(errorText);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers,
    }).then((res) => {
      return this._handleResponse(res, 'Данные пользователя не получены');
    });
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers,
    }).then((res) => {
      return this._handleResponse(res, 'Список карточек не получен');
    });
  }

  getInitialData() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }

  editUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((res) => {
      return this._handleResponse(res, 'Данные пользователя не изменены');
    });
  }

  addNewCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((res) => {
      return this._handleResponse(res, 'Карточка не добавлена');
    });
  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then((res) => {
      return this._handleResponse(res, 'Карточка не удалена');
    });
  }

  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return fetch(`${this._url}/cards/${id}/likes`, {
        method: 'DELETE',
        headers: this._headers,
      }).then((res) => {
        return this._handleResponse(res, 'Лайк не убран');
      });
    } else {
      return fetch(`${this._url}/cards/${id}/likes`, {
        method: 'PUT',
        headers: this._headers,
      }).then((res) => {
        return this._handleResponse(res, 'Лайк не добавлен');
      });
    }
  }

  updateAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((res) => {
      return this._handleResponse(res, 'Аватар пользователя не изменен');
    });
  }
}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-41',
  headers: {
    authorization: 'b6bde9be-8674-4eca-8179-302e0a4e2b6f',
    'Content-Type': 'application/json',
  },
});
