<template>
  <div class="message">
    <v-alert
        prominent
        :type="notification.type"
    >
      {{ notification.message }}
    </v-alert>
  </div>
</template>

<script>
export default {
  name: "Notification",
  props: {
    notification: {
      type: Object
    }
  }
}
</script>

<style scoped>
.message {
  max-width: 400px;
  position: absolute;
  z-index: 500;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  margin-top: 50px;
  padding: 5px;
}
</style>