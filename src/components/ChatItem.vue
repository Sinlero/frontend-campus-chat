<template>
  <div>
    <h2>{{ name }}</h2>
    <div v-if="sender !== ''" class="last_message">
      <p>{{ sender }}: </p>
      <p>{{ previewMsg }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChatItem",
  props: {
    name: String,
    sender: String,
    previewMsg: String,
  },
};
</script>

<style scoped>

.last_message {
  @apply flex justify-evenly;
}

</style>
