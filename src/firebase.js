import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD_ayHGiXIgzpH-omtuhuZey6T5X4DHqRs",
    authDomain: "to-do-app-f4bf1.firebaseapp.com",
    databaseURL: "https://to-do-app-f4bf1-default-rtdb.firebaseio.com",
    projectId: "to-do-app-f4bf1",
    storageBucket: "to-do-app-f4bf1.appspot.com",
    messagingSenderId: "162884914529",
    appId: "1:162884914529:web:27b3fe7e309d3c8d0e8920"
};

const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);