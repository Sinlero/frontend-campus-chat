<template>
  <v-container>
    <v-row >
        <v-text-field
            v-model="login"
            label="Login"
            hide-details="auto"
        ></v-text-field>
    </v-row>
    <v-row>
      <v-text-field
          v-model="password"
          :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
          :type="passwordShow ? 'text' : 'password'"
          name="input-10-2"
          label="Password"
          value=""
          class="input-group--focused"
          @click:append="passwordShow = !passwordShow"
      ></v-text-field>
    </v-row>
    <v-row>
      <v-col>
        <v-btn
            color="primary"
            v-on:click="authorize">
          Login
        </v-btn>
      </v-col>
      <v-col>
        <v-btn
            color="error"
            v-on:click="logout"
            :disabled = "!logged">
          Logout
        </v-btn>
      </v-col>
      <v-col>
        <v-btn
            v-on:click="echo"
            :disabled = "!logged">
          Echo
        </v-btn>
      </v-col>
    </v-row>
    <v-row justify="center" align-content="center">
      <v-text-field
        v-model="room"
        filled
        label="Current chat room"
        clearable></v-text-field>
      <v-btn
          v-on:click="join"
          :disabled = "!logged">
        Join chat
      </v-btn>
      <v-btn
          v-on:click="ping"
          :disabled = "!logged">
        {{pingPongButton}}
      </v-btn>
    </v-row>
    <v-row v-for="item in items" :key="item.id">
      {{item.body}}
    </v-row>
    <v-row>
      <v-textarea
          v-model="message"
          name="input-7-1"
          filled
          label="Text of message"
          auto-grow
          value=""
      ></v-textarea>
    </v-row>
    <v-row>
      <v-btn
          color="primary"
          :disabled = "!logged"
          v-on:click="sendMsg">
        Send message
      </v-btn>
    </v-row>
  </v-container>
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
      token: '',
      passwordShow: false
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
      this.socket = new Socket(API.socketURL, {params: {token: this.token}});
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
      };
      API.auth(auth).then(() => API.getToken().then(resp => (this.token = resp.data)))
                    .then(() => this.logged = true);
    },
    logout() {
      API.logout().then( () => this.logged = false);
    },
    echo() {
      API.getEcho();
    }
  }
}
</script>

<style scoped>
</style>