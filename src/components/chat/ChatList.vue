<template>
<div>
    <ChatItem class="chat_item"
              v-for="dialog in dialogs"
              @click="selectDialog(dialog)"
              :key="dialog.id"
              :name="dialog.name"
              :preview-msg="getLastMessage(dialog.id).text"></ChatItem>
</div>
</template>

<script>
import ChatItem from "@/components/chat/ChatItem";
import {useStore} from "vuex";
import {computed, onMounted} from "vue";
export default {
  name: "ChatList",
  components: {ChatItem},
  setup() {
    const store = useStore();

    const getLastMessage = (chatId) => {
      return store.getters.lastMessage(chatId);
    }

    const selectDialog = (dialog) => {
      return store.dispatch("selectDialog", dialog);
    }

    onMounted(() => store.dispatch("fetchDialogs"))

    return {
      dialogs: computed(() => store.getters.dialogs),
      getLastMessage,
      selectDialog
    }
  }
}
</script>

<style scoped>
.chat_item {
  margin-top: 10px;
  margin-bottom: 10px;
  border: solid darkgrey;
}
.chat_item:hover{
  cursor: pointer;
  background: gainsboro;
}
</style>