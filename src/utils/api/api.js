import handleResponce from "./utils";

class Api {
  constructor({ url, headers }) {
    this.url = url;
    this.headers = headers;
  }

  getAllData() {
    return Promise.all([this.getAllCards(), this.getUserData()]);
  }

  getAllCards() {
    return fetch(`${this.url}/cards`, {
      headers: this.headers,
    }).then((res) => handleResponce(res));
  }

  createCards(data) {
    return fetch(`${this.url}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(data),
    }).then((res) => handleResponce(res));
  }

  getUserData() {
    return fetch(`${this.url}/users/me `, {
      headers: this.headers,
    }).then((res) => handleResponce(res));
  }

  updateUserInfo(data) {
    return fetch(`${this.url}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(data),
    }).then((res) => handleResponce(res));
  }

  changeAvatar(data) {
    return fetch(`${this.url}/users/me/avatar`, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: this.headers,
    }).then((res) => handleResponce(res));
  }

  deleteCard(cardId) {
    return fetch(`${this.url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.headers,
    }).then((res) => handleResponce(res));
  }

  changeLikeCardStatus(id, isLiked) {
    if (!isLiked) {
      return fetch(`${this.url}/cards/${id}/likes`, {
        method: 'PUT',
        headers: this.headers,
      }).then((res) => handleResponce(res));
    } else {
      return fetch(`${this.url}/cards/${id}/likes`, {
        method: 'DELETE',
        headers: this.headers,
      }).then((res) => handleResponce(res));
    }
  }

  _handleResponce(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  }
}

export const apiData = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-58',
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    authorization: '54338beb-6a3f-46f8-bd6b-cdb1bf1c9692',
  },
});
