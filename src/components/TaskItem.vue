<template>
  <div>

    <v-card>
      <v-layout mb-3 mt-5>
        <v-card-text>
          <p>{{ task.name }}</p>
          <p>{{ task.address }}</p>
        </v-card-text>
      </v-layout>
    </v-card>

    <div v-if="task.devices">
      <div v-for="device in task.devices" :key="device.id">
        <v-card>
          <v-form>
            <v-layout mb-3 mt-5>
              <v-card-text>
                <h1>№ {{ device.number }}</h1>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="12">
                      <IndicationField/>
                    </v-col>
                  </v-row>
                </v-container>

                <v-card-actions>
                  <div>
                    <span>Последняя поверка: </span>
                    <span v-if="device.verified">
                      {{ device.verified }}
                    </span>
                  </div>
                  <v-spacer></v-spacer>
                  <!--                <v-btn-->
                  <!--                    color="primary"-->
                  <!--                    v-bind="attrs"-->
                  <!--                    v-on="on"-->
                  <!--                    @click="onStart();img = null;"-->
                  <!--                >-->
                  <!--                  Фото-->
                  <!--                </v-btn>-->

                  <v-btn
                      class="ma-2"
                      color="success"
                      @click="onSubmit"
                  >
                    Отправить
                    <template v-slot:loader>
                      <span>Loading...</span>
                    </template>
                  </v-btn>
                </v-card-actions>
              </v-card-text>
            </v-layout>
          </v-form>
        </v-card>
      </div>
    </div>

    <!--  <v-card mb-5 mt-5 v-show="img !== null">-->
    <!--    <v-card-text>-->
    <!--      <figure class="figure">-->
    <!--        <v-img-->
    <!--            height="100px"-->
    <!--            width="100px"-->
    <!--            :src="img"-->
    <!--            class="img-responsive"-->
    <!--        />-->
    <!--      </figure>-->
    <!--    </v-card-text>-->
    <!--  </v-card>-->
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import IndicationField from "./fields/IndicationField";

export default {
  components: {
    IndicationField
  },
  name: "TaskItem",
  props: ['task'],
  computed: {
    ...mapGetters(['loading', 'appName'])
  },
  data() {
    return {
      value: ''
    }
  },
  methods: {
    onSubmit() {
      if (this.value) {
        console.log(this.value)
      }
    }
  }
}
</script>

<style scoped>

</style>