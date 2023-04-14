class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }

    _getResFromServer() {
        return (res) => {
            if(res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    }

    getUserInfo () {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: this._headers
        })
        .then(this._getResFromServer());
    }

    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            method: 'GET',
            headers: this._headers
        })
        .then(this._getResFromServer());
    }

    updateUserInfo(name, job) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: `${name}`,
                about: `${job}`
            })
        })
        .then(this._getResFromServer());
    }

    addNewCard(data) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: `${data.popupName}`,
                link: `${data.popupImg}`
            })
        })
        .then(this._getResFromServer());
    }

    deleteCard(id) {
        return fetch(`${this._url}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers,
        })
        .then(this._getResFromServer());
    }
    
    setCardLikes(id) {
        return fetch(`${this._url}/cards/${id}/likes`, {
            method: 'PUT',
            headers: this._headers
        })
        .then(this._getResFromServer());
    }

    deleteCardLike(id) {
        return fetch(`${this._url}/cards/${id}/likes`, {
            method: 'DELETE',
            headers: this._headers,
        })
        .then(this._getResFromServer());
    }

    editAvatar(avatarUrl) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: `${avatarUrl}`
            }  
            )
        })
        .then(this._getResFromServer());
    }
}

const api = new Api ({
    url: 'https://mesto.nomoreparties.co/v1/cohort-52',
    headers: {
        'content-type': 'application/json',
        authorization: '88b8691a-7ac8-4b43-af84-6572693f6425'
    }
});

export {api};