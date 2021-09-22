<template>
  <v-snackbar v-model="active">
    {{ text }}
    <template v-slot:action="{ attrs }">
      <v-btn
          v-bind="attrs"
          color="pink"
          text
          @click="active = false"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {

  props: {
    text: String,
    active: Boolean
  },

}
</script>

