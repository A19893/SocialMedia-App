import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCFFOfro8oKfJvsvjus71OVFkwKAWprAno",
  authDomain: "social-media-app-a82f3.firebaseapp.com",
  projectId: "social-media-app-a82f3",
  storageBucket: "social-media-app-a82f3.appspot.com",
  messagingSenderId: "400208203583",
  appId: "1:400208203583:web:ce70964fc19fb926f48d8a",
  measurementId: "G-BSQ79ELXBN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const googleProvider=new GoogleAuthProvider();
export const db=getFirestore(app)
export const storage=getStorage(app)