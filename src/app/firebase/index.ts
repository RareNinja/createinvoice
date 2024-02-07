import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { firebaseConfig } from "./config";

const firebase = initializeApp(firebaseConfig);

export const auth = getAuth();
export default firebase;