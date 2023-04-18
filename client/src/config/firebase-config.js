import { initializeApp } from 'firebase/app';
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDLwjL-WX4wk62XnprVPtbYT5B7X1Og4PY',
  authDomain: 'bait-app-383517.firebaseapp.com',
  projectId: 'bait-app-383517',
  storageBucket: 'bait-app-383517.appspot.com',
  messagingSenderId: '29968087697',
  appId: '1:29968087697:web:337ff8bb9e9422bedb9d30',
  measurementId: 'G-1QT6Q2D7C1'
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
// const analytics = getAnalytics(app);
