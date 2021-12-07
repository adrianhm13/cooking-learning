import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCbSis2U0_aq31ue5QWTRXJs5fAk5w9yAk",
  authDomain: "cooking-recipes-24fea.firebaseapp.com",
  projectId: "cooking-recipes-24fea",
  storageBucket: "cooking-recipes-24fea.appspot.com",
  messagingSenderId: "1047880587628",
  appId: "1:1047880587628:web:4d412e1f62e1c0e9a3bb49",
};

// Init firebase
firebase.initializeApp(firebaseConfig);

// Init services
const projectFirestore = firebase.firestore();

export { projectFirestore }