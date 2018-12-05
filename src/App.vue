<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
import 'particles.js'
import './js/app.js'
import { firebaseAuth } from './config/FirebaseConfig'
export default {
  name: 'app',
  async mounted () {
    const user = await firebaseAuth.currentUser
    if (!user) {
      this.$router.push({ name: 'login', params: { isLogout: true } })
    }
  }
}
</script>

<style>
@import url('./css/style.css');
body {
    overflow:hidden;
}
#app {
  position: absolute;
}
</style>
