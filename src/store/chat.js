import ChatApi from "@/chatApi/chatApi";

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
        dialogs:[],
        selectedDialog: null
    },
    getters: {
        dialogs: (state) => state.dialogs,
        currentDialog: (state) => state.selectedDialog,
        lastMessage: (state) => (chatId) => {
            const dialog = state.dialogs.find(dialog => dialog.id === chatId);
            dialog.messages.sort(function (first, second) {
                if (first.id > second.id) {
                    return 1;
                }
                return -1;
            })
            return dialog.messages[dialog.messages.length - 1];
        }
    },
    actions: {
        fetchDialogs({commit}) {
            ChatApi.getRooms().then((resp) => commit("updateDialogs", resp));
        },
        selectDialog({commit}, dialog) {
            commit("updateSelectedDialog", dialog);
        }
    },
    mutations: {
        updateDialogs(state, dialogs) {
            state.dialogs = dialogs;
        },
        updateSelectedDialog(state, dialog) {
            state.selectedDialog = dialog;
        }
    },
};