<template>
  <div id="app">
    <!-- <router-view/> -->
    <div class="g-signin2" data-onsuccess="onSignIn" data-theme="dark"></div>
  </div>
</template>
<script>
/* eslint-disable */
  function onSignIn(googleUser) {
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());

    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);
  };
</script>
<script>
import 'particles.js'
import './js/app.js'
import { firebaseAuth } from './config/FirebaseConfig'
export default {
  name: 'app',
  mounted () {
    const user = firebaseAuth.currentUser
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
