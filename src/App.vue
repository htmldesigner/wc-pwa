<template>
  <v-app id="inspire">


    <v-app-bar app color="primary" dark dense flat>
      <v-btn v-if="$route.path !== '/'"
             fab
             small
             style="width: 0; margin-left: 10px; margin-right: 30px"
             text
             @click="$router.go(-1)"
      >
        <v-icon dark>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>{{ appName }}</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-icon v-if="isOnline" dark>mdi-earth</v-icon>
      <v-spacer></v-spacer>

      <v-menu v-if="token && isOnline">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              v-bind="attrs"
              v-on="on"
              fab
              small
              style="width: 0; margin-left: 10px; margin-right: 10px"
              text
          >
            <v-icon dark>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list flat>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title @click="reloadAllList">{{ 'Обновить данные' }}</v-list-item-title>
              <v-list-item-subtitle style="font-size: 12px">Список потребителей</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <!--          <v-list-item>-->
          <!--            <v-list-item-title @click="$router.push('/settings')">{{ 'Настройки' }}</v-list-item-title>-->
          <!--          </v-list-item>-->
          <v-list-item>
            <v-list-item-title @click="logOut">{{ 'Выход' }}</v-list-item-title>
          </v-list-item>
        </v-list>

      </v-menu>

    </v-app-bar>

    <Notification v-if="alertMessage" :notification="alertMessage"/>
    <ConfirmLogOut @closeConfirmLogOut="confirmLogOut = false" :dialog="confirmLogOut"/>

    <v-main>
      <div v-if="!loading">
        <router-view></router-view>
      </div>
      <div v-else>
        <v-container class="mt-16" fluid>
          <v-row align="center" justify="center">
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
import Notification from "./components/Notification";
import ConfirmLogOut from "./components/Auth/ConfirmLogOut";


export default {
  components: {
    Snackbar, Spinner, Notification, ConfirmLogOut
  },
  computed: {
    ...mapGetters(['loading', 'appName', 'isOnline', 'token', 'alertMessage', 'tasks'])
  },

  watch: {
    isOnline: function (isOnline) {
      if (isOnline) {
        setTimeout(() => {
          this.$store.dispatch('sendTemporalData')
          this.timeInterval = setInterval(() => this.$store.dispatch('getTaskList'), (5000 * 12) * 15)
        }, 5000)
      } else {
        clearInterval(this.timeInterval)
      }
    }
  },

  data() {
    return {
      confirmLogOut: false,
      timeInterval: null
    }
  },

  methods: {
    logOut() {
      this.confirmLogOut = !this.confirmLogOut
    },
    async reloadAllList() {
      if (this.token)
        await this.$store.dispatch('getTaskList')
    }
  },
  async mounted() {

    if (navigator.onLine) {
      this.$store.dispatch('setOnline', navigator.onLine)
    }

    window.addEventListener('offline', () => {
      this.$store.dispatch('setOnline', false)
    });

    window.addEventListener('online', () => {
      this.$store.dispatch('setOnline', true)
    });

    await this.$store.dispatch('detectCoordinates')

    if (this.token)
      await this.$store.dispatch('getTaskList')
  }
};
</script>

<style>
html {
  /*touch-action: none*/
  overscroll-behavior: contain;
}
</style>

