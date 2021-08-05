// ##notification model
// {
//     text: "some text"
//     id: 1
// }

export default {
    state: {
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
    },
    getters:{
        uploads(state) {
            return state.upload
        },
    }
}
