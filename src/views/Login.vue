<template>
  <div class="login">
    <b-loading :is-full-page="true" :active.sync="isLoading" :can-cancel="false"></b-loading>
    <div class="btn-icon" style="margin-right:1vw;"><i class="icons8-google"></i></div>
    <div @click="signIn()" class="btn-login"> Sign In with Google </div>
  </div>
</template>

<script>
import { firebaseAuth, googleAuthProvider } from '../config/FirebaseConfig'
export default {
  name: 'login',
  data () {
    return {
      isLoading: false,
      profile: ''
    }
  },
  props: ['isLogout'],
  methods: {
    async signIn () {
      let res = await firebaseAuth.signInWithPopup(googleAuthProvider)
      alert(res)
    },
    verifyUser (profile) {
      if (profile.hd && (profile.hd === 'flyingcomma.com' || profile.hd === 'sellsuki.com' || profile.hd === 'fitm.kmutnb.ac.th')) {
        this.$router.push({ name: 'home', params: { profile: this.profile } })
      } else {
        console.log('is valid email')
      }
    }
  },
  async mounted () {
    this.isLoading = true
    alert('mounted Login.vue do.')
    // console.log(this.isLogout, 'this.isLogout')
    // if (!this.isLogout) {
    //   try {
    //     const result = await firebaseAuth.getRedirectResult()
    //     this.profile = result.additionalUserInfo.profile
    //     this.verifyUser(this.profile)
    //   } catch (error) {
    //     console.log(error, 'error')
    //   }
    // }
    this.isLoading = false
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Noto+Sans+TC:700');
.login {
  display: flex;
  justify-content: center;
  align-items: center;
}
.btn-login {
  background-color: aliceblue;
  font-family: 'Noto Sans TC', sans-serif;
  font-size: 5vw;
  padding: 1vw 2vw;
  opacity: 0.9;

  -webkit-transition: font-size 0.2s;
}
.btn-login:hover {
  transition: all 0.2s;
  font-size: 6vw;
  cursor: pointer;
}
.btn-icon {
  background-color: aliceblue;
  font-size: 5vw;
  padding: 1vw 2vw;
  opacity: 0.9;

  -webkit-transition: font-size 0.2s;
}
.btn-icon:hover {
  transition: all 0.2s;
  font-size: 6vw;
  cursor: pointer;
}
.icons8-google {
  display: inline-block;
  width: 5vw;
  height: 5vw;
  background: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4IgogICAgIHdpZHRoPSI0ODAiIGhlaWdodD0iNDgwIgogICAgIHZpZXdCb3g9IjAgMCA0OCA0OCIKICAgICBzdHlsZT0iZmlsbDojMDAwMDAwOyI+PGcgaWQ9InN1cmZhY2UxIj48cGF0aCBzdHlsZT0iIGZpbGw6I0ZGQzEwNzsiIGQ9Ik0gNDMuNjA5Mzc1IDIwLjA4MjAzMSBMIDQyIDIwLjA4MjAzMSBMIDQyIDIwIEwgMjQgMjAgTCAyNCAyOCBMIDM1LjMwNDY4OCAyOCBDIDMzLjY1MjM0NCAzMi42NTYyNSAyOS4yMjI2NTYgMzYgMjQgMzYgQyAxNy4zNzEwOTQgMzYgMTIgMzAuNjI4OTA2IDEyIDI0IEMgMTIgMTcuMzcxMDk0IDE3LjM3MTA5NCAxMiAyNCAxMiBDIDI3LjA1ODU5NCAxMiAyOS44NDM3NSAxMy4xNTIzNDQgMzEuOTYwOTM4IDE1LjAzOTA2MyBMIDM3LjYxNzE4OCA5LjM4MjgxMyBDIDM0LjA0Njg3NSA2LjA1NDY4OCAyOS4yNjk1MzEgNCAyNCA0IEMgMTIuOTUzMTI1IDQgNCAxMi45NTMxMjUgNCAyNCBDIDQgMzUuMDQ2ODc1IDEyLjk1MzEyNSA0NCAyNCA0NCBDIDM1LjA0Njg3NSA0NCA0NCAzNS4wNDY4NzUgNDQgMjQgQyA0NCAyMi42NjAxNTYgNDMuODYzMjgxIDIxLjM1MTU2MyA0My42MDkzNzUgMjAuMDgyMDMxIFogIj48L3BhdGg+PHBhdGggc3R5bGU9IiBmaWxsOiNGRjNEMDA7IiBkPSJNIDYuMzA0Njg4IDE0LjY5MTQwNiBMIDEyLjg3ODkwNiAxOS41MTE3MTkgQyAxNC42NTYyNSAxNS4xMDkzNzUgMTguOTYwOTM4IDEyIDI0IDEyIEMgMjcuMDU4NTk0IDEyIDI5Ljg0Mzc1IDEzLjE1MjM0NCAzMS45NjA5MzggMTUuMDM5MDYzIEwgMzcuNjE3MTg4IDkuMzgyODEzIEMgMzQuMDQ2ODc1IDYuMDU0Njg4IDI5LjI2OTUzMSA0IDI0IDQgQyAxNi4zMTY0MDYgNCA5LjY1NjI1IDguMzM1OTM4IDYuMzA0Njg4IDE0LjY5MTQwNiBaICI+PC9wYXRoPjxwYXRoIHN0eWxlPSIgZmlsbDojNENBRjUwOyIgZD0iTSAyNCA0NCBDIDI5LjE2NDA2MyA0NCAzMy44NTkzNzUgNDIuMDIzNDM4IDM3LjQxMDE1NiAzOC44MDg1OTQgTCAzMS4yMTg3NSAzMy41NzAzMTMgQyAyOS4yMTA5MzggMzUuMDg5ODQ0IDI2LjcxNDg0NCAzNiAyNCAzNiBDIDE4Ljc5Njg3NSAzNiAxNC4zODI4MTMgMzIuNjgzNTk0IDEyLjcxODc1IDI4LjA1NDY4OCBMIDYuMTk1MzEzIDMzLjA3ODEyNSBDIDkuNTAzOTA2IDM5LjU1NDY4OCAxNi4yMjY1NjMgNDQgMjQgNDQgWiAiPjwvcGF0aD48cGF0aCBzdHlsZT0iIGZpbGw6IzE5NzZEMjsiIGQ9Ik0gNDMuNjA5Mzc1IDIwLjA4MjAzMSBMIDQyIDIwLjA4MjAzMSBMIDQyIDIwIEwgMjQgMjAgTCAyNCAyOCBMIDM1LjMwNDY4OCAyOCBDIDM0LjUxMTcxOSAzMC4yMzgyODEgMzMuMDcwMzEzIDMyLjE2NDA2MyAzMS4yMTQ4NDQgMzMuNTcwMzEzIEMgMzEuMjE4NzUgMzMuNTcwMzEzIDMxLjIxODc1IDMzLjU3MDMxMyAzMS4yMTg3NSAzMy41NzAzMTMgTCAzNy40MTAxNTYgMzguODA4NTk0IEMgMzYuOTcyNjU2IDM5LjIwMzEyNSA0NCAzNCA0NCAyNCBDIDQ0IDIyLjY2MDE1NiA0My44NjMyODEgMjEuMzUxNTYzIDQzLjYwOTM3NSAyMC4wODIwMzEgWiAiPjwvcGF0aD48L2c+PC9zdmc+') 50% 50% no-repeat;
  background-size: 100%;
}
</style>
