export default {
    state: {
        tasks: [
            {
                title: "first",
                lastCheck: "12.07.2021",
                adress: "Uralsk, T.Bigeldinova 55",
                location: "",
                id: '12',
                active: true
            },
                            {
                title: "second",
                lastCheck: "12.07.2021",
                adress: "Uralsk, T.Bigeldinova 55",
                location: "",
                id: '13',
                active: true
            },
        ]
    },
    mutations: {},
    actions: {},
    getters:{
        tasks (state) {
            return state.tasks
        },
        activeTasks (state) {
            return state.tasks.filter(task => {
                return task.active
            })
        },

        

    }
}