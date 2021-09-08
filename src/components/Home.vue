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
            :to="'/task/' + task.id"
        >
          <v-layout mb-3>
            <v-card-text>
              <h3>Ф.И.О {{task.title}}</h3>
              <Address>{{ task.adress }}</Address>
              <span>Последняя поверка: {{ task.lastCheck }}</span>
            </v-card-text>
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

