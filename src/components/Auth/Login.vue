<template>
  <v-container>
    <v-layout>
      <v-flex xs12>
        <v-container class="fill-height" fluid>
          <v-row align="center" justify="center">
            <v-col cols="12" md="6" sm="8">
              <v-card class="elevation-12">
                <v-toolbar color="primary" dark flat>
                  <v-toolbar-title>Авторизация</v-toolbar-title>
                </v-toolbar>
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
                    ></v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" @click="onSubmit">Вход</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      token: null,
      valid: false,
      nameRules: [v => !!v || 'Обязательное поле', v => (v && v.length >= 5) || 'Минимум 5 символов'],
    };
  },
  methods: {
    onSubmit() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('userAuth', this.token)
            .then(() => {
              this.$router.push('/');
            })
            .catch(() => {
            });
      }
    },
  }
};
</script>

