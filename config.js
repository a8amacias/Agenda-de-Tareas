const firebaseConfig = {
  apiKey: "AIzaSyD_ZFW_XtDmRidIt4Q_GEhT2OsMUR_UtSA",
  authDomain: "agenda-de-tareas-f6d01.firebaseapp.com",
  projectId: "agenda-de-tareas-f6d01",
  storageBucket: "agenda-de-tareas-f6d01.firebasestorage.app",
  messagingSenderId: "795424230539",
  appId: "1:795424230539:web:e1ec344db3a9697632d88e"

};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
