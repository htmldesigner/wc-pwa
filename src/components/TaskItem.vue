<template>
  <div>

    <div v-if="dev">
      <v-card>
        <v-form ref="form" v-model="valid" validation>
          <v-layout mb-3 mt-5>
            <v-card-text>
              <h1>№ {{ dev.number }}</h1>

              <v-container>
                <v-row>
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
                    <div>
                      <span>Последняя поверка: </span>
                      <span v-if="dev.verified">
                      {{ dev.verified }}
                    </span>
                    </div>
                  </v-col>
                </v-row>
              </v-container>


              <v-row justify="space-between" align="center">
                <v-col xs="6" class="text-center">

                  <v-btn
                      color="primary"
                      @click="showDialog"
                      width="100%"
                      :disabled="loading"
                  >
                    Поверка
                    <template v-slot:loader>
                      <span>Отправка...</span>
                    </template>
                  </v-btn>

                </v-col>

                <v-col xs="6" class="text-center">
                  <v-btn
                      width="100%"
                      color="success"
                      @click.prevent="onSubmit(dev.id)"
                      :disabled="!valid || loading"
                  >
                    Показания
                    <template v-slot:loader>
                      <span>Отправка...</span>
                    </template>
                  </v-btn>

                </v-col>
              </v-row>


            </v-card-text>
          </v-layout>
        </v-form>
      </v-card>
    </div>

    <v-dialog v-model="dialog" width="500" dense flat>
      <template v-slot:default="dialog">
        <v-card>
          <v-toolbar color="primary" dark>
            <v-spacer></v-spacer>
            <v-btn
                icon
                dark
                @click="hideDialog"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>

          <v-card-text>

            <div>
              <VerificationForm
                  :dialog="dialog"
                  :devId="dev.id"
                  :closeDialog="closeDialogValue"
                  @hideDialog="hideDialog"
              />
            </div>

          </v-card-text>
        </v-card>
      </template>
    </v-dialog>

  </div>
</template>

<script>
import {mapGetters} from "vuex";
import IndicationField from "./fields/IndicationField";
import VerificationForm from "./VerificationForm";

export default {
  components: {
    IndicationField,
    VerificationForm
  },
  name: "TaskItem",
  props: ['dev'],
  computed: {
    ...mapGetters(['loading', 'appName'])
  },
  data() {
    return {
      value: '',
      valid: false,
      dialog: false,
      closeDialogValue: null,
      nameRules: [v => !!v || 'Обязательное поле', v => (v && v.length >= 5) || 'Минимум 5 цифр', v => (v && v.length < 6) || 'Не более 5 цифр'],
    }
  },

  methods: {
    showDialog() {
      this.closeDialogValue = null
      this.dialog = !this.dialog
    },

    hideDialog() {
      console.log('dc')
      this.dialog = false
      this.closeDialogValue = false
    },

    onSubmit(deviceId) {
      if (this.value && deviceId) {
        let newData = {device: deviceId, value: this.value}
        this.$store.dispatch('sendTask', newData).then(response => {
          if (response.error) {
            return alert(response.error)
          }
          if (response === 'success') {
            return alert('Обнавленно')
          }
        })
      }
    }
  }
}
</script>

<style scoped>

</style>