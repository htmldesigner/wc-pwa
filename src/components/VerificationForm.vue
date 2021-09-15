<template>
  <div>
    <v-form ref="form" v-model="valid" validation>

      <v-col cols="12" sm="12">
        <v-text-field
            label="Текущие показания"
            type="number"
            v-model="value"
            :rules="nameRules"
            maxlength="5"
            counter
            required
        ></v-text-field>
      </v-col>

      <Camera
          ref="camera"
          @cameraActivated="cameraActivated"
          @image="addImage"
      />

      <div v-if="cameraActive">
        <v-container fill-height fluid style="margin-top: 30px; margin-bottom: 20px">
          <v-row align="center" justify="center">
            <v-btn
                style="margin: 0px 10px"
                type="button"
                class="btn btn-primary"
                @click="onCapture"
            >
              <v-icon>mdi-camera</v-icon>
            </v-btn>

            <v-btn
                style="margin: 0px 10px"
                type="button"
                class="btn btn-primary"
                @click="removeCapture"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-row>
        </v-container>

        <v-container>
          <v-row>
            <v-col cols="12" sm="12">
              <v-btn
                  width="100%"
                  color="primary"
                  @click.prevent="onSubmit"
                  :disabled="!valid || loading || !this.image"
              >
                Отправить
                <template v-slot:loading>
                  <span>Loading...</span>
                </template>
              </v-btn>
            </v-col>
          </v-row>
        </v-container>

      </div>

    </v-form>
  </div>
</template>

<script>
import Camera from "./Camera";

export default {
  components: {
    Camera
  },
  computed: {
    loading() {
      return this.$store.getters.loading
    },
    coordinates() {
      return this.$store.getters.coordinates
    }
  },
  name: "VerificationForm",
  props: ['dialog', 'closeDialog', 'devId'],
  watch: {
    dialog(dialog) {
      if (dialog.value) {
        this.$refs.camera.onStart()
      } else {
        if (this.$refs.camera) {
          this.$refs.camera.onStop()
        }
      }
    },
    closeDialog(value) {
      this.cameraActive = value
    }
  },
  data() {
    return {
      valid: false,
      value: '',
      cameraActive: null,
      image: null,
      nameRules: [v => !!v || 'Обязательное поле', v => (v && v.length >= 5) || 'Минимум 5 цифр', v => (v && v.length < 6) || 'Не более 5 цифр'],
    }
  },
  methods: {
    onCapture() {
      this.$refs.camera.onCapture()
    },
    removeCapture() {
      this.$refs.camera.removeCapture()
    },

    addImage(image) {
      this.image = image
    },
    cameraActivated(value) {
      this.cameraActive = value
    },

    async onSubmit() {
      if (this.coordinates) {
        const data = {
          device: this.devId,
          value: this.value,
          coordinates: this.coordinates,
          photo: await (await (await fetch(this.image))).blob()
        }
        this.$store.dispatch('sendVerifications', data)
        this.$emit('hideDialog')
      } else {
        alert('Разрешите доступ к геоданным и перезагрузите приложение')
      }
    }
  }
}
</script>

<style scoped>

</style>