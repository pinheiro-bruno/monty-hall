import firebase from 'firebase'
import credentials from '@/firebase/credentials'

let firebaseConfig = credentials

firebase.initializeApp(firebaseConfig)
const auth = firebase.auth()
const alphaResults = firebase.firestore().collection('results').doc('alpha')
const FieldValue = firebase.firestore.FieldValue

export {
  auth,
  alphaResults,
  FieldValue
}
