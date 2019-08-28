var currentUserId = "";
var hasAClass = null;
const level = {
  currentLevel: 1,
  experience: 0,
  needed: 1000
}
const prophet = {
  classname: "Prophet",
  hp: 1200,
  attack: 300,
  def: 20,
  critrate: 30,
  critdamage: 50,
  accuracy: 10,
  speed: 0
};
const clockwork = {
  classname: "Clockwork",
  hp: 1000,
  attack: 500,
  def: 10,
  critrate: 35,
  critdamage: 50,
  accuracy: 10,
  speed: 10
};
const stomper = {
  classname: "Stomper",
  hp: 1600,
  attack: 250,
  def: 10,
  critrate: 30,
  critdamage: 50,
  accuracy: 10,
  speed: 0
};
auth.onAuthStateChanged(user => {
  if (user) {
    currentUserId = user.uid;

    database
      .ref("users")
      .child(currentUserId)
      .child("stats")
      .once("value")
      .then(snapshot => {
        hasAClass = snapshot.val();
      });
  } else {
    console.log("user logged out");
  }
});

const characterForm = document.querySelector("#character-choice");

characterForm.addEventListener("submit", event => {
  event.preventDefault();

  const classname = characterForm["classname"].value;

  if (
    (classname === "prophet" && hasAClass === null) ||
    (classname === "Prophet" && hasAClass === null)
  ) {
    database
      .ref("/users")
      .child(currentUserId)
      .child("/stats")
      .update(prophet);
    window.location.href = "home.html";
  } else if (
    (classname === "stomper" && hasAClass === null) ||
    (classname === "Stomper" && hasAClass === null)
  ) {
    Promise.all([
      database
      .ref("/users")
      .child(currentUserId)
      .child("/level")
      .update(level),

      database
        .ref("/users")
        .child(currentUserId)
        .child("/stats")
        .update(stomper),

      database
        .ref("/users")
        .child(currentUserId)
        .child("/head")
        .update(bucket),
      database
        .ref("/users")
        .child(currentUserId)
        .child("/torso")
        .update(brokenbuckler),
      database
        .ref("/users")
        .child(currentUserId)
        .child("/legs")
        .update(tubes),
      database
        .ref("/users")
        .child(currentUserId)
        .child("/shoes")
        .update(rustyboots),
      database
        .ref("/users")
        .child(currentUserId)
        .child("/lefthand")
        .update(piston),
      database
        .ref("/users")
        .child(currentUserId)
        .child("/righthand")
        .update(empty)
    ]).then(() => {
      window.location.href = "home.html";
    });
  } else if (
    (classname === "clockwork" && hasAClass === null) ||
    (classname === "Clockwork" && hasAClass === null)
  ) {
    Promise.all([
      database
      .ref("/users")
      .child(currentUserId)
      .child("/level")
      .update(level),

      database
        .ref("/users")
        .child(currentUserId)
        .child("/stats")
        .update(clockwork),

      database
        .ref("/users")
        .child(currentUserId)
        .child("/head")
        .update(binoculars),
      database
        .ref("/users")
        .child(currentUserId)
        .child("/torso")
        .update(oldwatch),
      database
        .ref("/users")
        .child(currentUserId)
        .child("/legs")
        .update(rippedleather),
      database
        .ref("/users")
        .child(currentUserId)
        .child("/shoes")
        .update(shooz),
      database
        .ref("/users")
        .child(currentUserId)
        .child("/lefthand")
        .update(oldpistol),
      database
        .ref("/users")
        .child(currentUserId)
        .child("/righthand")
        .update(oldpistol)
    ]).then(() => {
      window.location.href = "home.html";
    });
  } else if (hasAClass === null) {
    window.alert("Choose a class");
  } else if (hasAClass) {
    window.alert("You already have a class!");
  }
  // setTimeout(loading(), 2000)
  // var loading = () => {
  //   window.location.href = "home.html";

  characterForm.reset();
});
