<template>
  <div>

    <div v-if="dev">
      <v-card>
        <v-form>
          <v-layout mb-3 mt-5>
            <v-card-text>
              <h1>№ {{ dev.number }}</h1>

              <v-container>
                <v-row>
                  <v-col cols="12" sm="12">

                    <v-text-field
                        label="Текущие показания"
                        type="number"
                        prepend-icon="mdi-counter"
                        v-model.number="value"
                        :counter="10"
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
                  >
                    Поверка
                  </v-btn>

                </v-col>

                <v-col xs="6" class="text-center">
                  <v-btn
                      width="100%"
                      color="success"
                      @click.prevent="onSubmit(dev.id)"
                      :loading="loading"
                  >
                    Показания
                    <template v-slot:loader>
                      <span>Loading...</span>
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
      dialog: false,
      closeDialogValue: null
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