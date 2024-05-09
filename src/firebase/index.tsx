import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBi1APpO1Y5LOo_Z6KeEbYAU5jXrUgPK9s",
  authDomain: "entertainment-web-app-8d1bf.firebaseapp.com",
  projectId: "entertainment-web-app-8d1bf",
  storageBucket: "entertainment-web-app-8d1bf.appspot.com",
  messagingSenderId: "365004760428",
  appId: "1:365004760428:web:3ecd5aa8388a885e4c3f49",
  measurementId: "G-XF3819JEGL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;