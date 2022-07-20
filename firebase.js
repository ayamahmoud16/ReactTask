// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCHNZwIT9SaLfr6NQ5JkZbfEa12mOvs7m4",
  authDomain: "fir-auth-7ceda.firebaseapp.com",
  projectId: "fir-auth-7ceda",
  storageBucket: "fir-auth-7ceda.appspot.com",
  messagingSenderId: "87010839973",
  appId: "1:87010839973:web:e87a92a5d706e049976c4c",
  measurementId: "G-SF80SD3HWS",
};

// Initialize Firebase

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}
// const analytics = getAnalytics(app);
const auth = firebase.auth();

export { auth };
