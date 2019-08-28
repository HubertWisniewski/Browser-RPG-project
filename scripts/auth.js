
// var submitButton = document.getElementById('submitbutton')
// var usernameInput = document.getElementById('signup-username')
const signupForm = document.querySelector("#signup-form");
const signInForm = document.querySelector('#signin-form')


auth.onAuthStateChanged(user => {
  if (user) {
    console.log("user logged in");
  } else {
    console.log("user logged out");
  }
});


signupForm.addEventListener("submit", event => {
  event.preventDefault();
 
  const username = signupForm["signup-username"].value;
  const email = signupForm["signup-email"].value;
  const password = signupForm["signup-password"].value;

    auth.createUserWithEmailAndPassword(email, password).then(data => {
      database.ref("users/" + data.user.uid).set({
        name: username
      });
      
  
      signupForm.reset();
  
      window.location.href = "charactercreation.html";
    });



});

signInForm.addEventListener("submit", event => {
  event.preventDefault();
 
  const signinemail = signInForm["signin-email"].value;
  const signinpassword = signInForm["signin-password"].value;

    // auth.createUserWithEmailAndPassword(email, password).then(data => {
    //   database.ref("users/" + data.user.uid).set({
    //     name: username
    //   });
      
  
    //   signupForm.reset();
  
    //   window.location.href = "home.html";
    // });

    firebase.auth().signInWithEmailAndPassword(signinemail, signinpassword).then(data => {
      
      signInForm.reset();
  
      window.location.href = "home.html";
    });


    
});
