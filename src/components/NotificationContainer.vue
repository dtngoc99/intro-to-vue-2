<template>
  <div class="notification-container">
    <NotificationBar
      v-for="noti in notification.notifications"
      :key="noti.id"
      :notification="noti"
    />
  </div>
</template>

<script>
import NotificationBar from './NotificationBar'
import { mapState } from 'vuex'

export default {
  components: { NotificationBar },
  computed: mapState(['notification']),
}
</script>

<style scoped></style>
