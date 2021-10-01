<template>
  <div>
    <template>
      <v-row justify="center">
        <v-dialog
            v-model="dialog"
            persistent
            max-width="600px"
        >
          <v-card>

            <v-card-title class="justify-center">
              Для выхода введите токен
            </v-card-title>

            <v-card-text>
              <v-form ref="form" v-model="valid" validation>
                <v-text-field
                    v-model="token"
                    :rules="nameRules"
                    label="Токен"
                    name="login"
                    prepend-icon="mdi-account"
                    required
                    type="text"
                    v-on:keyup.enter="onConfirm"
                    autocomplete="false"
                ></v-text-field>
              </v-form>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  color="blue darken-1"
                  text
                  @click="onConfirm"
                  :disabled="!valid"
              >
                Подтвердить
              </v-btn>
              <v-btn
                  color="blue darken-1"
                  text
                  @click="close"
              >
                Отмена
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </template>
  </div>
</template>

<script>
export default {
  name: "ConfirmLogOut",
  props: {
    dialog: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      token: null,
      valid: false,
      nameRules: [v => !!v || 'Обязательное поле', v => (v && v.length >= 5) || 'Минимум 5 символов'],
    };
  },
  methods: {
    async onConfirm() {
      const result = await this.$store.dispatch('logOut', this.token)
      if (result) {
        await this.$router.push('/login');
        await this.close()
      } else {
        this.$store.dispatch('setAlertMessage', {
          type: 'error',
          message: 'Токены не совпадают'
        })
      }
    },
    close() {
      this.$emit('closeConfirmLogOut', false)
      this.token = null
    }
  }
}
</script>

<style scoped>

</style>