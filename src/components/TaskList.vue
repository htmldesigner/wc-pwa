<template>
  <v-container>
    <v-layout>
      <v-flex xs12>


        <div v-for="task in tasks" :key="task.id">
          <v-card>
            <v-layout mb-5 mt-5>
              <v-card-text>
                <p><strong>{{ task.name }}</strong></p>
                <p><strong>{{ task.address }}</strong></p>
              </v-card-text>
            </v-layout>
          </v-card>

          <div v-if="task.devices" v-for="device in task.devices" :key="device.id">
            <TaskItem :dev="device"></TaskItem>
          </div>
        </div>

      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
import TaskItem from "./TaskItem";

export default {
  components: {
    TaskItem
  },
  data() {
    return {
      value: 0,
      valid: false,
      loader: null,
      loading: false,
    };
  },

  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];
      // upload server or save cache

      setTimeout(() => {
        this[l] = false;
        this.addTask();

      }, 1000);
      this.$router.push('/')
      this.loader = null;
    },
    camera: function (id) {
      this.deviceId = id;
    },
    devices: function () {
      // Once we have a list select the first one
      const [first, ...tail] = this.devices;
      console.log(tail);
      if (first) {
        this.camera = first.deviceId;
        this.deviceId = first.deviceId;
      }
    },
  },

  computed: {
    tasks() {
      const tasks = this.$store.getters.tasks
      if (tasks.items) {
        return tasks.items.filter((el) => el.id === parseInt(this.$route.params.id))
      }
    }
  }
};
</script>

