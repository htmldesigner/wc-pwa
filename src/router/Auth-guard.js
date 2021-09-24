import store from '../store'

export default function (to, from, next) {
  if (store.getters.token) {
    next()
  } else {
    // next('/login?loginError=true')
    next('/login?loginError=true')
  }
}