<template>
<div>
  <DialogMessage></DialogMessage>
  <DialogMessage></DialogMessage>
  <DialogMessage></DialogMessage>
  <DialogMessage></DialogMessage>
  <DialogMessage></DialogMessage>
  <DialogMessage></DialogMessage>
  <MessageInput/>
</div>
</template>

<script>
import MessageInput from "@/components/chat/MessageInput";
import DialogMessage from "@/components/chat/DialogMessage";
export default {
  name: "DialogComponent",
  components: {
    DialogMessage,
    MessageInput
  }
}
</script>

<style scoped>

</style>