<template>
<div>{{text}}</div>
</template>

<script>
export default {
  name: "DialogMessage",
  props: {
    id: Number,
    senderId: Number,
    text: String,
    time: String
  }
}
</script>

<style scoped>

</style>