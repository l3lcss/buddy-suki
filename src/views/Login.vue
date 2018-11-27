<template>
  <div class="home">
    <button @click="signIn()"> signInWithPopup </button>
  </div>
</template>

<script>
import { firebaseAuth, googleAuthProvider } from '../config/FirebaseConfig'
export default {
  name: 'home',
  data () {
    return {
      profile: ''
    }
  },
  methods: {
    async signIn () {
      let res = await firebaseAuth.signInWithPopup(googleAuthProvider)
      this.profile = res.additionalUserInfo.profile
      this.verifyUser(this.profile)
    },
    verifyUser (profile) {
      if (profile.hd && (profile.hd === 'flyingcomma.com' || profile.hd === 'sellsuki.com' || profile.hd === 'fitm.kmutnb.ac.th')) {
        this.$router.push({ name: 'home', params: { profile: this.profile } })
      } else {
        console.log('is valid email')
      }
    }
  },
  mounted () {

  }
}
</script>
