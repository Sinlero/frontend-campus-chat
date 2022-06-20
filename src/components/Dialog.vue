<template>
  <div class="dialog-container" v-if="dialog !== null">
    <div class="messages">
      <div
        v-for="msg in dialog.messages"
        :class="[containerClass(msg)]"
        :key="msg.id"
      >
        <DialogMessage
          :class="isSender(msg)"
          :id="msg.id"
          :sender="getSenderName(msg.sender_id, dialog.id)"
          :text="msg.text"
          :time="msg.time"
        ></DialogMessage>
      </div>
    </div>
    <MessageInput />
  </div>
</template>

<script>
import MessageInput from "./MessageInput.vue";
import DialogMessage from "./DialogMessage.vue";
import { useStore } from "vuex";
import { computed } from "vue";

export default {
  name: "DialogComponent",
  components: {
    DialogMessage,
    MessageInput,
  },
  setup() {
    const state = useStore();

    const isSender = (msg) => {
      if (msg.sender_id === state.getters.chatUser.id) {
        return { sender: true };
      }
      return { chat_member: true };
    };

    const containerClass = (msg) => {
      if (msg.sender_id === state.getters.chatUser.id) {
        return { sender_container: true };
      }
      return { chat_member_container: true };
    };

    const getSenderName = (senderId, chatId) => {
      return state.getters.userName(senderId, chatId);
    }

    return {
      dialog: computed(() => state.getters.currentDialog),
      user: computed(() => state.getters.chatUser),
      containerClass,
      isSender,
      getSenderName,
    };
  },
};
</script>

<style scoped>
.messages {
  @apply flex flex-col overflow-y-scroll;
}

.sender_container {
  @apply min-w-max container flex justify-end;
}

.chat_member_container {
  @apply container flex;
}

.sender {
  @apply bg-green-200;
}

.chat_member {
  @apply max-w-xs rounded-lg bg-gray-200;
}

.messages::-webkit-scrollbar {
  width: 7px;
  background-color: #ffffff;
}

.messages::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: #f9f9fd;
}

.messages::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #18aaaa;
}
</style>
