import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithRedirect,
  getAuth,
  getRedirectResult,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBMH6nrgTxD0-VdYFgsqH4a3aeJM6kIko0",
  authDomain: "practice-project-b98ec.firebaseapp.com",
  databaseURL: "https://practice-project-b98ec-default-rtdb.firebaseio.com",
  projectId: "practice-project-b98ec",
  storageBucket: "practice-project-b98ec.appspot.com",
  messagingSenderId: "849495653854",
  appId: "1:849495653854:web:453b0faf4a8504c577f14f",
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export async function onGetAuthRedirectResult(params) {
  const result = await getRedirectResult(auth);
  const user = result.user;
  if (!user) return;

  const userData = {
    uid: user.uid,
    name: user.displayName,
    email: user.email,
    logged_in_at: (new Date()).toLocaleString('en-US', { timeZone: 'BST' })
  };
  //Send it to the db
}
/**
 *
 * @param {string} email
 * @param {string} password
 */
export async function signUp(email, password) {
  try {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    console.log(user);
    return user;
  } catch (error) {
    console.log(error);
  }
}

export async function signInWithGoogle() {
  try {
    const googleProvider = new GoogleAuthProvider();
    await signInWithRedirect(auth, googleProvider);
  } catch (error) {
    console.log(error);
  }
}
