
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const app = firebase.initializeApp({
  apiKey: "AIzaSyAVo1fUG-kqfnNfL1pshhgR5IET44tSj7M",
  authDomain: "mon-budget-ef412.firebaseapp.com",
  projectId: "mon-budget-ef412",
  storageBucket: "mon-budget-ef412.appspot.com",
  messagingSenderId: "843838196679",
  appId: "1:843838196679:web:f226bebfa0e6831f9667e2"
});

export const auth = app.auth();
export default app;