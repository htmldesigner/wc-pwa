<template>
  <v-container>
    <v-layout>
      <v-flex xs12>

        <div v-for="(task, idx) in tasks" :key="idx">
          <v-card>
            <v-layout mb-5 mt-5>
              <v-card-text>
                <p><strong>{{ task.name }}</strong></p>
                <p><strong>{{ task.address }}</strong></p>
              </v-card-text>
            </v-layout>
          </v-card>

          <div v-for="(device, index) in task.devices" v-if="task.devices" :key="index">
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
    return {}
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

