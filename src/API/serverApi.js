import axios from 'axios';

const api = 'http://192.168.0.105:4000/api';
// const api = 'http://localhost:4000/api';

const baseURL = `${api}`;

const API = axios.create({
    withCredentials: true,
    baseURL,
    headers: {
        "X-Requested-With": "XMLHttpRequest",
        "Access-Control-Allow-Origin": "*",
        "Accept": "application/json",
        "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
        "Access-Control-Allow-Headers": "Authorization,Content-Type,Accept,Origin,User-Agent,DNT,Cache-Control,X-Mx-ReqToken,Keep-Alive,X-Requested-With,If-Modified-Since,X-CSRF-Token",
        "Set-Cookie": "SameSite=None;"
    }
});


export default {
    api,
    getEcho() {
      return API.get(`/echo`);
    },
    logout() {
      return API.delete(`/login`);
    },
    getToken() {
      return API.get(`/token`);
    },
    auth(auth) {
        try {
            const response = API.post('/login', {
                login: auth.login,
                password: auth.password
            }, {
                credentials: 'same-origin', withCredentials: true,
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Set-Cookie": "SameSite=None;",
                    'Authorization': 'Basic ' + btoa(`${auth.login}:${auth.password}`)
                }
            })
            return response;
        } catch (e) {
            return e;
        }
    }
}
