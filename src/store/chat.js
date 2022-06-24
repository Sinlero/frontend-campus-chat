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
    dialog: (state) => (chatId) => {
      return  state.dialogs.find((dialog) => dialog.id === chatId);
    },

    lastMessage: (state, getters) => (chatId) => {
      const dialog = getters.dialog(chatId);
      if (dialog.messages === null) {
        return null;
      }
      dialog.messages.sort(function (first, second) {
        if (first.id > second.id) {
          return 1;
        }
        return -1;
      });
      return dialog.messages[dialog.messages.length - 1];
    },

    lastMessageText: (state, getters) => (chatId) => {
      const msg = getters.lastMessage(chatId);
      if (msg === null) {
        return "";
      }
      return msg.text.substring(0, 40);
    },

    userName: (state, getters) => (lastMsg, chatId) => {
      const dialog = getters.dialog(chatId);
      if (lastMsg === null) {
        return "";
      }
      const user = dialog.users.find((user) => user.id === lastMsg.sender_id);
      return user.name;
    },

    dialogName: (state, getters) => (chatId) => {
      const dialog = getters.dialog(chatId);
      if (dialog.chat === true) {
        return dialog.name;
      }
      const companion = dialog.users.find((user) => user.id !== getters.chatUser.id);
      return companion.name;
    },
  },

  actions: {
    fetchDialogs({ commit }) {
      ChatApi.getRooms().then((resp) => commit("updateDialogs", resp));
    },
    selectDialog({ commit }, dialog) {
      commit("updateSelectedDialog", dialog);
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
      const dialog = state.dialogs.find(dialog => dialog.id === message.room_id);
      if (dialog.messages === null) {
        dialog.messages = new Array();
      }
      dialog.messages.push(message);
    },
  },
};
