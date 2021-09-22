<template>

  <div class="" style="margin-top: 25px">

    <div v-if="img" class="image_container">
      <img :src="img" class="img-responsive"/>
    </div>

    <div v-show="!img" class="camera_container">
      <vue-web-cam
          ref="webcam"
          :device-id="deviceId"
          height="100%"
          @cameras="onCameras"
          @error="onError"
          @started="onStarted"
          @stopped="onStopped"
          @camera-change="onCameraChange"
      />
    </div>

    <div>
      <select v-model="camera">
        <option>-- Выбирите камеру --</option>
        <option
            v-for="device in devices"
            :key="device.deviceId"
            :value="device.deviceId"
        >{{ device.label }}
        </option>
      </select>
    </div>

  </div>

</template>

<script>
import {WebCam} from "vue-web-cam";

export default {
  name: "Camera",
  components: {
    "vue-web-cam": WebCam
  },
  data() {
    return {
      img: false,
      camera: null,
      deviceId: null,
      devices: []
    };
  },
  computed: {
    device: function () {
      return this.devices.find(n => n.deviceId === this.deviceId);
    }
  },
  watch: {
    camera: function (id) {
      this.deviceId = id;
    },
    devices: function () {
      // Once we have a list select the first one
      const [first, ...tail] = this.devices;
      if (first) {
        this.camera = first.deviceId;
        this.deviceId = first.deviceId;
      }
    }
  },
  methods: {
    onCapture() {
      this.img = this.$refs.webcam.capture();
      if (this.img) {
        this.$emit('image', this.img)
      }
    },
    removeCapture() {
      this.img = null
      this.$emit('image', null)
    },
    onStarted(stream) {
      console.log("On Started Event", stream);
      this.$emit('cameraActivated', stream.active)
    },
    onStopped(stream) {
      console.log("On Stopped Event", stream);
    },
    onStop() {
      this.$refs.webcam.stop();
    },
    onStart() {
      this.$refs.webcam.start();
    },
    onError(error) {
      console.log("On Error Event", error);
    },
    onCameras(cameras) {
      this.devices = cameras;
      console.log("On Cameras Event", cameras);
    },
    onCameraChange(deviceId) {
      this.deviceId = deviceId;
      this.camera = deviceId;
      console.log("On Camera Change Event", deviceId);
    }
  }
};
</script>
<style scoped>
.img-responsive {
  display: block;
  width: 100%;
  height: auto;
}
</style>