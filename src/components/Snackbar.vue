<template>
  <v-snackbar v-model="active">
    {{ text }}
    <template v-slot:action="{ attrs }">
      <v-btn
        color="pink"
        text
        v-bind="attrs"
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

