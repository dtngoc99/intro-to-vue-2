<template>
  <div>
    <div class="event.event-header">
      <span class="eyebrow"
        >{{ event.event.time }} on {{ event.event.date }}</span
      >
      <h3 class="title">{{ event.event.title }}</h3>
      <h5>
        Organized by {{ event.event.organizer ? event.event.organizer : '' }}
      </h5>
      <h5>Category: {{ event.event.category }}</h5>
    </div>
    <BaseIcon name="map"
      ><b>Location</b>
      <address>{{ event.event.location }}</address>
    </BaseIcon>

    <h4>Event details</h4>
    <p>{{ event.event.description }}</p>

    <h4>
      Attendees
      <span class="badge -fill-gradient">{{
        event.event.attendees ? event.event.attendees.length : 0
      }}</span>
    </h4>
    <ul class="list-group">
      <li
        v-for="(attendee, index) in event.event.attendees"
        :key="index"
        class="list-item"
      >
        <b>{{ attendee.name }}</b>
      </li>
    </ul>
  </div>
</template>
<script>
//import eventService from '@/services/eventService.js'
import { mapState } from 'vuex'
export default {
  props: ['id'],
  created() {
    this.$store.dispatch('event/fetchEvent', this.id)
  },
  computed: mapState(['event']),
}
</script>
<style scoped>
.location {
  margin-bottom: 0;
}
.location > .icon {
  margin-left: 10px;
}
.event-header > .title {
  margin: 0;
}
.list-group {
  /* margin: 0;
  padding: 0;
  list-style: none; */
}
.list-group > .list-item {
  padding: 1em 0;
  border-bottom: solid 1px #e5e5e5;
}
</style>
