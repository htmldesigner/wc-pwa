<template>
    <v-container>
        <v-layout>
            <v-flex xs12>
                <h1>List</h1>
                <v-card 
                class="elevation-10" mb-5
                v-for="task in tasks"
                v-bind:key="task.id">
                    <v-layout mb-3>
                        
                        
                        <v-card-text><h2>{{task.title}}</h2> <Address>{{task.adress}}</Address> </v-card-text>
                        <v-card-text>Last Check: {{task.lastCheck}}</v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn class="info" :to="'/task/' + task.id">Open</v-btn>
                        </v-card-actions>
                    
                        
                    </v-layout>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>

export default {
    data() {
        return {}
    },
    computed: {
        tasks () {
            return this.$store.getters.tasks
        }
    }
}
</script>

