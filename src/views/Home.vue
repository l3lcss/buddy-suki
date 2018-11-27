<template>
  <div>
    {{ ownDetails }}<br>
    {{ buddyDetails }}
    <button @click="findBuddy()" v-if="!hasBuddy"> find buddy </button>
  </div>
</template>

<script>
import { db } from '../config/FirebaseConfig.js'
export default {
  name: 'Home',
  data () {
    return {
      hasBuddy: false,
      ownDetails: {},
      buddyDetails: {},
      numOfPeopleWithoutBudder: 0
    }
  },
  props: ['profile'],
  methods: {
    async findBuddy () {
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
    }
  },
  async mounted () {
    let key = await this.findKey('employees', 'email', this.profile.email)
    let ref = await db.ref(`employees/${key}`).once('value')
    this.ownDetails = ref.val()
    if (this.ownDetails.buddy) {
      this.hasBuddy = true
      let res = await db.ref(`employees/${this.ownDetails.buddy}`).once('value')
      this.buddyDetails = res.val()
    }
  }
}
</script>
