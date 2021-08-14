import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyDT9F2Pv-mcsT1v2S2RPl6-qYCHQUlTTic",
  authDomain: "reels-a1c24.firebaseapp.com",
  projectId: "reels-a1c24",
  storageBucket: "reels-a1c24.appspot.com",
  messagingSenderId: "606135864750",
  appId: "1:606135864750:web:263b94b7fe80f663310c3f"
};

  let firebaseApp = firebase.initializeApp(firebaseConfig);
  export let firebaseAuth = firebaseApp.auth();
  export let firebaseStorage = firebaseApp.storage();
export let firebaseDB = firebaseApp.firestore();
export let timeStamp = firebase.firestore.FieldValue.serverTimestamp;