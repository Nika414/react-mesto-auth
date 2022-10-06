export const BASE_URL = 'https://auth.nomoreparties.co/';

export const register = (password, email) => {
    return fetch(`${BASE_URL}signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password, email })
    })
        
}; 