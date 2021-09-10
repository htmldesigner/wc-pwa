import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home'
import Login from '../components/Auth/Login'
import Profile from '../components/Auth/Profile'
import Task from '../components/Task'
import Settings from '../components/AppSettings'
import NotFound from '../components/NotFound'
import AuthGuard from './Auth-guard'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: AuthGuard
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    beforeEnter: AuthGuard
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
    beforeEnter: AuthGuard
  },
  {
    path: '/task/:id',
    name: 'Task',
    component: Task,
    beforeEnter: AuthGuard
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = new VueRouter({
  routes
})

export default router