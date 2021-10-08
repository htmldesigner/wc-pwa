<template>
  <div>

    <div v-if="dev">
      <v-card>
        <v-form ref="form" v-model="valid" validation>
          <v-layout mb-3 mt-5>
            <v-card-text>

              <v-container>
                <v-row align="center" justify="space-between">
                  <v-col align="left" cols="6" sm="6" style="padding: 0px">
                    <h2># {{ dev.number }}</h2>
                  </v-col>
                  <v-col v-if="dev.waiting" align="right" cols="6" sm="6" style="padding: 0px">
                    <v-icon>mdi-access-point-network-off</v-icon>
                  </v-col>
                </v-row>
              </v-container>

              <v-container>
                <v-row>
                  <v-col cols="12" sm="12" style="padding: 12px 0px">
                    <v-text-field v-model="value"
                                  :rules="nameRules"
                                  counter
                                  label="Текущие показания"
                                  maxlength="5"
                                  required
                                  style="padding-top: 0; margin-top: 5px;"
                                  type="number"
                    ></v-text-field>

                    <div style="font-size: 12px" v-if="dev.verified">
                      <span>Последняя поверка: </span>
                      <span>
                      {{ dev.verified }}
                    </span>
                    </div>


                    <div v-if="dev.lastIndication">
                      <div style="font-size: 12px">
                        <span>Последнии показания: </span>
                        <span v-if="dev.lastIndication.value">
                      {{ dev.lastIndication.value }}
                        </span>
                      </div>

                      <div style="font-size: 12px">
                        <span>Дата отправки показаний: </span>
                        <span v-if="dev.lastIndication.date">
                      {{ moment(dev.lastIndication.date, 'DD.MM.YYYY hh:mm').format('DD.MM.YYYY') }}
                       </span>
                      </div>
                    </div>

                  </v-col>
                </v-row>
              </v-container>


              <v-row align="center" justify="space-between">
                <v-col class="text-center" xs="6">

                  <v-btn
                      :disabled="loading"
                      color="primary"
                      width="100%"
                      @click="showDialog"
                  >
                    Поверка
                    <template v-slot:loader>
                      <span>Отправка...</span>
                    </template>
                  </v-btn>

                </v-col>

                <v-col class="text-center" xs="6">
                  <v-btn
                      :disabled="!valid || loading"
                      color="success"
                      width="100%"
                      @click.prevent="onSubmit(dev.id)"
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

    <v-dialog v-model="dialog" dense flat width="500">
      <template v-slot:default="dialog">
        <v-card>
          <v-toolbar color="primary" dark>
            <v-spacer></v-spacer>
            <v-btn
                dark
                icon
                @click="hideDialog"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>

          <v-card-text>

            <div>
              <VerificationForm
                  :closeDialog="closeDialogValue"
                  :devId="dev.id"
                  :dialog="dialog"
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
    ...mapGetters(['loading', 'appName', 'coordinates'])
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
      this.dialog = false
      this.closeDialogValue = false
    },

    onSubmit(deviceId) {
      if (this.coordinates) {
        if (this.value && deviceId) {
          let newData = {device: deviceId, value: this.value}
          this.$store.dispatch('sendTask', newData).then(response => {
            if (response.error) {
              this.$store.dispatch('setAlertMessage', {type: 'error', message: response.error})
            }
            if (response === 'success') {
              this.$store.dispatch('getTaskList')
              this.$store.dispatch('setAlertMessage', {type: 'success', message: 'Данные обновлены'})
            }
            if (response === 'pending') {
              this.$store.dispatch('setAlertMessage', {type: 'warning', message: 'В ожидании отправки'})
            }
          })
        }
      } else {
        this.$store.dispatch('setAlertMessage', {
          type: 'warning',
          message: 'Разрешите доступ к геоданным и перезагрузите приложение'
        })
      }
    }
  }
}
</script>

<style scoped>

</style>