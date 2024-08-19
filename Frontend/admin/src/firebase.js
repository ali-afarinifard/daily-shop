// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA2kl02QP61pyPR-TAEkLy4zeZJNw8KA5w",
  authDomain: "shopping-3c3a6.firebaseapp.com",
  projectId: "shopping-3c3a6",
  storageBucket: "shopping-3c3a6.appspot.com",
  messagingSenderId: "89628995893",
  appId: "1:89628995893:web:f048601620ad3caf415c7c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export const uploadFile = async (file) => {
  const storageRef = ref(storage, `products/${Date.now()}_${file.name}`);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
};

export { storage };