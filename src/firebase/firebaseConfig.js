import firebase from 'firebase'
import credentials from '@/firebase/credentials'

let firebaseConfig = credentials

firebase.initializeApp(firebaseConfig)
const auth = firebase.auth()

export {
  auth
}
