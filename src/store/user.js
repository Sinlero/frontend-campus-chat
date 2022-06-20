import ChatApi from "../chatApi/chatApi";
import { Socket } from "phoenix-socket";

export default {
  state: {
    user: {},
    token: "",
    socket: null,
    channels: [],
  },

  getters: {
    chatUser: (state) => state.user,
    token: (state) => state.token,
    socket: (state) => state.socket,
    channels: (state) => state.channels,
    channel: (state) => (dialogId) => state.socket.channels.find((channel) => channel.topic === "room:" + dialogId),
  },

  actions: {
    async auth({ commit, state, dispatch, rootGetters }, credentials) {
      await ChatApi.auth(credentials).then((resp) =>
        commit("updateUser", resp.data)
      );
      await ChatApi.getRooms().then((resp) => commit("updateDialogs", resp));
      await ChatApi.getToken().then((resp) => {
        commit("setToken", resp);
      });
      commit("creteSocket", {token: state.token, dialogs: rootGetters.dialogs});
      state.socket.channels.forEach(channel => channel.on("new_msg", payload => {
        dispatch("addMessage", payload)
      }))
    },
    logout({ commit }) {
      ChatApi.logout().then(() => commit("updateUser", null));
    },
    logFromUsers({ rootState }) {
      console.log(rootState.chat.dialogs);
    }
  },

  mutations: {
    updateUser(state, user) {
      state.user = user;
    },
    setToken(state, token) {
      state.token = token;
    },
    creteSocket(state, {token, dialogs}) {
      state.socket = new Socket(ChatApi.socketURL, {
        params: { token: token },
      });
      state.socket.connect();
      state.channels = dialogs.map(dialog => {
        let createdChannel = state.socket.channel("room:" + dialog.id, {});
        createdChannel.join()
            .receive("ok", resp => {console.log("Successful join to channel", resp)})
            .receive("error", resp => (console.log("Join failure", resp)))
      });
    },
  },
};
