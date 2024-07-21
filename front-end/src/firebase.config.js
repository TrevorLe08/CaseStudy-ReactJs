import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC2CM6MKBmmArF9nI_tOe92FfEV2uNDt5w",
  authDomain: "case-reactjs.firebaseapp.com",
  projectId: "case-reactjs",
  storageBucket: "case-reactjs.appspot.com",
  messagingSenderId: "994833344859",
  appId: "1:994833344859:web:6ede31eb519679cc66127e",
  measurementId: "G-82YL6JVZ39"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const imageStorage = getStorage(app)