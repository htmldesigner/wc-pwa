<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" absolute temporary app>
      <!-- Menu -->
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item
          v-for="link of links"
          :key="link.title"
          :to="link.url"
          >
            <v-list-item-title><v-icon left>{{link.icon}}</v-icon>{{link.title}}</v-list-item-title>
          </v-list-item>

        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar dark color="primary" app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>{{appName}}</v-toolbar-title>
      <v-spacer></v-spacer>
    <v-btn
      :loading="loading"
      :disabled="loading"
      @click="loader = 'loading'"
      fab
      text 
      large
    
    >
      <v-icon dark>mdi-refresh</v-icon>
    </v-btn>
    </v-app-bar>

    <v-main>
      <!-- Main -->
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      loader: null,
      loading: false,
      group: null,
      drawer: null,
      links: [
        {title: 'Task List', icon: 'mdi-playlist-check', url: '/'},
        {title: 'Profile', icon: 'mdi-account', url: '/profile'},
        {title: 'Settings', icon: 'mdi-cog-outline', url: '/settings'},
      ]
    };
  },
  computed: {
        appName () {
            return this.$store.state.appName
        }
  },
  watch: {

    group() {
      this.drawer = false;
    },
    async loader () {
        const l = this.loader
        this[l] = !this[l]
        setTimeout(() => (this[l] = false), 3000)
        this.loader = null
    },
  },
  created() {
  if (this.$workbox) {
    this.$workbox.addEventListener("waiting", () => {
      this.showUpdateUI = true;
    });
  }
}
};
</script>

<style lang="scss">
</style>
