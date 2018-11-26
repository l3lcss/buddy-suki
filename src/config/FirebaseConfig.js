import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
const config = {
  apiKey: 'AIzaSyChYKFH9qVhIwOVUFX_2SRljJU_G681VB4',
  authDomain: 'vuex-firebase-58fb5.firebaseapp.com',
  databaseURL: 'https://vuex-firebase-58fb5.firebaseio.com',
  storageBucket: 'vuex-firebase-58fb5.appspot.com'
}

firebase.initializeApp(config)
const firebaseAuth = firebase.auth()
const db = firebase.database()
const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

export {
  googleAuthProvider,
  firebaseAuth,
  db
}
