<template>
  <v-container>
    <h2 class="mb-3">Список потребителей</h2>
    <v-layout v-if="tasks">
      <v-flex xs12>
        <v-card
            class="elevation-4"
            mb-5
            v-for="task in tasks"
            v-bind:key="task.id"
        >
          <v-layout column mb-3>
            <v-card-text>
              <h3>Ф.И.О </h3>
              <Address>{{ task.adress }}</Address>
              <p>Последняя поверка: {{ task.lastCheck }}</p>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="info" small :to="'/task/' + task.id"><v-icon dark>mdi-arrow-right-bottom</v-icon></v-btn>
            </v-card-actions>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout v-if="!loading && !tasks.length" mt-2>Нет потребителей</v-layout>
  </v-container>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
  computed: {
    ...mapGetters(['tasks', 'loading'])
  }
};
</script>

