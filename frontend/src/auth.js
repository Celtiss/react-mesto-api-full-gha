export const BASE_URL = 'api-mesto.temirbekova.nomoredomains.monster';

export const signUp  =  (email, password) =>  {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: `${email}`,     
            password: `${password}`
        })
    })
    .then( (res) => {
        if(res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
    }; 

export const signIn  =  (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: `${email}`,     
            password: `${password}`
        })
    })
    .then( (res) => {
        if(res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
}

export const checkToken = (jwt) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers:{
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${jwt}`
        },
        credentials: "include",
    })
    .then( (res) => {
        if(res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
}