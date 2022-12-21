// ----------------- Page Loaded After User Sign-in -------------------------//

// ----------------- Firebase Setup & Initialization ------------------------//

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

import { getDatabase, ref, set, update, child, get, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

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


// ----------------------- Get reference values -----------------------------
let userLink = document.getElementById('userLink');         //Username for navbar
let signOutLink = document.getElementById('signOut');       //Sign out Link
let welcome = document.getElementById('welcome');           //Welcome header
let currentUser = null;                                     //Initialize currentUser to null


// ----------------------- Get User's Name'Name ------------------------------
function getUserName(){
  //Grab the value for the 'keep logged in' switch
  let keepLoggedIn = localStorage.getItem('keepLoggedIn');
  
  //Grab user info passed in from signIn.js
  if(keepLoggedIn == 'yes'){
    currentUser = JSON.parse(localStorage.getItem('user'));
  }else{
    currentUser = JSON.parse(sessionStorage.getItem('user'));
  }
}

// Sign-out function that will remove user info from local/session storage and
// sign-out from FRD

function signOutUser(){
  sessionStorage.removeItem('user');    //Clear the session storage
  localStorage.removeItem('user');      //Clear local storage
  localStorage.removeItem('keepLoggedIn');

  signOutLink(auth).then(() => {
    //Sign out successful
  }).catch((error)=>{
    //Error occurred
  })

  window.location = 'home.html';
}



// ------------------------Set (insert) data into FRD ------------------------
function setData(userID, group, day, height){
  //Must use brackets around variable name to use it as a key
  set(ref(db, 'users/' + userID + '/data/' + group), {
    [day]: height
  }).then(()=>{
    alert('Data set successfully!');
  }).catch((error)=>{
    alert('There was an error. Error: ' + error);
  });
}

// -------------------------Update data in database --------------------------
function updateData(userID, group, day, height){
  //Must use brackets around variable name to use it as a key
  update(ref(db, 'users/' + userID + '/data/' + group), {
    [day]: height
  }).then(()=>{
    alert('Data updated successfully!');
  }).catch((error)=>{
    alert('There was an error. Error: ' + error);
  });
}

// --------------------------- Home Page Loading -----------------------------
window.onload = function(){

  // ------------------------- Set Welcome Message -------------------------
  getUserName();
  if(currentUser == null){
    userLink.innerText = 'Create New Account';
    userLink.classList.replace('nav-link', 'btn');
    userLink.classList.add('btn-primary');
    userLink.href = 'register.html';

    signOutLink.innerText = 'Sign In';
    signOutLink.classList.replace('nav-link', 'btn');
    signOutLink.classList.add('btn-success');
    signOutLink.href = 'signIn.html';

  } else {
    userLink.innerText = currentUser.firstName;
    welcome.innerText = 'Welcome ' + currentUser.firstName;
    userLink.classList.replace('btn', 'nav-link');
    userLink.classList.remove('btn-primary');
    userLink.href = '#';

    signOutLink.innerText = 'Sign Out';
    signOutLink.classList.replace('btn', 'bnav-link');
    signOutLink.classList.remove('btn-success');
    document.getElementById('signOut').onclick = function(){
      signOutUser();
    }
  }
  
  // Set and Update Data in FRD
  // Set (Insert) data function call
  document.getElementById('set').onclick = function(){
    const group = document.getElementById('group').value;
    const day = document.getElementById('day').value;
    const height = document.getElementById('height').value;
    const userID = currentUser.uid;

    setData(userID, group, day, height);
  };

  // Update data function call
  document.getElementById('update').onclick = function(){
    const group = document.getElementById('group').value;
    const day = document.getElementById('day').value;
    const height = document.getElementById('height').value;
    const userID = currentUser.uid;

    updateData(userID, group, day, height);
  };
}
  

