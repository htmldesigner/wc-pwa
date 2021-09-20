<template>

  <v-container>
    <v-row>
      <v-col
          cols="12" class="pa-0"
      >
        <v-text-field
            v-model="inputValue"
            solo
            label="Поиск..."
            clearable
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