<template>
  <div>
    Home
    <button @click="findBuddy()"> find buddy </button>
    <button @click="runScript()"> runScript </button>
  </div>
</template>

<script>
import { db } from '../config/FirebaseConfig.js'
export default {
  name: 'Home',
  props: ['profile'],
  methods: {
    // async runScript () {
    // let res = await db.ref('people_without_buddy').once('value')
    // res.forEach(data => {
    //   let val = data.val()
    //   db.ref(`employees/${val.id}`).set(val)
    // })
    // },
    async findBuddy () {
      let randomBuddy = await this.getBuddyRandom()
      let ownKey = await this.findKey('employees', 'email', this.profile.email)

      await db.ref(`employees/${ownKey}`).update({
        buddy: randomBuddy
      })
      await db.ref(`employees/${randomBuddy}`).update({
        budder: ownKey
      })
      await db.ref(`people_without_budder/${randomBuddy}`).remove()
    },
    async getBuddyRandom () {
      let res = await db.ref('people_without_budder').once('value')
      let max = res.numChildren()
      let numRandom = Math.floor(Math.random() * (max - 0)) + 0

      let withoutBuddyRef = await db.ref('people_without_budder').once('value')
      let withoutBuddyData = withoutBuddyRef.val()
      let i = 1
      let keyBuddy = ''
      for (const key in withoutBuddyData) {
        if (i === numRandom) {
          keyBuddy = key
          break
        }
        i = i + 1
      }
      return keyBuddy
    },
    async findKey (fKey, sKey, val) {
      let res = await db.ref(fKey).orderByChild(sKey).equalTo(val).once('value')
      return Object.keys(res.val()).shift()
    }
  }
}
</script>
