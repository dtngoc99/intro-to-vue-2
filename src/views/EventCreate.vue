<template>
  <div>
    <h1>Create an Event</h1>
    <form @submit.prevent="createEvent">
      <BaseInput
        label="Organizer"
        placeholder="Organizer"
        type="text"
        class="field"
        v-model.trim="event.organizer"
        :class="{ error: $v.event.organizer.$error }"
        @blur="$v.event.organizer.$touch()"
      />
      <template v-if="$v.event.organizer.$error">
        <p v-if="!$v.event.organizer.required" class="errorMessage">
          Organizer is required.
        </p>
      </template>
      <BaseSelect
        v-model="event.category"
        label="Select a category"
        :options="categories"
        @blur="$v.event.category.$touch()"
      />
      <template v-if="$v.event.category.$error">
        <!-- displays when error is true -->
        <p v-if="!$v.event.category.required" class="errorMessage">
          Category is required.
        </p>
      </template>

      <h3>Name & describe your event</h3>
      <BaseInput
        label="Title"
        placeholder="Title"
        type="text"
        class="field"
        v-model.trim="event.title"
        :class="{ error: $v.event.title.$error }"
        @blur="$v.event.title.$touch()"
      />
      <template v-if="$v.event.title.$error">
        <p v-if="!$v.event.title.required" class="errorMessage">
          Title is required.
        </p>
      </template>
      <BaseInput
        label="Description"
        type="text"
        placeholder="Description"
        class="field"
        :class="{ error: $v.event.description.$error }"
        v-model.trim="event.description"
        @blur="$v.event.description.$touch()"
      />
      <template v-if="$v.event.description.$error">
        <p v-if="!$v.event.description.required" class="errorMessage">
          Description is required.
        </p>
      </template>

      <h3>Where is your event?</h3>
      <BaseInput
        label="Location"
        v-model.trim="event.location"
        type="text"
        placeholder="Location"
        class="field"
        :class="{ error: $v.event.location.$error }"
        @blur="$v.event.location.$touch()"
      />
      <template v-if="$v.event.location.$error">
        <p v-if="!$v.event.location.required" class="errorMessage">
          Location is required.
        </p>
      </template>

      <h3>When is your event?</h3>

      <div class="field">
        <label>Date</label>
        <datepicker
          placeholder="Select a date"
          v-model="event.date"
          @opened="$v.event.date.$touch()"
          :input-class="{ error: $v.event.date.$error }"
        />
      </div>
      <template v-if="$v.event.date.$error">
        <p v-if="!$v.event.date.required" class="errorMessage">
          Date is required.
        </p>
      </template>

      <BaseSelect
        label="Select a time"
        :options="times"
        v-model.trim="event.time"
        class="field"
        :class="{ error: $v.event.time.$error }"
        @blur="$v.event.time.$touch()"
      />
      <template v-if="$v.event.time.$error">
        <p v-if="!$v.event.time.required" class="errorMessage">
          Time is required.
        </p>
      </template>
      <p v-if="$v.$anyError" class="errorMessage">
        Please fill out the required field(s).
      </p>
      <BaseButton
        type="submit"
        :disabled="$v.$anyError"
        buttonClass="button -fill-gradient"
        >Submit</BaseButton
      >
    </form>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import NProgress from 'nprogress'
import BaseInput from '@/components/BaseInput.vue'
import BaseSelect from '@/components/BaseSelect.vue'
import BaseButton from '@/components/BaseButton.vue'
import { required } from 'vuelidate/lib/validators'

export default {
  components: {
    Datepicker,
    BaseInput,
    BaseSelect,
    BaseButton,
  },
  data() {
    const times = []
    for (let i = 1; i <= 24; i++) {
      times.push(i + ':00')
    }
    return {
      times,
      categories: this.$store.state.categories,
      event: this.createFreshEventObject(),
    }
  },
  validations: {
    event: {
      organizer: { required },
      category: { required },
      title: { required },
      description: { required },
      location: { required },
      date: { required },
      time: { required },
    },
  },
  methods: {
    createEvent() {
      this.$v.$touch() // "touching" all fields to turn them "dirty"
      if (!this.$v.$invalid) {
        // submit form only when all fields are valid
        NProgress.start() // <-- Start the progress bar
        this.$store
          .dispatch('event/createEvent', this.event)
          .then(() => {
            this.$router.push({
              name: 'event-list',
              params: { id: this.event.id },
            })
            this.event = this.createFreshEventObject()
          })
          .catch(() => {
            NProgress.done() // <-- if errors out stop the progress bar
          })
      }
    },
    createFreshEventObject() {
      const user = this.$store.state.user.user
      const id = Math.floor(Math.random() * 10000000)
      return {
        id: id,
        user: user,
        category: '',
        organizer: '',
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        attendees: [],
      }
    },
  },
}
</script>
<style scoped>
.field {
  margin-bottom: 24px;
}
.errorMessage {
  color: rgb(250, 21, 21);
}
</style>
