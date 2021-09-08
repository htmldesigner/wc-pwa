<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" absolute temporary app>
      <v-list nav dense>
        <v-list-item-group
            active-class="deep-purple--text text--accent-4"
        >
          <v-list-item v-for="link of links" :key="link.title" :to="link.url">
            <v-list-item-title
            >
              <v-icon left>{{ link.icon }}
              </v-icon
              >
              {{ link.title }}
            </v-list-item-title
            >
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar dark color="primary" app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>{{ appName }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
          @click="reloadAllList"
          :loading="loading"
          :disabled="loading"
          fab
          text
          small
      >
        <v-icon dark>mdi-refresh</v-icon>
      </v-btn>
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
    return {
      notify: [],
      drawer: null,
      links: [
        {title: "Списик потребителей", icon: "mdi-playlist-check", url: "/"},
        // {title: "Профиль", icon: "mdi-account", url: "/profile"},
        // {title: "Настройки", icon: "mdi-cog-outline", url: "/settings"},
      ],
    };
  },

  methods: {
    async reloadAllList() {
      await this.$store.dispatch('getTaskList')
    },

  },
  async mounted() {
    await this.$store.dispatch('getTaskList')
  }
};
</script>

