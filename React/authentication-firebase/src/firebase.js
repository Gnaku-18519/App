import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCtqTmWJWuSPM67VyTYQ55b8fw_98cwR1o",
  authDomain: "react-auth-development-48c0b.firebaseapp.com",
  projectId: "react-auth-development-48c0b",
  storageBucket: "react-auth-development-48c0b.appspot.com",
  messagingSenderId: "370654886253",
  appId: "1:370654886253:web:eea2d6bf7292ebe9990264"
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth()

export default app
