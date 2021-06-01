import Vue from 'vue'
import VueRouter from 'vue-router'
import EventList from '../views/EventList.vue'
import EventShow from '../views/EventShow.vue'
import EventCreate from '../views/EventCreate.vue'
import User from '../views/User.vue'
import store from '../store'
import NProgress from 'nprogress'
import NotFound from '@/views/NotFound.vue'
import NetworkIssue from '@/views/NetworkIssue.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'event-list',
    component: EventList,
    props: true,
    beforeEnter(routeTo, routeFrom, next) {
      const currentPage = parseInt(routeTo.query.page || 1)
      store
        .dispatch('event/fetchEvents', {
          page: currentPage,
        })
        .then((events) => {
          routeTo.params.events = events
          next()
        })
    },
  },
  {
    path: '/event/:id',
    name: 'event-show',
    component: EventShow,
    props: true, //set params to props
    // before this route is loaded
    beforeEnter(routeTo, routeFrom, next) {
      store
        .dispatch('event/fetchEvent', routeTo.params.id)
        .then((event) => {
          routeTo.params.event = event
          next()
        })
        .catch((error) => {
          if (error.response && error.response.status == 404) {
            next({ name: '404', params: { resource: 'event' } })
          } else {
            next({ name: 'network-issue' })
          }
        })
    },
  },
  {
    path: '/event/create',
    name: 'event-create',
    component: EventCreate,
  },
  {
    path: '/user/:username',
    name: 'user',
    component: User,
    props: true,
  },
  {
    path: '/network-issue',
    name: 'network-issue',
    component: NetworkIssue,
  },
  {
    path: '/404',
    name: '404',
    component: NotFound,
  },
  {
    // Here's the new catch all route
    path: '*',
    redirect: { name: '404' },
  },
]

const router = new VueRouter({
  mode: 'history', //without reloading the page
  routes,
})
router.beforeEach((routeTo, routeFrom, next) => {
  // Start the route progress bar.
  NProgress.start()
  next()
})
router.afterEach(() => {
  // Complete the animation of the route progress bar.
  NProgress.done()
})
export default router
