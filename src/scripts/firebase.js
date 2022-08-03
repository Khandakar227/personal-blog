//@ts-check
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithRedirect,
  getAuth,
  getRedirectResult,
} from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  initializeFirestore,
  limit,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

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

export const firestore = initializeFirestore(app, {});

export async function onGetAuthRedirectResult(params) {
  const result = await getRedirectResult(auth);
  const user = result?.user;
  if (!user) return;

  const userData = {
    uid: user.uid,
    email: user.email,
    subscribed: false,
    logged_in_at: new Date().toLocaleString("en-US", { timeZone: "BST" }),
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
/**
 *
 * @param {import("firebase/auth").User} user
 * @param {string} post_url
 * @param {string} comment
 * @param {string} replyOf Comment ID from firestore
 */
export async function addComment(user, post_url, comment = "", replyOf = "") {
  if (!comment || !user.uid || !post_url) return;

  const commentsRef = collection(firestore, "comments");
  const data = {
    uid: user.uid,
    post_url,
    displayName: user.displayName,
    photoURL: user.photoURL,
    content: comment,
    edited: false,
    timestamp: new Date(),
    replyOf,
  };

  await addDoc(commentsRef, data).catch((error) => {
    console.log(error);
    throw new Error(error);
  });
}

/**
 *
 * @param {import("firebase/auth").User} user
 * @param {string} comment
 * @param {string} comment_id Comment ID from firestore
 */
export async function editComment(user, comment, comment_id) {
  if (!comment || !user.uid) return;

  const commentDoc = doc(collection(firestore, "comments"), comment_id);
  const data = {
    displayName: user.displayName,
    photoURL: user.photoURL,
    content: comment,
    edited: true,
  };
  await updateDoc(commentDoc, data).catch((error) => {
    console.log(error);
    throw new Error(error);
  });
}
/**
 * @param {string} comment_id
 */
export async function deleteComment(comment_id) {
  if (!comment_id) return;

  const commentDoc = doc(collection(firestore, "comments"), comment_id);
  await deleteDoc(commentDoc).catch((error) => {
    throw new Error(error);
  });
}
/**
 *
 * @param {string} post_url
 *
 */
export async function getComments(post_url) {
  const commentsRef = collection(firestore, "comments");
  const q = query(commentsRef, where("post_url", "==", post_url), orderBy("timestamp", "desc"));

  try {
    const data = (await getDocs(q)).docs;
    return [...data.map((doc) => doc.data())];
  } catch (error) {
    console.log(error);
  }
}
