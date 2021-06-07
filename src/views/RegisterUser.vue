<template>
  <div>
    <form @submit.prevent="register">
      <label for="name"> Name: </label>
      <input v-model="name" type="text" name="name" value />
      <br />
      <label for="email"> Email: </label>
      <input v-model="email" type="email" name="email" value />
      <br />
      <label for="password"> Password: </label>
      <input v-model="password" type="password" name="password" value />
      <br />
      <button type="submit" name="button">Register</button>
      <br />
      <router-link to="/login"> Already have an account? Login. </router-link>
      <ul>
        <li v-for="(error, index) in errors" :key="index">
          {{ error }}
        </li>
      </ul>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      errors: null,
    }
  },
  methods: {
    register() {
      console.log('called register function')
      console.log('email: ', this.email)
      this.$store
        .dispatch('register', {
          name: this.name,
          email: this.email,
          password: this.password,
        })
        .then(() => {
          this.$router.push({ name: 'Dashboard' })
        })
        .catch((err) => {
          this.errors = err.response.data.errors
        })
    },
  },
}
</script>

<style scoped></style>
