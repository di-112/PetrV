// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyC5ArH56qWnXKuv0X1wNojWM0a0Zchn9UQ',
  authDomain: 'zencode-2af19.firebaseapp.com',
  projectId: 'zencode-2af19',
  storageBucket: 'zencode-2af19.appspot.com',
  messagingSenderId: '308218925816',
  appId: '1:308218925816:web:3f656ac57db642692fa10d',
  measurementId: 'G-JY7Y7LNCHS',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
