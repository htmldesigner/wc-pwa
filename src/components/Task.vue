<template>
  <v-container>
    <v-layout>
      <v-flex xs12>
        <!-- {{$route.params.id}} -->

        <v-dialog transition="dialog-top-transition" max-width="600">
          <template v-slot:activator="{ on, attrs }">
            <!-- Base Template -->

            <v-card>
              <v-layout mb-5 mt-5>
                <v-card-text>
                  <h1>{{ task.title }}</h1>
                  <p>{{ task.lastCheck }}</p>
                  <p>{{ task.adress }}</p>
                </v-card-text>
              </v-layout>
            </v-card>

            <v-card mb-5 mt-5>
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

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="primary"
                      v-bind="attrs"
                      v-on="on"
                      @click="
                        onStart();
                        img = null;
                      "
                      >Add Capture</v-btn
                    >

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
                  </v-card-actions>
                </v-card-text>
              </v-form>
            </v-card>

            <v-card mb-5 mt-5 v-show="img !== null">
              <v-card-text>
                <figure class="figure">
                  <v-img
                    height="100px"
                    width="100px"
                    :src="img"
                    class="img-responsive"
                  />
                </figure>
              </v-card-text>
            </v-card>

          </template>
          <template v-slot:default="dialog">
            <!-- Dialog Template -->
            <v-card>
              <v-toolbar color="primary" dark
                >Camera
                <v-spacer></v-spacer>
                <v-btn
                  icon
                  dark
                  @click="
                    dialog.value = false;
                    onStop();
                  "
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-toolbar>
              <v-card-text>
                <v-btn-toggle
                  v-model="camera"
                  tile
                  color="deep-purple accent-3"
                  group
                  mandatory
                  xs12
                >
                  <v-btn
                    v-for="device in devices"
                    :key="device.deviceId"
                    :value="device.deviceId"
                    xs12
                  >
                    {{ device.label }}
                  </v-btn>
                </v-btn-toggle>
                <div>
                  <vue-web-cam
                    ref="webcam"
                    :device-id="deviceId"
                    height="80%"
                    @started="onStarted"
                    @stopped="onStopped"
                    @error="onError"
                    @cameras="onCameras"
                    @camera-change="onCameraChange"
                  />
                </div>
                <v-card-actions>
                  <v-btn
                    type="button"
                    class="btn btn-primary"
                    v-show="camera != null"
                    @click="
                      onCapture();
                      
                      dialog.value = false;
                      onStop();
                    "
                  >
                    <v-icon>mdi-camera</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card-text>
            </v-card>
          </template>
        </v-dialog>
      </v-flex>
    </v-layout>
  </v-container>
</template>






<script>
import { WebCam } from "vue-web-cam";


export default {
  data() {
    return {
      taskData: {
        task_id: null,
        value: 0,
        valueR: 0,
        image: null,
        date: null,
        coordinates: null
      },
      valid: false,


      loader: null,
      loading: false,

      img: null,
      camera: null,
      deviceId: null,
      devices: [],
    };
  },
  components: {
    "vue-web-cam": WebCam,
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
    task() {
      let tasks = this.$store.getters.tasks;
      return tasks.filter((task) => {
        return task.id === this.$route.params.id;
      })[0];
    },
    device: function () {
      return this.devices.find((n) => n.deviceId === this.deviceId);
    },
  },
  methods: {
    addTask() {
      if (this.taskData) {
        this.$getLocation().then((coordinates) => {
         this.taskData.coordinates = coordinates
        })
        .catch(()=>{
          this.taskData.coordinates = null
        });
        let date = new Date(Date.now())
        this.taskData.date = date
        this.taskData.task_id = this.$route.params.id;
        this.$store.dispatch("addUpload", this.taskData);
        this.$store.dispatch("addNotifi", {text:"Updated"});
        this.img = null;
        
      }
    },
    onCapture() {
      if (this.$refs.webcam.capture() != "data:,") {
        this.img = this.$refs.webcam.capture();
        this.taskData.image = this.img;
      }
      console.log(this.taskData.image);
      this.$store.dispatch("addNotifi", {text:"Image Added"});
    },
    onStarted(stream) {
      console.log("On Started Event", stream);
    },
    onStopped(stream) {
      console.log("On Stopped Event", stream);
    },
    onStop() {
      this.$refs.webcam.stop();
    },
    onStart() {
      if (this.$refs.webcam) {
        this.$refs.webcam.start();
      }
    },
    onError(error) {
      console.log("On Error Event", error);
    },
    onCameras(cameras) {
      this.devices = cameras;
      // console.log("On Cameras Event", cameras);
    },
    onCameraChange(deviceId) {
      this.deviceId = deviceId;
      this.camera = deviceId;
      // console.log("On Camera Change Event", deviceId);
    },
  },
};
</script>

