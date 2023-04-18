import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase-config';
import axios from 'axios';

export const signInWithGoogle = async () => {
  console.log('google authentication');
  try {
    const user = await signInWithPopup(auth, googleProvider);
    const { firstName, lastName } = user._tokenResponse;
    const { email, phoneNumber, photoURL, emailVerified } = user.user;
    await axios
      .post('http://localhost:3001/user/google', {
        firstName,
        lastName,
        email,
        phoneNumber,
        photoURL,
        emailVerified
      })
      .then((res) => {
        if (res.data.token) return window.localStorage.setItem('token', res.data.token);
        window.alert(res.data.message);
      }
      );
  } catch (error) {
    console.log(error);
  }
};
export const logOut = () => {
  window.localStorage.removeItem('token');
  signOut(auth);
};

export const loginWithGoogle = async () => {
  const { user } = await signInWithPopup(auth, googleProvider);
  await axios
    .post('http://localhost:3001/login/google', { email: user.email })
    .then((res) => window.localStorage.setItem('token', res.data.token));
};
