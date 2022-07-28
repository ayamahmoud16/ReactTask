import * as firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyCHNZwIT9SaLfr6NQ5JkZbfEa12mOvs7m4",
  authDomain: "fir-auth-7ceda.firebaseapp.com",
  projectId: "fir-auth-7ceda",
  storageBucket: "fir-auth-7ceda.appspot.com",
  messagingSenderId: "87010839973",
  appId: "1:87010839973:web:e87a92a5d706e049976c4c",
  measurementId: "G-SF80SD3HWS",
};

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}
const auth = firebase.auth();

export { auth };
