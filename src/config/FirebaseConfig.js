import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
const config = {
  apiKey: 'AIzaSyBat6YDDZVKwXUThbx5FO9AStLEl_TVF0I',
  authDomain: 'utils-e5add.firebaseapp.com',
  databaseURL: 'https://utils-e5add.firebaseio.com',
  projectId: 'utils-e5add',
  storageBucket: '',
  messagingSenderId: '113696076453'
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
