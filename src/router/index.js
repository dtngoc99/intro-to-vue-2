import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Dashboard from '@/views/Dashboard.vue'
import RegisterUser from '@/views/RegisterUser.vue'
import LoginUser from '@/views/LoginUser.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true },
    beforeEnter(routeTo, routeFrom, next) {
      const loggedIn = localStorage.getItem('user')
      if (
        routeTo.matched.some((record) => record.meta.requiresAuth) &&
        !loggedIn
      ) {
        next('/')
      }
      next()
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterUser,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginUser,
  },
]

const router = new VueRouter({
  routes,
  mode: 'history',
})

export default router
