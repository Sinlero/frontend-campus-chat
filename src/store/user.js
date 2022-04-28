import ChatApi from "@/chatApi/chatApi"; ChatApi

export default {
    state: {
        user: {},
        token: null,
        socket: null,
        channels: []
    },
    getters: {
        user (state) {return state.user},
        token (state) {return state.token},
        socket (state) {return state.socket},
        channels (state) {return state.channels},
        channel (state, id) {return state.channels.find(channel => channel.id === id)}
    },
    actions: {
        auth({commit}, credentials) {
            ChatApi.auth(credentials).then((resp) => commit("updateUser", resp.data))
        },
        logout({commit}) {
            ChatApi.logout().then(() => commit("updateUser", null))
        }
    },
    mutations: {
        updateUser(state, user) {
            state.user = user
        }
    },
};