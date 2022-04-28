<template>
<div>
  <h2>{{name}}</h2>
  <p>{{previewMsg}}</p>
</div>
</template>

<script>
export default {
  name: "ChatItem",
  props: {
    name: String,
    previewMsg: String
  }
}
</script>

<style scoped>

</style>