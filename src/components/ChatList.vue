<template>
  <div class="chats">
    <ChatItem
      class="chat_item"
      v-for="dialog in dialogs"
      @click="selectDialog(dialog)"
      :key="dialog.id"
      :name="dialog.name"
      :sender="getSenderName(getLastMessage(dialog.id).sender_id, dialog.id)"
      :preview-msg="getLastMessage(dialog.id).text.substring(0, 40)"
    ></ChatItem>
  </div>
</template>

<script>
import ChatItem from "./ChatItem.vue";
import { useStore } from "vuex";
import { computed } from "vue";
export default {
  name: "ChatList",
  components: { ChatItem },
  setup() {
    const store = useStore();

    const getLastMessage = (chatId) => {
      return store.getters.lastMessage(chatId);
    };

    const getSenderName = (senderId, chatId) => {
      return store.getters.userName(senderId, chatId);
    }

    const selectDialog = (dialog) => {
      return store.dispatch("selectDialog", dialog);
    };

    return {
      dialogs: computed(() => store.getters.dialogs),
      lastMessage: computed(() => store.getters.lastMessage(store.getters.currentDialog.id)),
      getLastMessage,
      selectDialog,
      getSenderName,
    };
  },
};
</script>

<style scoped>
.chats {
  @apply max-h-screen overflow-y-scroll divide-y divide-gray-800;
}
.chat_item {
  @apply p-2 cursor-pointer hover:bg-gray-100;
}
</style>
