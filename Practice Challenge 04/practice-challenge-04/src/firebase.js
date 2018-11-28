import firebase from 'firebase'

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCCWH4dEahRqJLAzH6Cb8QnB8UJbsFjgGc",
  authDomain: "challenge04practice.firebaseapp.com",
  databaseURL: "https://challenge04practice.firebaseio.com",
  projectId: "challenge04practice",
  storageBucket: "challenge04practice.appspot.com",
  messagingSenderId: "394203413774"
};
firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase;
