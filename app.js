var config = {
    apiKey: "AIzaSyB9uhsP-dF1nu4bQnaSUHjzS7MJGW-jSNY",
    authDomain: "growbotixfirstunit.firebaseapp.com",
    databaseURL: "https://growbotixfirstunit.firebaseio.com",
    projectId: "growbotixfirstunit",
    storageBucket: "growbotixfirstunit.appspot.com",
    messagingSenderId: "955557583166"
};
firebase.initializeApp(config);

var email, password, r1, r2, r3, r4;

$(document).ready(function() {
  var database = firebase.database();

  $('.loginButton').click(function(){
    email = $('.loginEmail').val();
    password = $('.loginPassword').val();
    const auth = firebase.auth();
    const promise = auth.signInWithEmailAndPassword(email, password);
    promise.catch(e => console.log(e.message));
  });

  $('.signUpButton').click(function() {
    email = $('.loginEmail').val();
    password = $('.loginPassword').val();
    console.log(email);
    console.log(password);
    const auth = firebase.auth();
    const promise = auth.createUserWithEmailAndPassword(email, password);
    promise.catch(e => console.log(e.message));
  });

  $('.signoutButton').click(function() {
    $('.loginEmail').val('');
    $('.loginPassword').val('');
    const auth = firebase.auth();
    auth.signOut();
  });

  firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser){
      console.log(firebaseUser);
      $('.form').hide();
      $('.signoutButton').show();
      $('.powerControl').show();

      database.ref().on("value", function(snap){
        var relay_1 = snap.val().relay1;
        var relay_2 = snap.val().relay2;
        var relay_3 = snap.val().relay3;
        var relay_4 = snap.val().relay4;

        if (relay_1 == 1){
          $('.relay1').text('Power 1 is on');
          r1 = true;
        } else if(relay_1 ==0){
          $('.relay1').text('Power is off')
          r1 = false;
        }
        if (relay_2 == 1){
          $('.relay2').text('Power 2 is on');
          r2 = true;
        } else if(relay_2 ==0){
          $('.relay2').text('Power 2 is off')
          r2 = false;
        }
        if (relay_3 == 1){
          $('.relay3').text('Power 3 is on');
          r3 = true;
        } else if(relay_3 ==0){
          $('.relay3').text('Power 3 is off')
          r3 = false;
        }
        if (relay_4 == 1){
          $('.relay4').text('Power 4 is on');
          r4 = true;
        } else if(relay_4 == 0){
          $('.relay4').text('Power 4 is off')
          r4 = false;
        }
      });
    } else {
      console.log('not logged in');
      $('.form').show();
      $('.signoutButton').hide();
      $('.powerControl').hide();
    }
  });

  $('.relay1').click(function(event) {
    var firebaseRef = firebase.database().ref().child("relay1");
    if (r1){
      firebaseRef.set(0);
    } else {
      firebaseRef.set(1);
    }
  });

  $('.relay2').click(function(event) {
    var firebaseRef = firebase.database().ref().child("relay2");
    if(r2){
      firebaseRef.set(0);
    } else{
      firebaseRef.set(1);
    }
  });

  $('.relay3').click(function(event) {
    var firebaseRef = firebase.database().ref().child("relay3");
    if(r3){
      firebaseRef.set(0);
    } else {
      firebaseRef.set(1);
    }
  });

  $('.relay4').click(function(event) {
    var firebaseRef = firebase.database().ref().child("relay4");
    if(r4){
      firebaseRef.set(0);
    } else {
      firebaseRef.set(1);
    }
  });
});


/*
const auth = firebase.auth();
auth.signInWithEmailAndPassword(email, pass);
auth.createUserWithEmailAndPassWord(email, pass);

auth.onAuthStateChanged(firebaseUser => {} );
*/
