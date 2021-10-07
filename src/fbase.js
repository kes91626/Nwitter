import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

<script src="https://www.gstatic.com/firebasejs/4.10.1/firebase.js"></script>;
const firebaseConfig = {
  apiKey: 'AIzaSyD1rt933FFTyEcnWkUiIjXutDmi_eTkSH0',
  authDomain: 'nwitter-3d6e7.firebaseapp.com',
  projectId: 'nwitter-3d6e7',
  storageBucket: 'nwitter-3d6e7.appspot.com',
  messagingSenderId: '984551402179',
  appId: '1:984551402179:web:5a3cc58f7c29b592b31076',
};
initializeApp(firebaseConfig);

export const authService = getAuth();
export const dbService = getFirestore();
export const storageService = getStorage();
