<template>
  <div class="input">
    <textarea v-model="textMessage" placeholder="Input message..."></textarea>
    <button class="send-button" @click="sendMsg">
      <img class="send-icon" src="../assets/send.png"/>
    </button>
  </div>
</template>

<script>
import sendIcon from "../assets/send.png";
import {useStore} from "vuex";
import {computed, ref} from "vue";

export default {
  name: "MessageInput",
  setup() {
    const state = useStore();

    const textMessage = ref("");

    function sendMsg() {
      const dialogId = state.getters.currentDialog.id;
      const senderId = state.getters.chatUser.id;
      let channel = state.getters.channel(dialogId);
      channel.push("new_msg", {room_id: dialogId, sender_id: senderId, text: textMessage.value});
      textMessage.value = "";
    }

    return {
      sendIcon,
      dialog: computed(() => state.getters.currentDialog),
      textMessage,
      sendMsg,
    };
  },
};
</script>

<style scoped>
.input {
  display: grid;
  grid-template-columns: auto 45px;
}

.send-button {
  height: 45px;
  border: none;
  color: white;
  background-color: teal;
  border-radius: 45px;
}

.send-button:hover {
  cursor: pointer;
}

.send-icon {
  @apply pl-2;
}
</style>
