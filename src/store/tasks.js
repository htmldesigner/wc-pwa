export default {
    state: {
        tasks: [],
        upload: []
    },
    mutations: {
        ADD_UPLOAD(state, obj) {
            if (state.upload.map(upload => upload.task_id).indexOf(obj.task_id) === -1) {
                state.upload.push(obj)
            }

        },
        DELETE_UPLOAD(state, obj) {
            state.upload.splice(state.upload.indexOf(obj), 1)
        },
        ADD_TASK(state, obj) {
            // console.log(state.tasks.map(tasks => tasks.id).indexOf(obj.id))
            // console.log(state.tasks.indexOf(obj))

            if (state.tasks.map(task => task.id).indexOf(obj.id) === -1) {
                state.tasks.push(obj)
            } else {
                const findNewItem = (oldItem) => [obj].find(item => item.id === oldItem.id);
                state.tasks = state.tasks.map(item => findNewItem(item)||item);
            }
            
        },
        DELETE_TASK(state, obj) {
            state.tasks.splice(state.tasks.indexOf(obj), 1)
        },
    },
    actions: {
        addUpload({
            commit
        }, obj) {
            commit("ADD_UPLOAD", obj);
        },
        deleteUpload({
            commit
        }, obj) {
            commit("DELETE_UPLOAD", obj)
        },
        addTask({
            commit
        }, obj) {
            commit("ADD_TASK", obj);
        },
        deleteTask({
            commit
        }, obj) {
            commit("DELETE_TASK", obj)
        },
    },
    getters: {
        tasks(state) {
            return state.tasks
        },
        uploads(state) {
            return state.upload
        },
        activeTasks(state) {
            return state.tasks.filter(task => {
                return task.active
            })
        },



    }
}