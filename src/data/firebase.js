import firebase from 'firebase/compat/app'
import 'firebase/compat/database'

const firebaseConfig = {
    apiKey: "AIzaSyD0l0tYTo1VxtcPSqKIIWQl1U8yZ6vZkxc",
    authDomain: "robotapp-2022.firebaseapp.com",
    databaseURL: "https://robotapp-2022-default-rtdb.firebaseio.com",
    projectId: "robotapp-2022",
    storageBucket: "robotapp-2022.appspot.com",
    messagingSenderId: "103531614642",
    appId: "1:103531614642:web:53321c16c1c699fbb554ab",
    measurementId: "G-BXQX9L4BFR"
};

firebase.initializeApp(firebaseConfig)
export default firebase;