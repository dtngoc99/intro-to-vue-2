<template>
  <div>
    <div class="event.event-header">
      <span class="eyebrow">{{ event.time }} on {{ event.date | date }}</span>
      <h3 class="title">{{ event.title }}</h3>
      <h5>Organized by {{ event.organizer ? event.organizer : '' }}</h5>
      <h5>Category: {{ event.category }}</h5>
    </div>
    <BaseIcon name="map"
      ><b>Location</b>
      <address>{{ event.location }}</address>
    </BaseIcon>

    <h4>Event details</h4>
    <p>{{ event.description }}</p>

    <h4>
      Attendees
      <span class="badge -fill-gradient">{{
        event.attendees ? event.attendees.length : 0
      }}</span>
    </h4>
    <ul class="list-group">
      <li
        v-for="(attendee, index) in event.attendees"
        :key="index"
        class="list-item"
      >
        <b>{{ attendee.name }}</b>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    event: {
      type: Object,
      required: true,
    },
  },
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
.list-group > .list-item {
  padding: 1em 0;
  border-bottom: solid 1px #e5e5e5;
}
</style>
