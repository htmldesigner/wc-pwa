<template>

  <v-container>
    <v-row>
      <v-col
          class="pa-0" cols="12"
      >
        <v-text-field
            v-model="inputValue"
            clearable
            label="Поиск..."
            solo
            @input="$emit('searchValue', inputValue)"
        ></v-text-field>
      </v-col>
    </v-row>
  </v-container>

</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      inputValue: '',
    }
  }
}
</script>

<style scoped>

</style>