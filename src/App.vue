<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
import 'particles.js'
import './js/app.js'
import { firebaseAuth } from './config/FirebaseConfig.js'
export default {
  name: 'app',
  async mounted () {
    await firebaseAuth.signOut()
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
