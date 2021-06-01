<template>
  <div>
    <h1>Event Listing</h1>
    <h3>Events by {{ user.user.name }}</h3>
    <EventCard v-for="event in event.events" :key="event.id" :event="event" />
    <template v-if="page != 1">
      <router-link :to="{ name: 'event-list', query: { page: page - 1 } }">
        Prev Page</router-link
      >
      <template v-if="hasNextPage"> | </template>
    </template>
    <router-link
      v-if="hasNextPage"
      :to="{ name: 'event-list', query: { page: page + 1 } }"
    >
      Next Page</router-link
    >
  </div>
</template>
<script>
import EventCard from '@/components/EventCard.vue'
// eslint-disable-next-line no-unused-vars
import EventService from '@/services/EventService.js'
import { mapState } from 'vuex'
import store from '@/store'

// Moved the current page & action call outside the component
function getPageEvents(routeTo, next) {
  const currentPage = parseInt(routeTo.query.page || 1)
  store
    .dispatch('event/fetchEvents', {
      page: currentPage,
    })
    .then(() => {
      // pass it into the component as a prop, so we can print next pages
      routeTo.params.page = currentPage
      next()
    })
}
export default {
  props: {
    page: {
      // current page gets passed in as a prop
      type: Number,
      required: true,
    },
  },
  components: {
    EventCard,
  },
  created() {
    this.perPage = 3
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    // Before we enter the route
    getPageEvents(routeTo, next)
  },
  beforeRouteUpdate(routeTo, routeFrom, next) {
    // Before we update the route
    getPageEvents(routeTo, next)
  },
  computed: {
    hasNextPage() {
      return this.event.eventsTotal > this.page * this.perPage
    },
    ...mapState(['event', 'user']),
  },
}
</script>
