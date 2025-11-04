// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {

  // apiKey: "AIzaSyAeT2ajKinNp5AchrFRC8LXoMBc0yz7b_0",
  // authDomain: "smart-deals-43047.firebaseapp.com",
  // projectId: "smart-deals-43047",
  // storageBucket: "smart-deals-43047.firebasestorage.app",
  // messagingSenderId: "123417248607",
  // appId: "1:123417248607:web:f35982597e9cb62abdecea"


  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_PROJECTID,
  storageBucket: import.meta.env.VITE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_APPID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);