<template>
  <div class="message">
    <div class="sender_name">
      {{sender}}
    </div>
    <div class="msg">
      {{ text }}
    </div>
    <div class="time">
      {{ time.substring(11) }}
    </div>
  </div>
</template>

<script>

export default {
  name: "DialogMessage",
  props: {
    id: Number,
    sender: String,
    text: String,
    time: String,
  },
};
</script>

<style scoped>
.message {
 @apply m-2 max-w-max rounded-lg;
}
.sender_name {
  @apply flex p-1 text-sm;
}
.msg{
  @apply flex text-justify max-w-lg px-3;
}
.time{
  @apply flex justify-end pt-2 pr-1 text-xs;
}
</style>
