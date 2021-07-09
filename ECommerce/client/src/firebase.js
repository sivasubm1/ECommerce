import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCb-aZuUIuhOm17PPNYDQhGqDrt6cofGVc",
  authDomain: "ecommerce-f9f32.firebaseapp.com",
  projectId: "ecommerce-f9f32",
  storageBucket: "ecommerce-f9f32.appspot.com",
  messagingSenderId: "597429042646",
  appId: "1:597429042646:web:79ace3d3e9afd0209ef877",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
