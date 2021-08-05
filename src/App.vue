<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" absolute temporary app>
      <!-- Menu -->
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item v-for="link of links" :key="link.title" :to="link.url">
            <v-list-item-title
              ><v-icon left>{{ link.icon }}</v-icon
              >{{ link.title }}</v-list-item-title
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

      <v-card v-for="n in notify" :key="n.id">
        <td><Snackbar :text="n.text" active="true"></Snackbar></td>
      </v-card>

      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import Snackbar from "./components/Snackbar.vue";

export default {
  data() {
    return {
      notify: [],
      loader: null,
      loading: false,
      group: null,
      drawer: null,
      links: [
        { title: "Task List", icon: "mdi-playlist-check", url: "/" },
        { title: "Profile", icon: "mdi-account", url: "/profile" },
        { title: "Settings", icon: "mdi-cog-outline", url: "/settings" },
      ],
    };
  },
  computed: {
    appName() {
      return this.$store.state.appName;
    },
  },
  watch: {
    group() {
      this.drawer = false;
    },
    async loader() {
      const l = this.loader;
      this[l] = !this[l];
      this.refresh();
      setTimeout(() => (this[l] = false), 1000);
      this.loader = null;
    },
  },
  methods: {
    addTask(data) {
      this.$store.dispatch("addTask", data);
    },
    refresh() {
      this.$axios
        .get("tasks")
        .then((response) => {
          let data = response.data;
          data.forEach((element) => {
            this.addTask(element);
          });
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    update() {
      let data = this.$store.getters.uploads[0];
      if (data != undefined) {
        this.$axios.post("/update", data).then((response) => {
          if (response.status === 201) {
            this.$store.dispatch("deleteUpload", data);
          }
        });
      }
    },
  },
  created() {
    let data = this.$store.getters.getNotifi;

    if (data.length) {
      this.notify = data;
      data.forEach((obj) => {
        this.$store.dispatch("deleteNotifi", obj);
      });
    }
    setInterval(() => {
      this.$axios
        .get("echo")
        .then((response) => {
          let data = response.data;
          if (data.status == "ok") {
            this.$store.dispatch("setOnline", true);
            this.update();
          }
        })
        .catch(() => {
          this.$store.dispatch("setOnline", false);
        });
    }, 15000);
  },
  components: {
    Snackbar,
  },
};
</script>

<style lang="scss">
</style>
