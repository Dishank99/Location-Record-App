import firebase from 'firebase';

const App = firebase.initializeApp({
    apiKey: "AIzaSyDfaQVjQmshujz33xlYzTWFzdCU4QHqu48",
    authDomain: "location-records-app.firebaseapp.com",
    databaseURL: "https://location-records-app.firebaseio.com",
    projectId: "location-records-app",
    storageBucket: "location-records-app.appspot.com",
    messagingSenderId: "213620412893",
    appId: "1:213620412893:web:9cca7f16f67229bc38a634"
})

const db = App.firestore()

export default db;