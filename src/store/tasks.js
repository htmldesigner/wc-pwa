export default {
    state: {
        tasks: [],
        
    },
    mutations: {

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

        activeTasks(state) {
            return state.tasks.filter(task => {
                return task.active
            })
        },
    }
    
}