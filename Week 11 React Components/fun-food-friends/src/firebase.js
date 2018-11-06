//<script src="https://www.gstatic.com/firebasejs/5.5.5/firebase.js"></script>

import firebase from 'firebase'

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBUkDoaPEkQuSCgSZvSB7XK1Fwpfj_srlA",
        authDomain: "week-11-react.firebaseapp.com",
        databaseURL: "https://week-11-react.firebaseio.com",
        projectId: "week-11-react",
        storageBucket: "week-11-react.appspot.com",
        messagingSenderId: "1055170509330"
  };
  firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;
