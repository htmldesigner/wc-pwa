<template>
  <v-container>
    <h2 class="mb-3">Список потребителей</h2>
    <Search @searchValue="searchValue"/>

    <v-layout>
      <v-flex xs12>
        <v-card
            v-for="(task, index) in tasks.items"
            :key="index"
            :to="'/task/' + task.id"
            class="elevation-4"
            mb-5
        >
          <v-layout mb-3>
            <v-card-text>
              <h3>{{ task.name }}</h3>
              <Address>{{ task.address }}</Address>
            </v-card-text>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout v-if="!loading && !tasks" mt-2>Нет потребителей</v-layout>
  </v-container>
</template>

<script>
import Search from "./Search";

const queryName = ['name', 'address']

export default {
  components: {Search},
  computed: {
    tasks() {
      return {
        items: this.$store.getters.tasks.items?.filter(task => {
          return task.name.toLowerCase().includes(this.query.toLowerCase())
        })
      }
    },
    loading() {
      return this.$store.getters.loading
    }
  },
  data() {
    return {
      query: ''
    }
  },
  methods: {
    searchValue(value) {
      if (value) {
        this.query = value
      } else {
        this.query = ''
      }
    }
  }
};
</script>

