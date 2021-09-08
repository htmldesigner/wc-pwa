<template>
  <div>
    <v-progress-circular
        :size="50"
        color="primary"
        indeterminate
    ></v-progress-circular>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "Spinner",
  computed: {
    ...mapGetters(['loading'])
  }
}
</script>

<style scoped>

</style>