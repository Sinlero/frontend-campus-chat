<template>
<div class="input">
  <textarea placeholder="Input message..."></textarea>
  <button class="send-button">Send</button>
</div>
</template>

<script>
export default {
  name: "MessageInput"
}
</script>

<style scoped>
.input{
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
</style>