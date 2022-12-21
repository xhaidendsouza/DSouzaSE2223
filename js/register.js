// This JS file is for registering a new app user ---------------------------//

// ----------------- Firebase Setup & Initialization ------------------------//

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

import { getDatabase, ref, set, update, child, get } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0h44eJCciKveKKQPJ8kv4AS-k7CE-QgI",
  authDomain: "day-7-research-data.firebaseapp.com",
  databaseURL: "https://day-7-research-data-default-rtdb.firebaseio.com",
  projectId: "day-7-research-data",
  storageBucket: "day-7-research-data.appspot.com",
  messagingSenderId: "10554959656",
  appId: "1:10554959656:web:dacde79c936d219c2bd21d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Initialize Authentication
const auth = getAuth();

//Return an instance of the app's FRD
const db = getDatabase(app);

// ---------------- Register New User --------------------------------//

document.getElementById('submitData').onclick = function(){
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const email = document.getElementById('userEmail').value;

  //Firebase will require a password of at least 6 characters
  const password = document.getElementById('userPass').value;

  if(!validation(firstName, lastName, email, password)){
    return;
  }

  //Create new app user
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    

    //Add user account info to realtime database
    //'set' will create a new reference or completely replace an existing one
    //each new user will be placed under the 'users' node
    set(ref(db, 'users/' + user.uid + '/accountInfo'), {
      uid: user.uid,    //Save userID for home.js reference
      email: email,
      password: encryptPass(password),
      firstName: firstName,
      lastName: lastName
    }).then(()=>{
      //Data saved successfully
      alert('User created successfully!');
    }).catch((error)=>{
      alert(error);
    })

  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage);
  });
}

// --------------- Check for null, empty ("") or all spaces only ------------//
function isEmptyorSpaces(str){
  return str === null || str.match(/^ *$/) !== null
}

// ---------------------- Validate Registration Data -----------------------//

function validation(firstName, lastName, email, password){
  let fNameRegex = /^[a-zA-Z]+$/;
  let lNameRegex = /^[a-zA-Z]+$/;
  let emailRegex = /^[a-zA-Z0-9]+@ctemc\.org$/;

  if(isEmptyorSpaces(firstName) || isEmptyorSpaces(lastName) || isEmptyorSpaces(email) || isEmptyorSpaces(password)){
    alert("Please complete all fields.");
    return false;
  }

  if(!fNameRegex.test(firstName)){
    alert("The first name should only contain letters.");
    return false;
  }
  if(!lNameRegex.test(lastName)){
    alert("The last name should only contain letters.");
    return false;
  }
  if(!emailRegex.test(email)){
    alert("Please enter a valid email.");
    return false;
  }

  return true;

}

// --------------- Password Encryption -------------------------------------//
function encryptPass(password){
  let encrypted = CryptoJS.AES.encrypt(password, password);
  return encrypted.toString();
}

function decryptPass(password){
  let decrypted = CryptoJS.AES.encrypt(password, password);
  return decrypted.toString();
}

