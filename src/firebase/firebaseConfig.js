import firebase from 'firebase'
import credentials from '@/firebase/credentials'

let firebaseConfig = credentials

firebase.initializeApp(firebaseConfig)
const auth = firebase.auth()
const db = firebase.firestore()
const alphaResults = db.collection('results').doc('alpha')
const FieldValue = firebase.firestore.FieldValue

export {
  auth,
  db,
  alphaResults,
  FieldValue
}
