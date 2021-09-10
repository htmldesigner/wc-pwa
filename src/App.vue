<template>
  <v-app id="inspire">
    <v-app-bar dark color="primary" app>
      <v-btn v-if="$route.path !== '/'"
             fab
             text
             small
             @click="$router.go(-1)"
             style="width: 0; margin-left: 10px; margin-right: 30px"
      >
        <v-icon dark>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>{{ appName }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              fab
              text
              small
              v-bind="attrs"
              v-on="on"
              style="width: 0; margin-left: 10px; margin-right: 10px"
          >
            <v-icon dark>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list flat>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title @click="reloadAllList">{{ 'Обнавить данные' }}</v-list-item-title>
              <v-list-item-subtitle style="font-size: 12px">Список потребителей</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-title @click="$router.push('/settings')">{{ 'Настройки' }}</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title @click="logOut">{{ 'Выход' }}</v-list-item-title>
          </v-list-item>
        </v-list>

      </v-menu>

    </v-app-bar>
    <v-main>
      <div v-if="!loading">
        <router-view></router-view>
      </div>
      <div v-else>
        <v-container fluid class="mt-16">
          <v-row justify="center" align="center">
            <Spinner></Spinner>
          </v-row>
        </v-container>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import Snackbar from "./components/Snackbar.vue";
import {mapGetters} from 'vuex';
import Spinner from "./components/Spinner";

export default {
  components: {
    Snackbar, Spinner
  },
  computed: {
    ...mapGetters(['loading', 'appName'])
  },
  data() {
    return {};
  },
  methods: {
    async logOut() {
      await this.$store.dispatch('logOut')
      await this.$router.push('/login');
    },
    async reloadAllList() {
      await this.$store.dispatch('getTaskList')
    },

  },
  async mounted() {
    await this.$store.dispatch('getTaskList')
  }
};
</script>

