export default {
  getters: {
    loggedIn(state) {
      return !!state.user
    },
  },
}
