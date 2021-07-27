<template>
  <v-container>
    <v-layout>
      <v-flex xs12>
        <!-- {{$route.params.id}} -->

        <v-card>
          <v-layout mb-5 mt-5>
            <v-card-text>
              <h1>{{ task.title }}</h1>
              <p>{{ task.lastCheck }}</p>
              <p>{{ task.adress }}</p>
            </v-card-text>
          </v-layout>
        </v-card>

        <v-card>
          <v-form>
            <v-card-text>
              <v-container>
                <v-row
                  ><v-col cols="8" sm="8">
                    <v-text-field
                      id="water-meter-b"
                      label=""
                      name="wm"
                      type="number"
                      prepend-icon="mdi-counter"
                      v-model.number="taskData.value"
                      :counter="5"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="3" sm="4">
                    <v-text-field
                      id="water-meter-r"
                      label=""
                      name="wm"
                      type="number"
                      v-model.number="taskData.valueR"
                      :counter="3"
                    ></v-text-field> </v-col
                ></v-row>
              </v-container>

              <v-spacer></v-spacer>
              <v-btn
                class="ma-2"
                :loading="loading"
                :disabled="loading"
                color="success"
                @click="loader = 'loading'"
              >
                Update
                <template v-slot:loader>
                  <span>Loading...</span>
                </template>
              </v-btn>
            </v-card-text>
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      taskData: {
        value: 0,
        valueR: 0,
        image: "",
        status: "",
        date: "12-12-2021",
      },
      valid: false,

      loader: null,
      loading: false,
    };
  },
  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];

      setTimeout(() => (this[l] = false), 3000);

      this.loader = null;
    },
  },
  computed: {
    task() {
      let tasks = this.$store.getters.tasks;
      return tasks.filter((task) => {
        return task.id === this.$route.params.id;
      })[0];
    },
  },
};
</script>

