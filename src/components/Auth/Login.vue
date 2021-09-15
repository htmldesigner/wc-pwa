<template>
  <v-container>
    <v-layout>
      <v-flex xs12>
        <v-container class="fill-height" fluid>
          <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="6">
              <v-card class="elevation-12">
                <v-toolbar color="primary" dark flat>
                  <v-toolbar-title>Авторизация</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <v-form v-model="valid" ref="form" validation>
                    <v-text-field
                        label="Токен"
                        name="login"
                        prepend-icon="mdi-account"
                        type="text"
                        v-model="token"
                        :rules="nameRules"
                        required
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

