// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyDLwjL-WX4wk62XnprVPtbYT5B7X1Og4PY",
  authDomain: "bait-app-383517.firebaseapp.com",
  projectId: "bait-app-383517",
  storageBucket: "bait-app-383517.appspot.com",
  messagingSenderId: "29968087697",
  appId: "1:29968087697:web:337ff8bb9e9422bedb9d30",
  measurementId: "G-1QT6Q2D7C1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
