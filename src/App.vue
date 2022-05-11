<template>
  <div class="chat">
    <ChatList class="chat_list"/>
    <Dialog class="dialog"/>
  </div>
</template>

<script>
import ChatList from "@/components/chat/ChatList";
import Dialog from "@/components/chat/Dialog";
import {onMounted} from "vue";
import {useStore} from "vuex";
export default {
  name: 'App',
  components: {
    ChatList,
    Dialog
  },
  setup() {
    const store = useStore();
    onMounted(() => {
      let credentials = {login: "1652", password: "y6hyfk"};
      store.dispatch("auth", credentials);
    })
  }

}
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
  display: grid;
  grid-template-columns: 1fr 2fr;
}
.chat_list {
  display: grid;
}
</style>
