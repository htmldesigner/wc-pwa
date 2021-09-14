<template>
  <v-container>
    <h2 class="mb-3">Список потребителей</h2>
    <v-layout >
      <v-flex xs12>
        <v-card
            class="elevation-4"
            mb-5
            v-for="task in tasks.items"
            :key="task.id"
            :to="'/task/' + task.id"
        >
          <v-layout mb-3>
            <v-card-text>
              <h3>{{ task.name }}</h3>
              <Address>{{ task.address }}</Address>
              <span>Последняя поверка: {{ task.lastCheck }}</span>
            </v-card-text>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout v-if="!loading && !tasks" mt-2>Нет потребителей</v-layout>
  </v-container>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  computed: {
    isAgentLoggedIn(){
      return this.$store.getters.isAgentLoggedIn
    },
    tasks(){
      return this.$store.getters.tasks
    },
    loading(){
      return this.$store.getters.loading
    }
  }
};
</script>

