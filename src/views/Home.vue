<template>
  <div>
    <b-loading :is-full-page="true" :active.sync="isLoading" :can-cancel="false"></b-loading>
    <div :class="checkContainer">
      <div>
        {{ buddyDetails.thai_nickname }}
      </div>
      <div>
        {{ buddyDetails.division }}
      </div>
      <div>
        {{ buddyDetails.first_name }}
      </div>
      <div>
        {{ buddyDetails.last_name }}
      </div>
      <div>
        {{ buddyDetails.mobile_phone }}
      </div>
    </div>
    <div @click="findBuddy()" v-if="!hasBuddy" class="btn"> Find Buddy </div>
    <!-- <button @click="getPeopleWithoutBudder()"> getPeopleWithoutBudder </button> -->
    <!-- <button @click="runScript()"> runScript </button> -->
  </div>
</template>

<script>
import { db } from '../config/FirebaseConfig.js'
export default {
  name: 'Home',
  data () {
    return {
      isLoading: false,
      hasBuddy: false,
      ownDetails: {},
      buddyDetails: {},
      numOfPeopleWithoutBudder: 0
    }
  },
  props: ['profile'],
  methods: {
    async runScript () {
      let res = await db.ref('people_without_budder').once('value')
      res.forEach(data => {
        let val = data.val()
        db.ref(`employees/${val.id}`).set(val)
      })
    },
    async findBuddy () {
      this.isLoading = true
      do {
        await this.getBuddyRandom()
      } while (this.buddyDetails.id === this.ownDetails.id)
      await db.ref(`employees/${this.ownDetails.id}`).update({
        buddy: this.buddyDetails.id
      })
      await db.ref(`employees/${this.buddyDetails.id}`).update({
        budder: this.ownDetails.id
      })
      await db.ref(`people_without_budder/${this.buddyDetails.id}`).remove()
      this.hasBuddy = true
      this.isLoading = false
    },
    async getBuddyRandom () {
      let res = await db.ref('people_without_budder').once('value')
      let max = res.numChildren()
      this.numOfPeopleWithoutBudder = max
      let numRandom = Math.floor(Math.random() * max) + 1

      let withoutBuddyRef = await db.ref('people_without_budder').once('value')
      let withoutBuddyData = withoutBuddyRef.val()
      let i = 1
      for (const key in withoutBuddyData) {
        if (i === numRandom) {
          this.buddyDetails = withoutBuddyData[key]
          break
        }
        i = i + 1
      }
    },
    async findKey (fKey, sKey, val) {
      let res = await db.ref(fKey).orderByChild(sKey).equalTo(val).once('value')
      return Object.keys(res.val()).shift()
    },
    async getPeopleWithoutBudder () {
      let res = await db.ref('people_without_budder').once('value')
      let num = res.numChildren()
      return num
    }
  },
  computed: {
    checkContainer () {
      return this.hasBuddy ? 'container' : ''
    }
  },
  async mounted () {
    this.isLoading = true
    if (!this.profile) {
      this.$router.push({ name: 'login' })
    }
    let key = await this.findKey('employees', 'email', this.profile.email)
    let ref = await db.ref(`employees/${key}`).once('value')
    this.ownDetails = ref.val()
    if (this.ownDetails.buddy) {
      this.hasBuddy = true
      let res = await db.ref(`employees/${this.ownDetails.buddy}`).once('value')
      this.buddyDetails = res.val()
    }
    this.isLoading = false
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Kanit');
body {
    overflow:hidden;
}
.container {
  color: black;
  padding: 10vw 4vw;
  text-align: center;
  font-family: 'Kanit', sans-serif;
  background-color: rgba(255, 235, 205, 0.137);
  width: 70vw;
  font-size: 4vw !important;
  border-radius: 50%;
  box-shadow: 4px 4px 22px 0px rgba(0,0,0,0.75);

  -webkit-transition: padding 0.2s;
}
.container:hover {
  transition: all 0.2s;
  background-color: rgba(255, 235, 205, 0.137);
  border: 2px solid rgb(0, 0, 0);
  padding: 14vw 8vw;
}
.btn {
  background-color: rgba(252, 250, 250, 0.616);
  border-radius: 50%;
  text-align: center;
  font-size: 8vw;
  font-family: 'Noto Sans TC', sans-serif;
  padding: 10vh 8vh;

  -webkit-transition: font-size 0.2s;
}
.btn:hover {
  transition: all 0.2s;
  cursor: pointer;
}
</style>
