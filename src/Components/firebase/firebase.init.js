// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBz6GTeGsMR3FHbfj6pggm5taozZOBl64E",
  authDomain: "lost-found-website-client.firebaseapp.com",
  projectId: "lost-found-website-client",
  storageBucket: "lost-found-website-client.firebasestorage.app",
  messagingSenderId: "966689594320",
  appId: "1:966689594320:web:83039d93caa004062877d5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export default auth;