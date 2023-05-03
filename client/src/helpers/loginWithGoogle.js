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
      .post('/user/google', {
        firstName,
        lastName,
        email,
        phoneNumber,
        photoURL,
        emailVerified
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.token) {
          window.localStorage.setItem('token', res.data.token);
          location.reload();
        };
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
  const data = {
    name: user.displayName.split(' ').at(0),
    lastname: user.displayName.split(' ').at(1),
    email: user.email,
    verified: user.emailVerified
  };
  console.log(data);
  await axios
    .post('/login/google', { email: user.email })
    .then((res) => {
      window.localStorage.setItem('token', res.data.token);
      location.reload();
    });
};
//
