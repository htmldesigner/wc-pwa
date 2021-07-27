import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home'
import Login from '../components/Auth/Login'
import Profile from '../components/Auth/Profile'
import Task from '../components/Task'
import Settings from '../components/AppSettings'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  },
  {
    path: '/task/:id',
    name: 'Task',
    component: Task
  },

]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
