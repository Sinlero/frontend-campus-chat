<template>
  <div>
    <ChatList/>
    <Dialog/>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
import ChatList from "@/components/chat/ChatList";
import Dialog from "@/components/chat/Dialog";
import {onMounted, onDeactivated} from "vue";
import {useStore} from "vuex";
export default {
  name: 'App',
  components: {
    ChatList,
    Dialog
  },
  setup() {
    const store = useStore();
    function logout() {
      store.dispatch("logout");
    }
    onMounted(() => {
      let credentials = {login: "1652", password: "y6hyfk"};
      store.dispatch("auth", credentials);
    })
    // onUnmounted(() => store.dispatch("logout"))
    onDeactivated(() => store.dispatch("logout"))
    return {
      logout
    }
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
</style>
