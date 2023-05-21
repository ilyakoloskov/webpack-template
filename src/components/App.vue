<template>
  <h1>{{ message }}</h1>
  <button @click="count++">Count is: {{ count }}</button>
</template>

<script>
export default {
  data() {
    return {
      count: 0,
      message: 'Hello Vue',
    }
  },
}
</script>

<style scoped>
button {
  font-weight: bold;
}
</style>
