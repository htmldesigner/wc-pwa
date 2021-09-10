<template>
  <v-container>
    <v-layout>
      <v-flex xs12>
        <!-- {{$route.params.id}} -->

        <v-dialog transition="dialog-top-transition" max-width="600">
          <template v-slot:activator="{ on, attrs }">

{{tasks}}

              <TaskItem v-for="task in tasks" :key="task.id" :task="task"></TaskItem>



          </template>
<!--          <template v-slot:default="dialog">-->
<!--            &lt;!&ndash; Dialog Template &ndash;&gt;-->
<!--            <v-card>-->
<!--              <v-toolbar color="primary" dark-->
<!--              >Camera-->
<!--                <v-spacer></v-spacer>-->
<!--                <v-btn-->
<!--                    icon-->
<!--                    dark-->
<!--                    @click="-->
<!--                    dialog.value = false;-->
<!--                    onStop();-->
<!--                  "-->
<!--                >-->
<!--                  <v-icon>mdi-close</v-icon>-->
<!--                </v-btn>-->
<!--              </v-toolbar>-->
<!--              <v-card-text>-->
<!--                <v-btn-toggle-->
<!--                    v-model="camera"-->
<!--                    tile-->
<!--                    color="deep-purple accent-3"-->
<!--                    group-->
<!--                    mandatory-->
<!--                    xs12-->
<!--                >-->
<!--                  <v-btn-->
<!--                      v-for="device in devices"-->
<!--                      :key="device.deviceId"-->
<!--                      :value="device.deviceId"-->
<!--                      xs12-->
<!--                  >-->
<!--                    {{ device.label }}-->
<!--                  </v-btn>-->
<!--                </v-btn-toggle>-->
<!--                <div>-->
<!--                  <vue-web-cam-->
<!--                      ref="webcam"-->
<!--                      :device-id="deviceId"-->
<!--                      height="80%"-->
<!--                      @started="onStarted"-->
<!--                      @stopped="onStopped"-->
<!--                      @error="onError"-->
<!--                      @cameras="onCameras"-->
<!--                      @camera-change="onCameraChange"-->
<!--                  />-->
<!--                </div>-->
<!--                <v-card-actions>-->
<!--                  <v-btn-->
<!--                      type="button"-->
<!--                      class="btn btn-primary"-->
<!--                      v-show="camera != null"-->
<!--                      @click="-->
<!--                      onCapture();-->
<!--                      -->
<!--                      dialog.value = false;-->
<!--                      onStop();-->
<!--                    "-->
<!--                  >-->
<!--                    <v-icon>mdi-camera</v-icon>-->
<!--                  </v-btn>-->
<!--                </v-card-actions>-->
<!--              </v-card-text>-->
<!--            </v-card>-->
<!--          </template>-->
        </v-dialog>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
import {WebCam} from "vue-web-cam";
import TaskItem from "./TaskItem";

export default {
  components: {
    "vue-web-cam": WebCam, TaskItem
  },
  data() {
    return {
      value: 0,

      valid: false,


      loader: null,
      loading: false,

      img: null,
      camera: null,
      deviceId: null,
      devices: [],

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
  },
  methods: {
    addTask() {
      if (this.taskData) {
        this.$getLocation().then((coordinates) => {
          this.taskData.coordinates = coordinates
        })
            .catch(() => {
              this.taskData.coordinates = null
            });
        let date = new Date(Date.now())
        this.taskData.date = date
        this.taskData.task_id = this.$route.params.id;
        this.$store.dispatch("addUpload", this.taskData);
        this.$store.dispatch("addNotifi", {text: "Updated"});
        this.img = null;

      }
    },
    onCapture() {
      if (this.$refs.webcam.capture() != "data:,") {
        this.img = this.$refs.webcam.capture();
        this.taskData.image = this.img;
      }
      console.log(this.taskData.image);
      this.$store.dispatch("addNotifi", {text: "Image Added"});
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

