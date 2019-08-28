var userbase = null;
var userdata = null;
var currentUserId = "";
var leveldisplay = document.getElementById("level-display");
var usernamedisplay = document.getElementById("username-display");
var playerNameDisplay = document.getElementById('playerName-display')
var opponentNameDisplay = document.getElementById('opponentName-display')
var opponentHpDisplay = document.getElementById("opponentHp-display");
var playerHpDisplay = document.getElementById('playerHp-display')
var userList = document.getElementById("userlist");
var newElement = null;
var getUserList = document.getElementById("getUsers");
var usersFetched = false;
var opponent = null;
var isOpponentChosen = false;
var realBattleStarter = document.getElementById("start");
var battleground = document.getElementById("displaytwo");
var theRealestBattleStarter = document.getElementById("realstart");
var yourHitDisplay = document.getElementById('yourHit')
var opponentHitDisplay = document.getElementById('opponentHit')
var backButton = document.getElementById("back");
var eqhp = 0;
var eqattack = 0;
var eqdef = 0;
var eqcritrate = 0;
var eqcritdamage = 0;
var eqaccuracy = 0;
var eqspeed = 0;
var opponenteqhp = 0;
var opponenteqattack = 0;
var opponenteqdef = 0;
var opponenteqcritrate = 0;
var opponenteqcritdamage = 0;
var opponenteqaccuracy = 0;
var opponenteqspeed = 0;


