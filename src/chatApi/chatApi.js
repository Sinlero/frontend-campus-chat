import axios from 'axios';

const port = 4001;

const baseURL   = `https://${location.hostname}:${port}/api`;
const socketURL =   `wss://${location.hostname}:${port}/socket`;

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
    socketURL,
    baseURL,
    getEcho() {
        return API.get(`/echo`);
    },
    logout() {
        return API.delete(`/login`);
    },
    getToken() {
        return API.get(`/token`).then((resp) => {return resp.data.token});
    },
    getRooms() {
        return API.get('/chat/rooms').then((resp) => resp.data);
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
