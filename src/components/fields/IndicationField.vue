<template>
  <div>
    <v-text-field
        label="Текущие показания"
        type="number"
        prepend-icon="mdi-counter"
        v-model.number="value"
        :counter="8"
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