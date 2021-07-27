import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyDobWP7TdvM4KOPVcw25BQuWc8aMwj_fR4",
  authDomain: "react-login-b0da1.firebaseapp.com",
  projectId: "react-login-b0da1",
  storageBucket: "react-login-b0da1.appspot.com",
  messagingSenderId: "707454333789",
  appId: "1:707454333789:web:6ff9c931cc9a1c840d2eb4"
};

  let firebaseApp = firebase.initializeApp(firebaseConfig);
  export let firebaseAuth = firebaseApp.auth();
  export let firebaseStorage = firebaseApp.storage();
export let firebaseDB = firebaseApp.firestore();
export let timeStamp = firebase.firestore.FieldValue.serverTimestamp;