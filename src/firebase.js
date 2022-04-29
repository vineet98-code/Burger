// import firebase from 'firebase'
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyBKBnIxNIDd9lN9-QVnqx3Jpj93u0CUs3c",
  authDomain: "burger-app-3baa9.firebaseapp.com",
  projectId: "burger-app-3baa9",
  storageBucket: "burger-app-3baa9.appspot.com",
  messagingSenderId: "719504522546",
  appId: "1:719504522546:web:4fd87c34ac41ec916feb2b",
  measurementId: "G-N6L8HN9HKF"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);