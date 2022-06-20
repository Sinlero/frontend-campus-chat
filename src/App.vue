<template>
  <div className="chat">
    <ChatList class="chat_list"/>
    <Dialog class="dialog"/>
  </div>
</template>

<script>
import ChatList from "./components/ChatList.vue";
import Dialog from "./components/Dialog.vue";
import {onMounted} from "vue";
import {useStore} from "vuex";

export default {
  name: "App",
  components: {
    ChatList,
    Dialog,
  },
  setup() {
    const store = useStore();
    onMounted(() => {
      let credentials = {login: "1652", password: "y6hyfk"};
      store.dispatch("auth", credentials);
    });
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.chat {
  @apply flex;
}

.chat_list {
  @apply w-1/3 max-h-screen divide-y overflow-y-scroll p-4;
}

.dialog {
  @apply w-2/3 flex h-screen flex-col justify-end bg-gray-100;
}

.chat_list::-webkit-scrollbar {
  width: 7px;
  background-color: #ffffff;
}

.chat_list::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: #f9f9fd;
}

.chat_list::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #18aaaa;
}
</style>
