// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAEpbBg5r9o6m5Wdp_tF995xMl4KduREfQ",
  authDomain: "myryde-49810.firebaseapp.com",
  projectId: "myryde-49810",
  messagingSenderId: "399067785924",
  appId: "1:399067785924:web:f5b7f146ae922941e6b791",
};

// const firebaseConfig = {
//   apiKey: "AIzaSyAEpbBg5r9o6m5Wdp_tF995xMl4KduREfQ",
//   authDomain: "myryde-49810.firebaseapp.com",
//   projectId: "myryde-49810",
//   storageBucket: "myryde-49810.firebasestorage.app",
//   messagingSenderId: "399067785924",
//   appId: "1:399067785924:web:f5b7f146ae922941e6b791",
//   measurementId: "G-F5PR31QPQP"
// };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };