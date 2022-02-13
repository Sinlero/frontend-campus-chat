<template>

  <div id="connect-method">

    <div class="auth">
      <label>Login</label>
      <input v-model="login" placeholder="login">
      <label>Password</label>
      <input v-model="password" placeholder="password" type="password">
      <button class="authButton" @click="authorize">Login</button>
      <button v-show="logged" class="logoutButton" @click="logout">Logout</button>
      <button v-show="logged" class="logoutButton" @click="echo">Echo</button>
    </div>

    <button @click="ping">{{ pingPongButton }}!!!</button>
    <br>
    <p>Current chat: {{ room }}</p>
    <input v-model="room" placeholder="chat name"/>
    <br>
    <button @click="join">Join chat</button>
    <br>
    <div v-for="item in items" :key="item.id">
      {{ item.body }}
    </div>
    <br>
    <textarea v-model="message" placeholder="Write your message here!!!"></textarea>
    <br>
    <button @click="sendMsg">Send message</button>
  </div>

</template>

<script>

import {Socket} from 'phoenix-socket'
import API from '../API/serverApi'

export default {
  name: "Connect",
  data() {
    return {
      counter: 0,
      room: '',
      message: '',
      socket: null,
      channel: null,
      pingPongButton: 'Ping',
      items: [],
      login: '',
      password: '',
      logged: false,
      token: ''
    }
  },
  mounted() {
  },
  methods: {
    ping() {
      this.channel.push("ping")
          .receive("ok", () => {
            this.pingPongButton === 'Ping' ? this.pingPongButton = 'Pong' : this.pingPongButton = 'Ping'
          })
          .receive("error", err => console.log("phoenix errored", err))
          .receive("timeout", () => console.log("timed out pushing"))
    },
    join() {

      console.log("Connect via websocket");
      this.socket = new Socket("ws://192.168.0.105:4000/socket", {params: {token: this.token}});
      this.socket.connect();

      console.log("Joining to channel: " + this.room);
      this.channel = this.socket.channel('room:' + this.room, {});
      this.channel.on("new_msg", payload => {
        this.items.push(payload);
      })
      this.channel.join()
          .receive("ok", resp => {
            console.log("Joined successfully", resp)
          })
          .receive("error", resp => {
            console.log("Unable to join", resp)
          });
    },
    sendMsg() {
      this.channel.push("new_msg", {id: this.counter, body: this.message})
          .receive("ok", payload => console.log("phoenix replied:", payload))
          .receive("error", err => console.log("phoenix errored", err))
      this.message = "";
      this.counter++;
    },
    authorize() {
      let auth = {
        login: this.login,
        password: this.password
      }
      API.auth(auth).then(() => API.getToken().then(resp => (this.token = resp.data)))
      this.logged = true;
    },
    logout() {
      API.logout()
      this.logged = false;
    },
    echo() {
      API.getEcho()
    }
  }
}
</script>

<style scoped>
.auth {
  justify-content: center;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 100px 250px;
  grid-template-rows: 1fr 1fr 1fr;
  padding-bottom: 20px;
}
.authButton {
  grid-column: span 2;
}
</style>