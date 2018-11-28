import firebase from 'firebase'

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDF5_2xAVmCeSM1h7upbnISEBsJ6drvneQ",
  authDomain: "c04practise.firebaseapp.com",
  databaseURL: "https://c04practise.firebaseio.com",
  projectId: "c04practise",
  storageBucket: "c04practise.appspot.com",
  messagingSenderId: "951189355969"
};
firebase.initializeApp(config);

export default firebase;
