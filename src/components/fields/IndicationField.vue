<template>
  <div>
    <v-text-field
        v-model.number="value"
        :counter="8"
        label="Текущие показания"
        prepend-icon="mdi-counter"
        type="number"
    ></v-text-field>
  </div>
</template>

<script>
export default {
  name: "IndicationField",
  data() {
    return {
      value: null
    }
  }
}
</script>

<style scoped>

</style>