// ##notification model
// {
//     text: "some text"
//     id: 1
// }

export default {
    state: {
        notification : []
    },
    mutations: {
        ADD_NOTIFI(state, obj) {
            // console.log(state.tasks.map(tasks => tasks.id).indexOf(obj.id))
            // console.log(state.tasks.indexOf(obj))

            if (state.notification.map(notification => notification.text).indexOf(obj.text) === -1) {
                state.notification.push(obj)
            } else {
                const findNewItem = (oldItem) => [obj].find(item => item.id === oldItem.id);
                state.notification = state.notification.map(item => findNewItem(item)||item);
            }
            
        },
        DELETE_NOTIFI(state, obj) {
            state.notification.splice(state.notification.indexOf(obj), 1)
        },
    },
    actions: {
        addNotifi({
            commit
        }, obj) {
            commit("ADD_NOTIFI", obj);
        },
        deleteNotifi({
            commit
        }, obj) {
            commit("DELETE_NOTIFI", obj)
        },
    },
    getters:{
        getNotifi(state) {
            return state.notification
        },
    }
}
