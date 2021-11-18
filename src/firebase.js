import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBAvfQ3NvnsCZmuch12N3Ko_r6_jk7JNsY",
  authDomain: "trabalho-firebase-3e1cc.firebaseapp.com",
  projectId: "trabalho-firebase-3e1cc",
  storageBucket: "trabalho-firebase-3e1cc.appspot.com",
  messagingSenderId: "563508391293",
  appId: "1:563508391293:web:2ada2e87f172c0699b3014",
  measurementId: "G-MRQK27X711"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);