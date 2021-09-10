import store from '../store'

export default function (to, from, next) {
    if(store.getters.agent){
        next()
    }else {
        next('/login?loginError=true')
    }
}