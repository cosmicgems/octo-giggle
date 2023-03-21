import fetch from 'isomorphic-fetch'
import { API } from '../config'

export const subscribeForm = (data) =>{
    let subscribeEndpoint;
    subscribeEndpoint = `${API}/subscribe`;
    return fetch(`${subscribeEndpoint}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type' :'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err));
};
