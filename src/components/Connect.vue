<template>

  <div id="connect-method">
    <button @click="ping">{{pingPongButton}}!!!</button>
    <br>
    <p>Current chat: {{room}}</p>
    <input v-model="room" placeholder="chat name"/>
    <br>
    <button @click="join">Join chat</button>
    <br>
    <div v-for="item in items" :key="item.id">
      {{item.body}}
    </div>
    <br>
    <textarea v-model="message" placeholder="Write your message here!!!"></textarea>
    <br>
    <button @click="sendMsg">Send message</button>
  </div>

</template>

<script>

import {Socket} from 'phoenix-socket'

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
      items: []
    }
  },
  mounted() {
    console.log("Connect via websocket");
    this.socket = new Socket("ws://192.168.202.104:4000/socket");
    this.socket.connect();
  },
  methods: {
    ping() {
      this.channel.push("ping")
          .receive("ok", () => { this.pingPongButton === 'Ping' ? this.pingPongButton = 'Pong' : this.pingPongButton = 'Ping' })
          .receive("error", err => console.log("phoenix errored", err))
          .receive("timeout", () => console.log("timed out pushing"))
    },
    join() {
      console.log("Joining to channel: " + this.room);
      this.channel = this.socket.channel('room:' + this.room,{});
      this.channel.on("new_msg", payload => {
        this.items.push(payload);
      })
      this.channel.join()
          .receive("ok", resp => { console.log("Joined successfully", resp) })
          .receive("error", resp => { console.log("Unable to join", resp) });
    },
    sendMsg() {
      this.channel.push("new_msg", {id: this.counter, body: this.message})
          .receive("ok", payload => console.log("phoenix replied:", payload))
          .receive("error", err => console.log("phoenix errored", err))
      this.message = "";
      this.counter++;
    }
  }
}
</script>

<style scoped>

</style>