auth.onAuthStateChanged(user => {
  if (user) {
    currentUserId = user.uid;

    database
      .ref("/users")
      .child(currentUserId)
      .child("/level")
      .on("value", snapshot => {
        console.log(snapshot.val());
        var data = snapshot.val();

        if (data.experience >= data.needed) {
          database
            .ref("/users")
            .child(currentUserId)
            .child("/level")
            .update({
              currentLevel: userdata.level.currentLevel + 1,
              experience: 0,
              needed: userdata.level.needed + userdata.level.needed / 4
            });
        }
        if (userdata) {
          usernamedisplay.innerHTML =
            userdata.name + " " + "LVL." + data.currentLevel;
          leveldisplay.innerHTML = "EXP." + data.experience + "/" + data.needed;
        }
      });

    database
      .ref("/users")
      .once("value")
      .then(snapshot => {
        const value = snapshot.val();
        userbase = Object.entries(value || {}).map(([key, val]) => ({
          id: key,
          ...val
        }));
      });
  } else {
    console.log("user logged out");
  }
  database
    .ref("/users")
    .child(user.uid)
    .once("value")
    .then(snapshot => {
      userdata = snapshot.val();
      eqStatsCounter(userdata);  
    })
    .then(data => {
      usernamedisplay.innerHTML =
        userdata.name + " " + "LVL." + userdata.level.currentLevel;
      leveldisplay.innerHTML =
        "EXP." + userdata.level.experience + "/" + userdata.level.needed;

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

      storage
        .ref()
        .child("items/" + userdata.legs.name + ".png")
        .getDownloadURL()
        .then(url => {
          var test = url;
          document.getElementById("legsimage").src = test;
        });

      storage
        .ref()
        .child("items/" + userdata.lefthand.name + ".png")
        .getDownloadURL()
        .then(url => {
          var test = url;
          document.getElementById("lefthandimage").src = test;
        });

      storage
        .ref()
        .child("items/" + userdata.shoes.name + ".png")
        .getDownloadURL()
        .then(url => {
          var test = url;
          document.getElementById("shoesimage").src = test;
          console.log("here");
        });

      if (userdata.stats.classname === "Stomper") {
        var lefthand = document.getElementById("lefthand");
        document.getElementById("righthandimage").style.opacity = 0;
        lefthand.style.height = 30 + "vh";
        lefthand.style.width = 20 + "vh";
        lefthand.style.top = 25 + "vh";
        lefthand.style.left = 56 + "vh";
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
    });
});

var mapping = () => {
  if (userbase && usersFetched === false) {
    userbase.map(user => {
      newElement = document.createElement("li");
      newElement.classList.add("opponent");
      newElement.innerHTML = user.name;
      newElement.style.cursor = "pointer";
      newElement.addEventListener("click", () => {
        opponent = user;      
        isOpponentChosen = true;
        getUserList.innerHTML =
          "Do you want to fight" + " " + user.name + "?";
      });
      userList.appendChild(newElement);
      usersFetched = true;
    });
  } else {
    console.log("somethingnotright");
  }
};

getUserList.addEventListener("click", mapping);

realBattleStarter.addEventListener("click", battledisplay);

function battledisplay() {
  battleground.style.top = 0;
  playerNameDisplay.innerHTML = userdata.name
  playerHpDisplay.innerHTML = userdata.stats.hp + eqhp
  opponentNameDisplay.innerHTML = opponent.name 
  

  opponnentEqStatsCounter(opponent)
  
 

  storage
    .ref()
    .child("items/" + opponent.head.name + ".png")
    .getDownloadURL()
    .then(url => {
      var test = url;
      document.getElementById("opponentheadimage").src = test;
    });

  storage
    .ref()
    .child("items/" + opponent.torso.name + ".png")
    .getDownloadURL()
    .then(url => {
      var test = url;
      document.getElementById("opponenttorsoimage").src = test;
    });

  storage
    .ref()
    .child("items/" + opponent.legs.name + ".png")
    .getDownloadURL()
    .then(url => {
      var test = url;
      document.getElementById("opponentlegsimage").src = test;
    });

  storage
    .ref()
    .child("items/" + opponent.lefthand.name + ".png")
    .getDownloadURL()
    .then(url => {
      var test = url;
      document.getElementById("opponentlefthandimage").src = test;
    });

  storage
    .ref()
    .child("items/" + opponent.shoes.name + ".png")
    .getDownloadURL()
    .then(url => {
      var test = url;
      document.getElementById("opponentshoesimage").src = test;
      console.log("here");
    });

  if (opponent.stats.classname === "Stomper") {
    var opponentlefthand = document.getElementById("opponentlefthand");
    document.getElementById("opponentrighthandimage").style.opacity = 0;
    opponentlefthand.style.height = 30 + "vh";
    opponentlefthand.style.width = 20 + "vh";
    opponentlefthand.style.top = 25 + "vh";
    opponentlefthand.style.right = 56 + "vh";
    return;
  } else {
    storage
      .ref()
      .child("items/" + opponent.righthand.name + ".png")
      .getDownloadURL()
      .then(url => {
        var test = url;
        document.getElementById("opponentrighthandimage").src = test;
      });
  }
}

theRealestBattleStarter.addEventListener("click", play);
backButton.addEventListener('click', () => {
    window.location.href = '/home.html'
})


function play() {
  var opponentHP = opponent.stats.hp;
  var playerHP = userdata.stats.hp;
  var playerTurn = true;
  
 
//   var playerHpDisplay = document.getElementById("playerHP");
  
  
  


  var battle = setInterval(() => {
    if (playerTurn) {
    opponentHitDisplay.style.display = 'none'
    opponentHitDisplay.style.color = 'red'
      var damageOutput = 0;
      var pureDamage =
        Math.floor(Math.random() * (userdata.stats.attack + eqattack - 0 + 1)) + 0;
      
      var critchance =
        Math.floor(Math.random() * (100 - 0 + 1)) + 0;

      if (critchance >= 0 && critchance <= userdata.stats.critrate + eqcritrate) {
        damageOutput = pureDamage + Math.floor(pureDamage/2);
        yourHitDisplay.innerHTML = "-" + damageOutput
        yourHitDisplay.style.display = 'block'
        yourHitDisplay.style.color = 'yellow'
      } else {
        damageOutput = pureDamage;
        yourHitDisplay.innerHTML = "-" + damageOutput
        yourHitDisplay.style.display = 'block'
        console.log(critchance)
      }

      opponentHP = opponentHP - damageOutput + opponent.stats.def;
      opponentHpDisplay.innerHTML = opponentHP;

      if (playerHP <= 0 || opponentHP <= 0) {
        clearInterval(battle);
      }

      playerTurn = !playerTurn;
    } else if (playerTurn === false) {
    yourHitDisplay.style.display = 'none'
    yourHitDisplay.style.color = 'red'
      var opponentdamageOutput = 0;
      var opponentpureDamage =
        Math.floor(Math.random() * (opponent.stats.attack + opponenteqattack - 0 + 1)) + 0;
    
      var opponentcritchance =
       Math.floor(Math.random() * (100 - 0 + 1)) + 0;

      if (
        opponentcritchance >= 0 &&
        opponentcritchance <= opponent.stats.critrate + opponenteqcritrate
      ) {
        opponentdamageOutput = opponentpureDamage + Math.floor(opponentpureDamage/2);
        opponentHitDisplay.innerHTML = "-" + opponentdamageOutput
        opponentHitDisplay.style.display = 'block'
        opponentHitDisplay.style.color = 'yellow'
      } else {
        opponentdamageOutput = opponentpureDamage;
        opponentHitDisplay.innerHTML = "-" + opponentdamageOutput
        opponentHitDisplay.style.display = 'block'
      }

      playerHP = playerHP - opponentdamageOutput + userdata.stats.def;
      playerHpDisplay.innerHTML = playerHP;

      if (playerHP <= 0 || opponentHP <= 0) {
        clearInterval(battle);
      }

      playerTurn = !playerTurn;
    }
  }, 3000);
}

var eqStatsCounter = userdata => {
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
  };

  var opponnentEqStatsCounter = opponent => {
      opponenteqhp =
        opponent.head.hp +
        opponent.torso.hp +
        opponent.lefthand.hp +
        opponent.righthand.hp +
        opponent.legs.hp +
        opponent.shoes.hp;
      opponenteqspeed =
        opponent.head.speed +
        opponent.torso.speed +
        opponent.lefthand.speed +
        opponent.righthand.speed +
        opponent.legs.speed +
        opponent.shoes.speed;
      opponenteqaccuracy =
        opponent.head.acc +
        opponent.torso.acc +
        opponent.lefthand.acc +
        opponent.righthand.acc +
        opponent.legs.acc +
        opponent.shoes.acc;
      opponenteqcritdamage =
        opponent.head.critdamage +
        opponent.torso.critdamage +
        opponent.lefthand.critdamage +
        opponent.righthand.critdamage +
        opponent.legs.critdamage +
        opponent.shoes.critdamage;
      opponenteqcritrate =
        opponent.head.critrate +
        opponent.torso.critrate +
        opponent.lefthand.critrate +
        opponent.righthand.critrate +
        opponent.legs.critrate +
        opponent.shoes.critrate;
      opponenteqdef =
        opponent.head.def +
        opponent.torso.def +
        opponent.lefthand.def +
        opponent.righthand.def +
        opponent.legs.def +
        opponent.shoes.def;
      opponenteqattack =
        opponent.head.attack +
        opponent.torso.attack +
        opponent.lefthand.attack +
        opponent.righthand.attack +
        opponent.legs.attack +
        opponent.shoes.attack;

        opponentHpDisplay.innerHTML = opponent.stats.hp + opponenteqhp
  };