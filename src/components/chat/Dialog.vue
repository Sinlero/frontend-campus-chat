<template>
  <div  v-if="dialog !== null">
    <div class="messages">
      <DialogMessage
          v-for="msg in dialog.messages"
          :class="isSender(msg)"
          :key="msg.id"
          :id="msg.id"
          :senderId="msg.sender_id"
          :text="msg.text"
          :time="msg.time"
      ></DialogMessage>
    </div>
    <MessageInput/>
  </div>
</template>

<script>
import MessageInput from "@/components/chat/MessageInput";
import DialogMessage from "@/components/chat/DialogMessage";
import {useStore} from "vuex";
import {computed} from "vue";

export default {
  name: "DialogComponent",
  components: {
    DialogMessage,
    MessageInput
  },
  setup() {
    const state = useStore();

    const isSender = (msg) => {
      if (msg.sender_id === state.getters.user.id) {
        return {sender: true};
      }
      return {chat_member: true};
    }

    return {
      dialog: computed(() => state.getters.currentDialog),
      user: computed(() => state.getters.user),
      isSender
    }
  }
}
</script>

<style scoped>
.messages {
  display: grid;
}

.sender {
  display: flex;
  color: teal;
  justify-content: end;
}

.chat_member {
  display: flex;
  justify-content: start;
  color: red;
}
</style>