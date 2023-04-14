import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { app } from '../config/firebase-config'
import axios from 'axios'

export const loginWithGoogle = () => {
  console.log('google authentication')
  const provider = new GoogleAuthProvider()
  const auth = getAuth()
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result)
      const token = credential.accessToken
      // The signed-in user info.
      //   console.log(typeof token)
      try {
        axios
          .get('http://localhost:3001/login/google', {
            headers: {
              Authorization: 'Bearer ' + token,
              'Content-Type': 'application/json',
            },
          })
          .then((res) => console.log(res.data))
      } catch (error) {
        console.log(error)
      }

      const user = result.user
      //   console.log(user)
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code
      const errorMessage = error.message
      // The email of the user's account used.
      const email = error.customData.email
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error)
      // ...
    })
}
