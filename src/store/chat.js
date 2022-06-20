import ChatApi from "../chatApi/chatApi";

export default {
  state: {
    /*
            dialogs: [
                id: number,
                name: string,
                messages: [
                    {
                        id: number,
                        sender_id: number,
                        text: string,
                        time: timestamp
                     }, ...
                ],
                users: []
            ]
             */
    dialogs: [],
    selectedDialog: null,
  },
  getters: {
    dialogs: (state) => state.dialogs,
    textMessage: (state) => state.textMessage,
    currentDialog: (state) => state.selectedDialog,
    lastMessage: (state) => (chatId) => {
      const dialog = state.dialogs.find((dialog) => dialog.id === chatId);
      if (dialog.messages === null) {
        return "";
      }
      dialog.messages.sort(function (first, second) {
        if (first.id > second.id) {
          return 1;
        }
        return -1;
      });
      return dialog.messages[dialog.messages.length - 1];
    },
    userName: (state) => (userId, chatId) => {
      const dialog = state.dialogs.find((dialog) => dialog.id === chatId);
      const user = dialog.users.find((user) => user.id === userId);
      return user.name;
    },
  },
  actions: {
    fetchDialogs({ commit }) {
      ChatApi.getRooms().then((resp) => commit("updateDialogs", resp));
    },
    selectDialog({ commit }, dialog) {
      commit("updateSelectedDialog", dialog);
    },
    logState({ rootState }) {
      console.log(rootState);
    },
    addMessage({ commit }, message) {
      commit("updateMessages", message);
    },
  },
  mutations: {
    updateDialogs(state, dialogs) {
      state.dialogs = dialogs;
    },
    updateSelectedDialog(state, dialog) {
      state.selectedDialog = dialog;
    },
    updateMessages(state, message) {
      state.dialogs.find(dialog => dialog.id === message.room_id).messages.push(message);
    },
  },
};
