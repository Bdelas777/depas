// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBRJKMPr9mXt3h75RgbOCEeV-JyvwHaHzY",
    authDomain: "travel-c770a.firebaseapp.com",
    projectId: "travel-c770a",
    storageBucket: "travel-c770a.appspot.com",
    messagingSenderId: "836189621389",
    appId: "1:836189621389:web:630d83cc7e27ca3433a6c4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage();