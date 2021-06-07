<template>
  <div id="app">
    <div id="nav">
      <AppNav />
      <router-view class="page" />
    </div>
  </div>
</template>
<script>
import AppNav from '@/components/AppNav.vue'

export default {
  components: { AppNav },
}
</script>

<style>
@import './assets/styles/global.scss';
.page {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  min-height: calc(100vh - 56px);
}
</style>
