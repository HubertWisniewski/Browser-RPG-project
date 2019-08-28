var currentUserId = "";
var userdata = null;
var classnamedisplay = document.getElementById("classname");
var leveldisplay = document.getElementById("level-display");
var hpdisplay = document.getElementById("hp");
var attackdisplay = document.getElementById("attack");
var defdisplay = document.getElementById("def");
var critratedisplay = document.getElementById("critrate");
var critdamagedisplay = document.getElementById("critdamage");
var accuracydisplay = document.getElementById("accuracy");
var speeddisplay = document.getElementById("speed");
var usernamedisplay = document.getElementById('username-display')
var eqhp = 0;
// var arenabutton = document.getElementById('arena')
var eqattack = 0;
var eqdef = 0;
var eqcritrate = 0;
var eqcritdamage = 0;
var eqaccuracy = 0;
var eqspeed = 0;



auth.onAuthStateChanged(user => {
  if (user) {
    currentUserId = user.uid;

    database.ref('/users').child(currentUserId).child('/level').on('value', snapshot => {
      console.log(snapshot.val())
      var data = snapshot.val()
      
      if(data.experience >= data.needed) {
        database.ref('/users').child(currentUserId).child('/level').update(
          {
            currentLevel: userdata.level.currentLevel + 1,
            experience: 0,
            needed: userdata.level.needed + userdata.level.needed/4
          }
        )
      }
      if(userdata) {
        usernamedisplay.innerHTML = userdata.name + " " + "LVL." + data.currentLevel
        leveldisplay.innerHTML = "EXP." + data.experience + '/' + data.needed
      }
       
    })

    
   
    database
      .ref("/users")
      .child(currentUserId)
      .once("value")
      .then(snapshot => {
        userdata = snapshot.val();
        eqStatsCounter(userdata, eqhp, eqspeed, eqaccuracy, eqcritdamage, eqcritrate, eqdef, eqattack);
      })
      .then(data => {
        classnamedisplay.innerHTML = userdata.stats.classname;
        usernamedisplay.innerHTML = userdata.name + " " + "LVL." + userdata.level.currentLevel
        leveldisplay.innerHTML = "EXP." + userdata.level.experience + '/' + userdata.level.needed

        hpdisplay.innerHTML =
          "HP :" + " " + userdata.stats.hp + " " + "+" + " " + eqhp;
        attackdisplay.innerHTML =
          "Attack :" + " " + userdata.stats.attack + " " + "+" + " " + eqattack;
        defdisplay.innerHTML =
          "Defense :" + " " + userdata.stats.def + " " + "+" + " " + eqdef;
        critratedisplay.innerHTML =
          "Crit rate :" +
          " " +
          userdata.stats.critrate +
          "%" +
          " " +
          "+" +
          " " +
          eqcritrate;
        critdamagedisplay.innerHTML =
          "Crit damage :" +
          " " +
          userdata.stats.critdamage +
          " " +
          "+" +
          " " +
          eqcritdamage;
        accuracydisplay.innerHTML =
          "Accuracy :" +
          " " +
          userdata.stats.accuracy +
          " " +
          "+" +
          " " +
          eqaccuracy;
        speeddisplay.innerHTML =
          "Speed :" + " " + userdata.stats.speed + " " + "+" + " " + eqspeed;

        storage
          .ref()
          .child("items/" + userdata.head.name + ".png")
          .getDownloadURL()
          .then(url => {
            var test = url;
            document.getElementById("headimage").src = test;
          });

        storage
          .ref()
          .child("items/" + userdata.torso.name + ".png")
          .getDownloadURL()
          .then(url => {
            var test = url;
            document.getElementById("torsoimage").src = test;
          });

        storage.ref().child('items/' + userdata.legs.name + '.png').getDownloadURL().then(url => {
            var test = url
            document.getElementById('legsimage').src = test
        })

            storage.ref().child('items/' + userdata.lefthand.name + '.png').getDownloadURL().then(url => {
                var test = url
            document.getElementById('lefthandimage').src = test
        })

        storage.ref().child('items/' + userdata.shoes.name + '.png').getDownloadURL().then(url => {
            var test = url
            document.getElementById('shoesimage').src = test
            console.log('here')

        })

        if (userdata.stats.classname === "Stomper") {

        var lefthand = document.getElementById("lefthand")
          document.getElementById("righthandimage").style.opacity = 0;
          lefthand.style.height = 30 + "vh";
          lefthand.style.width = 20 + "vh";
          lefthand.style.top = 25 + 'vh' ;
          lefthand.style.right = 56 + "vh";
          return;
        } else {
          storage
            .ref()
            .child("items/" + userdata.righthand.name + ".png")
            .getDownloadURL()
            .then(url => {
              var test = url;
              document.getElementById("righthandimage").src = test;
            });
        }

       
                

        // document.querySelector('img').src = test;
      });
    console.log("user logged in", user.uid);
  } else {
    console.log("user logged out");
  }
});

var eqStatsCounter = userdata => {
  if (userdata) {
    eqhp =
      userdata.head.hp +
      userdata.torso.hp +
      userdata.lefthand.hp +
      userdata.righthand.hp +
      userdata.legs.hp +
      userdata.shoes.hp;
    eqspeed =
      userdata.head.speed +
      userdata.torso.speed +
      userdata.lefthand.speed +
      userdata.righthand.speed +
      userdata.legs.speed +
      userdata.shoes.speed;
    eqaccuracy =
      userdata.head.acc +
      userdata.torso.acc +
      userdata.lefthand.acc +
      userdata.righthand.acc +
      userdata.legs.acc +
      userdata.shoes.acc;
    eqcritdamage =
      userdata.head.critdamage +
      userdata.torso.critdamage +
      userdata.lefthand.critdamage +
      userdata.righthand.critdamage +
      userdata.legs.critdamage +
      userdata.shoes.critdamage;
    eqcritrate =
      userdata.head.critrate +
      userdata.torso.critrate +
      userdata.lefthand.critrate +
      userdata.righthand.critrate +
      userdata.legs.critrate +
      userdata.shoes.critrate;
    eqdef =
      userdata.head.def +
      userdata.torso.def +
      userdata.lefthand.def +
      userdata.righthand.def +
      userdata.legs.def +
      userdata.shoes.def;
    eqattack =
      userdata.head.attack +
      userdata.torso.attack +
      userdata.lefthand.attack +
      userdata.righthand.attack +
      userdata.legs.attack +
      userdata.shoes.attack;
  } else {
    return 0;
  }
};




